#!/usr/bin/env python3
"""
Backend API Testing for HeadwayOS Application
Tests the available Next.js API routes
"""

import requests
import json
import sys
from datetime import datetime

# Configuration
BASE_URL = "https://pdf-theme-impl.preview.emergentagent.com/api"
HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

class APITester:
    def __init__(self):
        self.test_results = []
        self.passed = 0
        self.failed = 0
    
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        status = "PASS" if success else "FAIL"
        result = {
            'test': test_name,
            'status': status,
            'message': message,
            'timestamp': datetime.now().isoformat()
        }
        if response_data:
            result['response'] = response_data
        
        self.test_results.append(result)
        
        if success:
            self.passed += 1
            print(f"✅ {test_name}: {message}")
        else:
            self.failed += 1
            print(f"❌ {test_name}: {message}")
    
    def test_root_endpoint(self):
        """Test GET /api/root endpoint"""
        try:
            response = requests.get(f"{BASE_URL}/root", headers=HEADERS, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == 'Hello World':
                    self.log_test(
                        "Root Endpoint", 
                        True, 
                        f"Successfully returned 'Hello World' message",
                        data
                    )
                else:
                    self.log_test(
                        "Root Endpoint", 
                        False, 
                        f"Unexpected response: {data}"
                    )
            else:
                self.log_test(
                    "Root Endpoint", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Root Endpoint", 
                False, 
                f"Request failed: {str(e)}"
            )
    
    def test_status_post_endpoint(self):
        """Test POST /api/status endpoint"""
        try:
            test_data = {
                "client_name": "HeadwayOS_Test_Client"
            }
            
            response = requests.post(
                f"{BASE_URL}/status", 
                headers=HEADERS, 
                json=test_data,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['id', 'client_name', 'timestamp']
                
                if all(field in data for field in required_fields):
                    if data['client_name'] == test_data['client_name']:
                        self.log_test(
                            "Status POST", 
                            True, 
                            f"Successfully created status check with ID: {data['id']}",
                            data
                        )
                        return data['id']  # Return ID for further testing
                    else:
                        self.log_test(
                            "Status POST", 
                            False, 
                            f"Client name mismatch: expected {test_data['client_name']}, got {data['client_name']}"
                        )
                else:
                    missing_fields = [f for f in required_fields if f not in data]
                    self.log_test(
                        "Status POST", 
                        False, 
                        f"Missing required fields: {missing_fields}"
                    )
            else:
                self.log_test(
                    "Status POST", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Status POST", 
                False, 
                f"Request failed: {str(e)}"
            )
        
        return None
    
    def test_status_post_validation(self):
        """Test POST /api/status endpoint validation"""
        try:
            # Test without client_name
            response = requests.post(
                f"{BASE_URL}/status", 
                headers=HEADERS, 
                json={},
                timeout=10
            )
            
            if response.status_code == 400:
                data = response.json()
                if 'error' in data and 'client_name is required' in data['error']:
                    self.log_test(
                        "Status POST Validation", 
                        True, 
                        "Correctly validates missing client_name",
                        data
                    )
                else:
                    self.log_test(
                        "Status POST Validation", 
                        False, 
                        f"Unexpected error message: {data}"
                    )
            else:
                self.log_test(
                    "Status POST Validation", 
                    False, 
                    f"Expected 400 status, got {response.status_code}: {response.text}"
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Status POST Validation", 
                False, 
                f"Request failed: {str(e)}"
            )
    
    def test_status_get_endpoint(self):
        """Test GET /api/status endpoint"""
        try:
            response = requests.get(f"{BASE_URL}/status", headers=HEADERS, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test(
                        "Status GET", 
                        True, 
                        f"Successfully retrieved {len(data)} status checks",
                        {"count": len(data), "sample": data[:2] if data else []}
                    )
                else:
                    self.log_test(
                        "Status GET", 
                        False, 
                        f"Expected array response, got: {type(data)}"
                    )
            else:
                self.log_test(
                    "Status GET", 
                    False, 
                    f"HTTP {response.status_code}: {response.text}"
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Status GET", 
                False, 
                f"Request failed: {str(e)}"
            )
    
    def test_invalid_route(self):
        """Test invalid route handling"""
        try:
            response = requests.get(f"{BASE_URL}/nonexistent", headers=HEADERS, timeout=10)
            
            if response.status_code == 404:
                data = response.json()
                if 'error' in data and 'not found' in data['error'].lower():
                    self.log_test(
                        "Invalid Route Handling", 
                        True, 
                        "Correctly returns 404 for invalid routes",
                        data
                    )
                else:
                    self.log_test(
                        "Invalid Route Handling", 
                        False, 
                        f"Unexpected error message: {data}"
                    )
            else:
                self.log_test(
                    "Invalid Route Handling", 
                    False, 
                    f"Expected 404 status, got {response.status_code}: {response.text}"
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Invalid Route Handling", 
                False, 
                f"Request failed: {str(e)}"
            )
    
    def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            response = requests.options(f"{BASE_URL}/status", headers=HEADERS, timeout=10)
            
            cors_headers = [
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Headers'
            ]
            
            present_headers = [h for h in cors_headers if h in response.headers]
            
            if len(present_headers) >= 2:  # At least 2 CORS headers should be present
                self.log_test(
                    "CORS Headers", 
                    True, 
                    f"CORS headers present: {present_headers}",
                    {h: response.headers.get(h) for h in present_headers}
                )
            else:
                self.log_test(
                    "CORS Headers", 
                    False, 
                    f"Missing CORS headers. Found: {present_headers}"
                )
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "CORS Headers", 
                False, 
                f"Request failed: {str(e)}"
            )
    
    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting HeadwayOS Backend API Tests")
        print(f"📍 Testing against: {BASE_URL}")
        print("=" * 60)
        
        # Run tests
        self.test_root_endpoint()
        self.test_status_post_validation()
        status_id = self.test_status_post_endpoint()
        self.test_status_get_endpoint()
        self.test_invalid_route()
        self.test_cors_headers()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.passed}")
        print(f"❌ Failed: {self.failed}")
        print(f"📈 Success Rate: {(self.passed / (self.passed + self.failed) * 100):.1f}%")
        
        if self.failed > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if result['status'] == 'FAIL':
                    print(f"   • {result['test']}: {result['message']}")
        
        return self.failed == 0

def main():
    """Main test execution"""
    tester = APITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/api_test_results.json', 'w') as f:
        json.dump({
            'summary': {
                'passed': tester.passed,
                'failed': tester.failed,
                'success_rate': (tester.passed / (tester.passed + tester.failed) * 100) if (tester.passed + tester.failed) > 0 else 0,
                'timestamp': datetime.now().isoformat()
            },
            'tests': tester.test_results
        }, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: /app/api_test_results.json")
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()