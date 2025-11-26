import os
import logging
from typing import Dict
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

# Email configuration from environment variables
EMAIL_HOST = os.environ.get('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', '587'))
EMAIL_USER = os.environ.get('EMAIL_USER', '')
EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD', '')
EMAIL_FROM = os.environ.get('EMAIL_FROM', EMAIL_USER)
EMAIL_TO = os.environ.get('EMAIL_TO', 'emrah@ayapos.com')

async def send_contact_notification(contact_data: Dict, contact_id: str):
    """
    Send email notification when a new contact form is submitted.
    """
    # Skip if email is not configured
    if not EMAIL_USER or not EMAIL_PASSWORD:
        logger.warning("Email not configured. Skipping notification.")
        return
    
    try:
        # Create message
        message = MIMEMultipart('alternative')
        message['Subject'] = f"Nouvelle demande de contact - {contact_data['businessName']}"
        message['From'] = EMAIL_FROM
        message['To'] = EMAIL_TO
        
        # Create email body
        html_body = f"""
        <html>
          <head>
            <style>
              body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
              .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
              .header {{ background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
              .content {{ background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }}
              .field {{ margin-bottom: 15px; }}
              .label {{ font-weight: bold; color: #2563eb; }}
              .value {{ margin-top: 5px; }}
              .footer {{ margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }}
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🎯 Nouvelle Demande de Contact AyaPos</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Nom de l'entreprise:</div>
                  <div class="value">{contact_data['businessName']}</div>
                </div>
                <div class="field">
                  <div class="label">Type d'entreprise:</div>
                  <div class="value">{contact_data['businessType']}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:{contact_data['email']}">{contact_data['email']}</a></div>
                </div>
                <div class="field">
                  <div class="label">Téléphone:</div>
                  <div class="value"><a href="tel:{contact_data['phone']}">{contact_data['phone']}</a></div>
                </div>
                <div class="field">
                  <div class="label">Ville:</div>
                  <div class="value">{contact_data['city']}</div>
                </div>
                <div class="field">
                  <div class="label">Langue:</div>
                  <div class="value">{contact_data['language'].upper()}</div>
                </div>
                {f'<div class="field"><div class="label">Message:</div><div class="value">{contact_data["message"]}</div></div>' if contact_data.get('message') else ''}
                <div class="footer">
                  <p>ID de contact: {contact_id}</p>
                  <p>Reçu le: {contact_data['createdAt'].strftime('%d/%m/%Y à %H:%M')}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
        """
        
        # Attach HTML body
        html_part = MIMEText(html_body, 'html')
        message.attach(html_part)
        
        # Send email
        await aiosmtplib.send(
            message,
            hostname=EMAIL_HOST,
            port=EMAIL_PORT,
            username=EMAIL_USER,
            password=EMAIL_PASSWORD,
            start_tls=True
        )
        
        logger.info(f"Email notification sent for contact {contact_id}")
        
    except Exception as e:
        logger.error(f"Failed to send email notification: {e}")
        raise
