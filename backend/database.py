from motor.motor_asyncio import AsyncIOMotorClient
import os
from functools import lru_cache

# Global database client
_db_client = None
_database = None

def get_database():
    """
    Get the database instance.
    """
    global _db_client, _database
    
    if _database is None:
        mongo_url = os.environ.get('MONGO_URL')
        db_name = os.environ.get('DB_NAME', 'ayapos')
        
        if not mongo_url:
            raise ValueError("MONGO_URL environment variable is not set")
        
        _db_client = AsyncIOMotorClient(mongo_url)
        _database = _db_client[db_name]
    
    return _database

class DatabaseProxy:
    """Lazy database proxy that initializes on first access"""
    def __getattr__(self, name):
        return getattr(get_database(), name)

# Create a db instance for easy import
db = DatabaseProxy()

def close_database():
    """
    Close the database connection.
    """
    global _db_client
    if _db_client:
        _db_client.close()
