from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path

# Import routes
from routes import contacts

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

# Include contacts router
app.include_router(contacts.router)

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
