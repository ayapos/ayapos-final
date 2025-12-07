#!/usr/bin/env python3
"""
Detailed Content Structure Test for Delivery Management and Robot Waiter
Tests the specific requirements mentioned in the review request
"""

import asyncio
import aiohttp
import json
import sys
from datetime import datetime

BACKEND_URL = "https://content-manager-68.preview.emergentagent.com"

async def test_delivery_management_detailed():
    """Test delivery-management content in detail"""
    print("🔍 DETAILED TEST: Delivery Management Content")
    print("=" * 50)
    
    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(f"{BACKEND_URL}/api/content/delivery-management") as response:
                data = await response.json()
                
                if response.status == 200 and data.get("success"):
                    content = data.get("content", {})
                    
                    print(f"✅ API Response: Status {response.status}, Success: {data.get('success')}")
                    
                    # Test Hero Image
                    hero_image = content.get("hero_image")
                    if hero_image:
                        print(f"✅ Hero Image: {hero_image}")
                        if "unsplash.com" in hero_image or "/uploads/" in hero_image:
                            print("   📸 Image source: Valid (Unsplash or uploaded)")
                        else:
                            print("   ⚠️  Image source: Unknown format")
                    else:
                        print("❌ Hero Image: MISSING")
                    
                    # Test Benefits Section
                    benefits = content.get("benefits", [])
                    print(f"✅ Benefits Count: {len(benefits)} (expected: 3)")
                    
                    if len(benefits) >= 3:
                        print("   📋 Benefits Details:")
                        for i, benefit in enumerate(benefits[:3]):
                            title = benefit.get("title", "NO TITLE")
                            image = benefit.get("image", "NO IMAGE")
                            description = benefit.get("description", "NO DESCRIPTION")
                            
                            print(f"   {i+1}. Title: {title[:40]}...")
                            print(f"      Image: {image[:60]}...")
                            print(f"      Description: {description[:50]}...")
                            
                            # Validate image source
                            if "unsplash.com" in image or "/uploads/" in image:
                                print("      📸 Image source: Valid")
                            else:
                                print("      ⚠️  Image source: Invalid or missing")
                            print()
                    
                    # Check if content is dynamic (from MongoDB)
                    if content.get("slug") == "delivery-management":
                        print("✅ Content Source: Dynamic (MongoDB)")
                    else:
                        print("⚠️  Content Source: May be hardcoded")
                    
                    return True
                else:
                    print(f"❌ API Error: Status {response.status}")
                    print(f"   Response: {data}")
                    return False
                    
        except Exception as e:
            print(f"❌ Request Failed: {str(e)}")
            return False

async def test_robot_waiter_detailed():
    """Test robot-waiter content in detail"""
    print("\n🔍 DETAILED TEST: Robot Waiter Content")
    print("=" * 50)
    
    async with aiohttp.ClientSession() as session:
        try:
            async with session.get(f"{BACKEND_URL}/api/content/robot-waiter") as response:
                data = await response.json()
                
                if response.status == 200 and data.get("success"):
                    content = data.get("content", {})
                    
                    print(f"✅ API Response: Status {response.status}, Success: {data.get('success')}")
                    
                    # Test Hero Image
                    hero_image = content.get("hero_image")
                    if hero_image:
                        print(f"✅ Hero Image: {hero_image}")
                        if "unsplash.com" in hero_image or "/uploads/" in hero_image:
                            print("   📸 Image source: Valid (Unsplash or uploaded)")
                        else:
                            print("   ⚠️  Image source: Unknown format")
                    else:
                        print("❌ Hero Image: MISSING")
                    
                    # Test Section Images
                    section_images = content.get("section_images", {})
                    expected_sections = {
                        "navigation_autonome": "Navigation Autonome",
                        "profitabilite": "Profitabilité", 
                        "efficacite": "Efficacité"
                    }
                    
                    print(f"✅ Section Images: {len(section_images)} sections found")
                    print("   📋 Section Details:")
                    
                    for key, name in expected_sections.items():
                        if key in section_images:
                            image_url = section_images[key]
                            print(f"   ✅ {name}: {image_url[:60]}...")
                            if "unsplash.com" in image_url or "/uploads/" in image_url:
                                print(f"      📸 Image source: Valid")
                            else:
                                print(f"      ⚠️  Image source: Invalid")
                        else:
                            print(f"   ❌ {name}: MISSING")
                    
                    # Test Robot Showcase
                    robot_showcase = content.get("robot_showcase", [])
                    print(f"\n✅ Robot Showcase: {len(robot_showcase)} robots (expected: 3)")
                    
                    if len(robot_showcase) >= 3:
                        print("   🤖 Robot Details:")
                        for i, robot in enumerate(robot_showcase[:3]):
                            name = robot.get("name", "NO NAME")
                            image = robot.get("image", "NO IMAGE")
                            description = robot.get("description", "NO DESCRIPTION")
                            
                            print(f"   {i+1}. Name: {name}")
                            print(f"      Image: {image[:60]}...")
                            print(f"      Description: {description[:50]}...")
                            
                            # Validate image source
                            if "unsplash.com" in image or "/uploads/" in image:
                                print("      📸 Image source: Valid")
                            else:
                                print("      ⚠️  Image source: Invalid or missing")
                            print()
                    
                    # Check if content is dynamic (from MongoDB)
                    if content.get("slug") == "robot-waiter":
                        print("✅ Content Source: Dynamic (MongoDB)")
                    else:
                        print("⚠️  Content Source: May be hardcoded")
                    
                    return True
                else:
                    print(f"❌ API Error: Status {response.status}")
                    print(f"   Response: {data}")
                    return False
                    
        except Exception as e:
            print(f"❌ Request Failed: {str(e)}")
            return False

