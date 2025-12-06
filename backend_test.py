#!/usr/bin/env python3
"""
AyaPos Backend API Test Suite
Tests all backend endpoints for the AyaPos application
"""

import asyncio
import aiohttp
import json
import sys
from datetime import datetime
from typing import Dict, Any, Optional

# Backend URL from frontend environment
BACKEND_URL = "https://ayasite-cms.preview.emergentagent.com"

class AyaPosAPITester:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session = None
        self.test_results = []
        self.created_contact_id = None
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    def log_test(self, test_name: str, success: bool, details: str, response_data: Any = None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        if response_data and not success:
            print(f"   Response: {response_data}")
        print()
        
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details,
            "response": response_data,
            "timestamp": datetime.now().isoformat()
        })
    
    async def test_health_endpoints(self):
        """Test health check and root endpoints"""
        print("🔍 Testing Health Check Endpoints...")
        
        # Test root endpoint
        try:
            async with self.session.get(f"{self.base_url}/api/") as response:
                data = await response.json()
                if response.status == 200 and "message" in data and "Welcome to AyaPos API" in data["message"]:
                    self.log_test("GET /api/ - Root endpoint", True, f"Status: {response.status}, Message: {data['message']}")
                else:
                    self.log_test("GET /api/ - Root endpoint", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/ - Root endpoint", False, f"Request failed: {str(e)}")
        
        # Test health endpoint
        try:
            async with self.session.get(f"{self.base_url}/api/health") as response:
                data = await response.json()
                if response.status == 200 and data.get("status") == "healthy":
                    self.log_test("GET /api/health - Health check", True, f"Status: {response.status}, Health: {data['status']}")
                else:
                    self.log_test("GET /api/health - Health check", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/health - Health check", False, f"Request failed: {str(e)}")
    
    async def test_create_contact_valid(self):
        """Test creating a contact with valid data"""
        print("🔍 Testing Contact Creation with Valid Data...")
        
        contact_data = {
            "businessName": "Restaurant Le Gourmet",
            "businessType": "restaurant",
            "phone": "+41 79 123 45 67",
            "email": "contact@legourmet.ch",
            "city": "Zurich",
            "message": "Je souhaite obtenir plus d'informations sur vos solutions POS pour mon restaurant.",
            "language": "fr"
        }
        
        try:
            async with self.session.post(
                f"{self.base_url}/api/contacts/",
                json=contact_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                
                if response.status == 201 and data.get("success") is True and "id" in data:
                    self.created_contact_id = data["id"]
                    self.log_test(
                        "POST /api/contacts/ - Create contact (valid data)", 
                        True, 
                        f"Status: {response.status}, Contact ID: {self.created_contact_id}, Message: {data.get('message', '')}"
                    )
                else:
                    self.log_test(
                        "POST /api/contacts/ - Create contact (valid data)", 
                        False, 
                        f"Unexpected response: {response.status}", 
                        data
                    )
        except Exception as e:
            self.log_test("POST /api/contacts/ - Create contact (valid data)", False, f"Request failed: {str(e)}")
    
    async def test_get_all_contacts(self):
        """Test retrieving all contacts"""
        print("🔍 Testing Get All Contacts...")
        
        try:
            async with self.session.get(f"{self.base_url}/api/contacts/") as response:
                data = await response.json()
                
                if response.status == 200 and isinstance(data, list):
                    # Check if our created contact is in the list
                    found_contact = None
                    if self.created_contact_id:
                        found_contact = next((c for c in data if c.get("id") == self.created_contact_id), None)
                    
                    details = f"Status: {response.status}, Found {len(data)} contacts"
                    if found_contact:
                        details += f", Created contact found with business: {found_contact.get('businessName')}"
                    
                    self.log_test("GET /api/contacts/ - Get all contacts", True, details)
                else:
                    self.log_test("GET /api/contacts/ - Get all contacts", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/contacts/ - Get all contacts", False, f"Request failed: {str(e)}")
    
    async def test_get_contact_by_id(self):
        """Test retrieving a specific contact by ID"""
        print("🔍 Testing Get Contact by ID...")
        
        if not self.created_contact_id:
            self.log_test("GET /api/contacts/{id} - Get contact by ID", False, "No contact ID available from creation test")
            return
        
        try:
            async with self.session.get(f"{self.base_url}/api/contacts/{self.created_contact_id}") as response:
                data = await response.json()
                
                if response.status == 200 and data.get("id") == self.created_contact_id:
                    # Verify the data matches what we submitted
                    expected_fields = ["businessName", "businessType", "phone", "email", "city", "message", "language"]
                    all_fields_match = True
                    
                    for field in expected_fields:
                        if field == "businessName" and data.get(field) != "Restaurant Le Gourmet":
                            all_fields_match = False
                        elif field == "businessType" and data.get(field) != "restaurant":
                            all_fields_match = False
                        elif field == "email" and data.get(field) != "contact@legourmet.ch":
                            all_fields_match = False
                    
                    details = f"Status: {response.status}, Contact ID: {data.get('id')}, Business: {data.get('businessName')}"
                    if all_fields_match:
                        details += " - All fields match submitted data"
                    
                    self.log_test("GET /api/contacts/{id} - Get contact by ID", True, details)
                else:
                    self.log_test("GET /api/contacts/{id} - Get contact by ID", False, f"Unexpected response: {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/contacts/{id} - Get contact by ID", False, f"Request failed: {str(e)}")
    
    async def test_error_handling(self):
        """Test error handling scenarios"""
        print("🔍 Testing Error Handling...")
        
        # Test invalid email
        invalid_email_data = {
            "businessName": "Test Business",
            "businessType": "restaurant",
            "phone": "+41 79 123 45 67",
            "email": "invalid-email",  # Invalid email format
            "city": "Zurich",
            "message": "Test message",
            "language": "fr"
        }
        
        try:
            async with self.session.post(
                f"{self.base_url}/api/contacts/",
                json=invalid_email_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                
                if response.status == 422:  # Validation error
                    self.log_test("POST /api/contacts/ - Invalid email validation", True, f"Status: {response.status} - Correctly rejected invalid email")
                else:
                    self.log_test("POST /api/contacts/ - Invalid email validation", False, f"Expected 422, got {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/contacts/ - Invalid email validation", False, f"Request failed: {str(e)}")
        
        # Test missing required fields
        incomplete_data = {
            "businessName": "Test Business",
            # Missing businessType, phone, email, city
            "message": "Test message",
            "language": "fr"
        }
        
        try:
            async with self.session.post(
                f"{self.base_url}/api/contacts/",
                json=incomplete_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                
                if response.status == 422:  # Validation error
                    self.log_test("POST /api/contacts/ - Missing required fields", True, f"Status: {response.status} - Correctly rejected incomplete data")
                else:
                    self.log_test("POST /api/contacts/ - Missing required fields", False, f"Expected 422, got {response.status}", data)
        except Exception as e:
            self.log_test("POST /api/contacts/ - Missing required fields", False, f"Request failed: {str(e)}")
        
        # Test invalid contact ID
        try:
            async with self.session.get(f"{self.base_url}/api/contacts/invalid-id-123") as response:
                data = await response.json()
                
                if response.status == 400:  # Bad request for invalid ObjectId
                    self.log_test("GET /api/contacts/{invalid_id} - Invalid ID format", True, f"Status: {response.status} - Correctly rejected invalid ID")
                else:
                    self.log_test("GET /api/contacts/{invalid_id} - Invalid ID format", False, f"Expected 400, got {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/contacts/{invalid_id} - Invalid ID format", False, f"Request failed: {str(e)}")
        
        # Test non-existent contact ID (valid ObjectId format but doesn't exist)
        fake_object_id = "507f1f77bcf86cd799439011"  # Valid ObjectId format
        try:
            async with self.session.get(f"{self.base_url}/api/contacts/{fake_object_id}") as response:
                data = await response.json()
                
                if response.status == 404:  # Not found
                    self.log_test("GET /api/contacts/{non_existent_id} - Non-existent contact", True, f"Status: {response.status} - Correctly returned 404 for non-existent contact")
                else:
                    self.log_test("GET /api/contacts/{non_existent_id} - Non-existent contact", False, f"Expected 404, got {response.status}", data)
        except Exception as e:
            self.log_test("GET /api/contacts/{non_existent_id} - Non-existent contact", False, f"Request failed: {str(e)}")
    
    async def test_data_persistence(self):
        """Test that data is properly stored in MongoDB"""
        print("🔍 Testing Data Persistence...")
        
        if not self.created_contact_id:
            self.log_test("Data Persistence Check", False, "No contact ID available to verify persistence")
            return
        
        # Wait a moment and then retrieve the contact again to ensure it's persisted
        await asyncio.sleep(1)
        
        try:
            async with self.session.get(f"{self.base_url}/api/contacts/{self.created_contact_id}") as response:
                data = await response.json()
                
                if response.status == 200:
                    # Check that all expected fields are present and have correct values
                    required_fields = ["id", "businessName", "businessType", "phone", "email", "city", "status", "createdAt", "updatedAt"]
                    missing_fields = [field for field in required_fields if field not in data]
                    
                    if not missing_fields:
                        self.log_test("Data Persistence Check", True, f"Contact persisted correctly with all required fields: {', '.join(required_fields)}")
                    else:
                        self.log_test("Data Persistence Check", False, f"Missing fields in persisted data: {missing_fields}", data)
                else:
                    self.log_test("Data Persistence Check", False, f"Failed to retrieve persisted contact: {response.status}", data)
        except Exception as e:
            self.log_test("Data Persistence Check", False, f"Request failed: {str(e)}")
    
    def print_summary(self):
        """Print test summary"""
        print("=" * 60)
        print("🎯 AyaPos Backend API Test Summary")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        print()
        
        if failed_tests > 0:
            print("❌ Failed Tests:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"   • {result['test']}: {result['details']}")
            print()
        
        print("🔗 Backend URL:", self.base_url)
        if self.created_contact_id:
            print(f"📝 Created Contact ID: {self.created_contact_id}")
        print()
        
        return passed_tests, failed_tests

async def main():
    """Run all backend API tests"""
    print("🚀 Starting AyaPos Backend API Tests")
    print(f"🔗 Testing against: {BACKEND_URL}")
    print("=" * 60)
    print()
    
    async with AyaPosAPITester(BACKEND_URL) as tester:
        # Run all test suites
        await tester.test_health_endpoints()
        await tester.test_create_contact_valid()
        await tester.test_get_all_contacts()
        await tester.test_get_contact_by_id()
        await tester.test_data_persistence()
        await tester.test_error_handling()
        
        # Print summary
        passed, failed = tester.print_summary()
        
        # Return appropriate exit code
        return 0 if failed == 0 else 1

if __name__ == "__main__":
    try:
        exit_code = asyncio.run(main())
        sys.exit(exit_code)
    except KeyboardInterrupt:
        print("\n🛑 Tests interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Test execution failed: {e}")
        sys.exit(1)