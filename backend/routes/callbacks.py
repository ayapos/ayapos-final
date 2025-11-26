from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from datetime import datetime, timezone
from database import db
import uuid
import logging
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

router = APIRouter()
logger = logging.getLogger(__name__)

# Email configuration
EMAIL_HOST = os.environ.get('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', '587'))
EMAIL_USER = os.environ.get('EMAIL_USER', '')
EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD', '')
EMAIL_FROM = os.environ.get('EMAIL_FROM', EMAIL_USER)
EMAIL_TO = os.environ.get('EMAIL_TO', 'emrah@ayapos.com')

class CallbackRequest(BaseModel):
    businessName: str
    phone: str

class CallbackResponse(BaseModel):
    id: str
    message: str
    businessName: str
    phone: str
    createdAt: str

async def send_callback_email(callback_data: dict, callback_id: str):
    """Send email notification for callback request"""
    if not EMAIL_USER or not EMAIL_PASSWORD:
        logger.warning("Email not configured. Skipping notification.")
        return
    
    try:
        message = MIMEMultipart('alternative')
        message['Subject'] = f"🔔 Demande de rappel - {callback_data['businessName']}"
        message['From'] = EMAIL_FROM
        message['To'] = EMAIL_TO
        
        html_body = f"""
        <html>
          <head>
            <style>
              body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
              .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
              .header {{ background: linear-gradient(135deg, #4338ca 0%, #3730a3 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; }}
              .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; }}
              .field {{ margin-bottom: 20px; background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #4338ca; }}
              .label {{ font-weight: bold; color: #4338ca; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }}
              .value {{ font-size: 16px; color: #1f2937; }}
              .phone {{ font-size: 20px; font-weight: bold; color: #4338ca; }}
              .footer {{ margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; font-size: 12px; }}
              .urgent {{ background: #fef3c7; color: #92400e; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b; }}
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">📞 Nouvelle Demande de Rappel</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Un client souhaite être rappelé</p>
              </div>
              <div class="content">
                <div class="urgent">
                  <strong>⚡ Action requise :</strong> Ce client attend votre appel aujourd'hui
                </div>
                
                <div class="field">
                  <div class="label">Nom de l'entreprise</div>
                  <div class="value">{callback_data['businessName']}</div>
                </div>
                
                <div class="field">
                  <div class="label">Numéro de téléphone</div>
                  <div class="value phone">
                    <a href="tel:{callback_data['phone']}" style="color: #4338ca; text-decoration: none;">
                      {callback_data['phone']}
                    </a>
                  </div>
                </div>
                
                <div class="footer">
                  <p><strong>ID de demande:</strong> {callback_id}</p>
                  <p><strong>Reçu le:</strong> {callback_data['createdAt'].strftime('%d/%m/%Y à %H:%M:%S')}</p>
                  <p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
                    <em>Email envoyé automatiquement par le système AyaPos</em>
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
        """
        
        html_part = MIMEText(html_body, 'html')
        message.attach(html_part)
        
        await aiosmtplib.send(
            message,
            hostname=EMAIL_HOST,
            port=EMAIL_PORT,
            username=EMAIL_USER,
            password=EMAIL_PASSWORD,
            start_tls=True
        )
        
        logger.info(f"Callback email sent to {EMAIL_TO} for request {callback_id}")
        
    except Exception as e:
        logger.error(f"Failed to send callback email: {e}")
        raise

@router.post("/api/callbacks", response_model=CallbackResponse)
async def create_callback(callback: CallbackRequest):
    """Create a new callback request"""
    try:
        callback_id = str(uuid.uuid4())
        callback_data = {
            "id": callback_id,
            "businessName": callback.businessName,
            "phone": callback.phone,
            "createdAt": datetime.now(timezone.utc),
            "status": "pending"
        }
        
        # Save to database
        await db.callbacks.insert_one(callback_data)
        
        # Send email notification
        try:
            await send_callback_email(callback_data, callback_id)
        except Exception as email_error:
            logger.error(f"Email sending failed but callback saved: {email_error}")
        
        return CallbackResponse(
            id=callback_id,
            message="Merci ! Nous vous rappellerons très bientôt.",
            businessName=callback.businessName,
            phone=callback.phone,
            createdAt=callback_data['createdAt'].isoformat()
        )
        
    except Exception as e:
        logger.error(f"Error creating callback: {e}")
        raise HTTPException(status_code=500, detail="Erreur lors de l'enregistrement de votre demande")
