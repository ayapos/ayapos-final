from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path

# Import routes
from routes import contacts, callbacks, auth, content, upload, pricing, company, testimonials, portfolio, services, faq, settings, leads, products, blog, hero, team, navigation, ai_assistant, media

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(
    title="AyaPos API",
    description="API for AyaPos - Next Generation POS and Payment Solutions",
    version="1.0.0"
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create a router with the /api prefix for general routes
api_router = APIRouter(prefix="/api")

@api_router.get("/")
async def root():
    return {
        "message": "Welcome to AyaPos API",
        "version": "1.0.0",
        "status": "operational"
    }

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "ayapos-api"
    }

# Include the general router
app.include_router(api_router)

# Include all routers
app.include_router(contacts.router)
app.include_router(callbacks.router)
app.include_router(auth.router)
app.include_router(content.router)
app.include_router(upload.router)
app.include_router(pricing.router)
app.include_router(company.router)
app.include_router(testimonials.router)
app.include_router(portfolio.router)
app.include_router(services.router)
app.include_router(faq.router)
app.include_router(settings.router)
app.include_router(leads.router)
app.include_router(products.router)
app.include_router(blog.router)
app.include_router(hero.router)
app.include_router(team.router)
app.include_router(navigation.router)
app.include_router(ai_assistant.router)
app.include_router(media.router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("AyaPos API starting up...")
    logger.info("AyaPos API ready!")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("AyaPos API shutting down...")
    from database import close_database
    close_database()
    logger.info("AyaPos API shutdown complete.")