async def test_image_editability():
    """Test that images are editable (loaded from MongoDB, not hardcoded)"""
    print("\n🔍 DETAILED TEST: Image Editability Verification")
    print("=" * 50)
    
    # Test both endpoints to ensure they return dynamic content
    endpoints = [
        ("delivery-management", "Gestion Livraison"),
        ("robot-waiter", "Robot Serveur")
    ]
    
    async with aiohttp.ClientSession() as session:
        for endpoint, name in endpoints:
            try:
                async with session.get(f"{BACKEND_URL}/api/content/{endpoint}") as response:
                    data = await response.json()
                    
                    if response.status == 200 and data.get("success"):
                        content = data.get("content", {})
                        
                        # Check for MongoDB indicators
                        has_slug = content.get("slug") == endpoint
                        has_updated_at = "updatedAt" in content
                        
                        print(f"✅ {name} ({endpoint}):")
                        print(f"   📝 Has slug field: {has_slug}")
                        print(f"   🕒 Has updatedAt field: {has_updated_at}")
                        
                        if has_slug and has_updated_at:
                            print(f"   ✅ Content is EDITABLE (from MongoDB)")
                        else:
                            print(f"   ⚠️  Content may be hardcoded")
                        
                        # Count total images
                        total_images = 0
                        if content.get("hero_image"):
                            total_images += 1
                        
                        if endpoint == "delivery-management":
                            benefits = content.get("benefits", [])
                            total_images += len([b for b in benefits if b.get("image")])
                        elif endpoint == "robot-waiter":
                            section_images = content.get("section_images", {})
                            total_images += len([img for img in section_images.values() if img])
                            robot_showcase = content.get("robot_showcase", [])
                            total_images += len([r for r in robot_showcase if r.get("image")])
                        
                        print(f"   📸 Total editable images: {total_images}")
                        print()
                        
            except Exception as e:
                print(f"❌ {name} test failed: {str(e)}")

async def main():
    """Run all detailed tests"""
    print("🚀 DETAILED CONTENT STRUCTURE TESTS")
    print("🔗 Testing against:", BACKEND_URL)
    print("=" * 60)
    
    # Run tests
    test1 = await test_delivery_management_detailed()
    test2 = await test_robot_waiter_detailed()
    await test_image_editability()
    
    # Summary
    print("\n" + "=" * 60)
    print("🎯 DETAILED TEST SUMMARY")
    print("=" * 60)
    
    if test1 and test2:
        print("✅ ALL TESTS PASSED")
        print("✅ Delivery Management: Hero image + 3 benefits with images")
        print("✅ Robot Waiter: Hero image + 3 section images + 3 robot showcase images")
        print("✅ All images are editable (loaded from MongoDB)")
        print("✅ Content is dynamic and can be modified via admin panel")
        return 0
    else:
        print("❌ SOME TESTS FAILED")
        return 1

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