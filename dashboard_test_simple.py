#!/usr/bin/env python3
"""
Dashboard Functionality Testing for HeadwayOS Application
Tests the dashboard features including accessibility, API endpoints, and basic functionality
"""

import requests
import json
import sys
import time
import re
from datetime import datetime

class DashboardTester:
    def __init__(self):
        self.test_results = []
        self.passed = 0
        self.failed = 0
        self.base_url = "http://localhost:3001"
        
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
    
    def test_dashboard_accessibility(self):
        """Test that dashboard page is accessible and returns valid HTML"""
        try:
            response = requests.get(f"{self.base_url}/dashboard", timeout=10)
            
            if response.status_code == 200:
                html_content = response.text
                
                # Check if it's not showing loading screen
                if "Loading your dashboard" in html_content:
                    self.log_test(
                        "Dashboard Accessibility", 
                        False, 
                        "Dashboard still shows loading screen - mock data may not be loading properly"
                    )
                    return False
                
                # Check for key dashboard elements
                dashboard_indicators = [
                    "WELCOME BACK",
                    "HeadwayOS", 
                    "Aarav",
                    "MATCH",
                    "MARKET FIT"
                ]
                
                found_indicators = 0
                for indicator in dashboard_indicators:
                    if indicator in html_content:
                        found_indicators += 1
                
                if found_indicators >= 3:
                    self.log_test(
                        "Dashboard Accessibility", 
                        True, 
                        f"Dashboard accessible and contains expected elements - found {found_indicators}/5 key indicators"
                    )
                    return True
                else:
                    self.log_test(
                        "Dashboard Accessibility", 
                        False, 
                        f"Dashboard missing key elements - only found {found_indicators}/5 indicators"
                    )
                    return False
            else:
                self.log_test(
                    "Dashboard Accessibility", 
                    False, 
                    f"Dashboard not accessible - HTTP {response.status_code}"
                )
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Dashboard Accessibility", 
                False, 
                f"Error accessing dashboard: {str(e)}"
            )
            return False
    
    def test_mock_data_integration(self):
        """Test that mock data is properly integrated in the HTML"""
        try:
            response = requests.get(f"{self.base_url}/dashboard", timeout=10)
            
            if response.status_code == 200:
                html_content = response.text
                
                # Check for mock data elements
                mock_data_indicators = [
                    "Aarav",  # User name
                    "Backend SWE",  # Target role
                    "San Francisco",  # City
                    "Complete API design patterns",  # Task name
                    "System design mock interview",  # Another task
                    "78%",  # ATS Score
                    "84%"   # Market Fit
                ]
                
                found_data = 0
                for indicator in mock_data_indicators:
                    if indicator in html_content:
                        found_data += 1
                
                if found_data >= 4:
                    self.log_test(
                        "Mock Data Integration", 
                        True, 
                        f"Mock data properly integrated - found {found_data}/7 data elements"
                    )
                    return True
                else:
                    self.log_test(
                        "Mock Data Integration", 
                        False, 
                        f"Insufficient mock data found - only {found_data}/7 elements"
                    )
                    return False
            else:
                self.log_test(
                    "Mock Data Integration", 
                    False, 
                    f"Cannot check mock data - HTTP {response.status_code}"
                )
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Mock Data Integration", 
                False, 
                f"Error checking mock data: {str(e)}"
            )
            return False
    
    def test_metric_cards_structure(self):
        """Test that metric cards are properly structured in HTML"""
        try:
            response = requests.get(f"{self.base_url}/dashboard", timeout=10)
            
            if response.status_code == 200:
                html_content = response.text
                
                # Check for metric card structure
                metric_patterns = [
                    r'MATCH.*?%',  # Match percentage
                    r'MARKET FIT.*?%',  # Market fit percentage
                    r'INTERVIEWS.*?\d+',  # Interview count
                    r'MODULES.*?\d+'  # Modules count
                ]
                
                found_metrics = 0
                for pattern in metric_patterns:
                    if re.search(pattern, html_content, re.IGNORECASE | re.DOTALL):
                        found_metrics += 1
                
                if found_metrics >= 3:
                    self.log_test(
                        "Metric Cards Structure", 
                        True, 
                        f"Metric cards properly structured - found {found_metrics}/4 metric patterns"
                    )
                    return True
                else:
                    self.log_test(
                        "Metric Cards Structure", 
                        False, 
                        f"Insufficient metric card structure - only {found_metrics}/4 patterns found"
                    )
                    return False
            else:
                self.log_test(
                    "Metric Cards Structure", 
                    False, 
                    f"Cannot check metric structure - HTTP {response.status_code}"
                )
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Metric Cards Structure", 
                False, 
                f"Error checking metric structure: {str(e)}"
            )
            return False
    
    def test_interactive_elements(self):
        """Test that interactive elements are present in HTML"""
        try:
            response = requests.get(f"{self.base_url}/dashboard", timeout=10)
            
            if response.status_code == 200:
                html_content = response.text
                
                # Check for interactive element indicators
                interactive_indicators = [
                    'cursor-pointer',  # Clickable elements
                    'onClick',  # Click handlers
                    'hover:',  # Hover effects
                    'transition',  # Animations
                    'button'  # Button elements
                ]
                
                found_interactive = 0
                for indicator in interactive_indicators:
                    if indicator in html_content:
                        found_interactive += 1
                
                if found_interactive >= 3:
                    self.log_test(
                        "Interactive Elements", 
                        True, 
                        f"Interactive elements present - found {found_interactive}/5 interaction indicators"
                    )
                    return True
                else:
                    self.log_test(
                        "Interactive Elements", 
                        False, 
                        f"Limited interactive elements - only {found_interactive}/5 indicators found"
                    )
                    return False
            else:
                self.log_test(
                    "Interactive Elements", 
                    False, 
                    f"Cannot check interactive elements - HTTP {response.status_code}"
                )
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Interactive Elements", 
                False, 
                f"Error checking interactive elements: {str(e)}"
            )
            return False
    
    def test_task_management_structure(self):
        """Test that task management elements are present"""
        try:
            response = requests.get(f"{self.base_url}/dashboard", timeout=10)
            
            if response.status_code == 200:
                html_content = response.text
                
                # Check for task management elements
                task_indicators = [
                    "Complete API design patterns",
                    "System design mock interview", 
                    "Database optimization project",
                    "Add Task",
                    "Edit",
                    "hours"
                ]
                
                found_tasks = 0
                for indicator in task_indicators:
                    if indicator in html_content:
                        found_tasks += 1
                
                if found_tasks >= 4:
                    self.log_test(
                        "Task Management Structure", 
                        True, 
                        f"Task management elements present - found {found_tasks}/6 task indicators"
                    )
                    return True
                else:
                    self.log_test(
                        "Task Management Structure", 
                        False, 
                        f"Limited task management elements - only {found_tasks}/6 indicators found"
                    )
                    return False
            else:
                self.log_test(
                    "Task Management Structure", 
                    False, 
                    f"Cannot check task management - HTTP {response.status_code}"
                )
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Task Management Structure", 
                False, 
                f"Error checking task management: {str(e)}"
            )
            return False
    
    def test_sidebar_navigation(self):
        """Test that sidebar navigation elements are present"""
        try:
            response = requests.get(f"{self.base_url}/dashboard", timeout=10)
            
            if response.status_code == 200:
                html_content = response.text
                
                # Check for navigation elements
                nav_items = ["Home", "Resume", "Roadmap", "Modules", "Jobs", "Calendar", "Insights", "Settings"]
                found_nav = 0
                
                for item in nav_items:
                    if item in html_content:
                        found_nav += 1
                
                if found_nav >= 6:
                    self.log_test(
                        "Sidebar Navigation", 
                        True, 
                        f"Navigation sidebar present - found {found_nav}/8 navigation items"
                    )
                    return True
                else:
                    self.log_test(
                        "Sidebar Navigation", 
                        False, 
                        f"Limited navigation items - only {found_nav}/8 items found"
                    )
                    return False
            else:
                self.log_test(
                    "Sidebar Navigation", 
                    False, 
                    f"Cannot check navigation - HTTP {response.status_code}"
                )
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Sidebar Navigation", 
                False, 
                f"Error checking navigation: {str(e)}"
            )
            return False
    
    def test_theme_system(self):
        """Test that theme system is implemented"""
        try:
            response = requests.get(f"{self.base_url}/dashboard", timeout=10)
            
            if response.status_code == 200:
                html_content = response.text
                
                # Check for theme system indicators
                theme_indicators = [
                    'class="dark"',  # Dark mode class
                    'bg-black',  # Dark background
                    'text-white',  # White text
                    'ThemeToggle',  # Theme toggle component
                    'theme-provider'  # Theme provider
                ]
                
                found_theme = 0
                for indicator in theme_indicators:
                    if indicator in html_content:
                        found_theme += 1
                
                if found_theme >= 3:
                    self.log_test(
                        "Theme System", 
                        True, 
                        f"Theme system implemented - found {found_theme}/5 theme indicators"
                    )
                    return True
                else:
                    self.log_test(
                        "Theme System", 
                        False, 
                        f"Limited theme implementation - only {found_theme}/5 indicators found"
                    )
                    return False
            else:
                self.log_test(
                    "Theme System", 
                    False, 
                    f"Cannot check theme system - HTTP {response.status_code}"
                )
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Theme System", 
                False, 
                f"Error checking theme system: {str(e)}"
            )
            return False
    
    def test_progress_indicators(self):
        """Test that progress tracking elements are present"""
        try:
            response = requests.get(f"{self.base_url}/dashboard", timeout=10)
            
            if response.status_code == 200:
                html_content = response.text
                
                # Check for progress indicators
                progress_indicators = [
                    "Readiness",
                    "Coverage", 
                    "Weekly Progress",
                    "%",  # Percentage indicators
                    "progress",  # Progress elements
                    "CircularProgress"  # Circular progress component
                ]
                
                found_progress = 0
                for indicator in progress_indicators:
                    if indicator in html_content:
                        found_progress += 1
                
                if found_progress >= 4:
                    self.log_test(
                        "Progress Indicators", 
                        True, 
                        f"Progress tracking present - found {found_progress}/6 progress indicators"
                    )
                    return True
                else:
                    self.log_test(
                        "Progress Indicators", 
                        False, 
                        f"Limited progress tracking - only {found_progress}/6 indicators found"
                    )
                    return False
            else:
                self.log_test(
                    "Progress Indicators", 
                    False, 
                    f"Cannot check progress indicators - HTTP {response.status_code}"
                )
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "Progress Indicators", 
                False, 
                f"Error checking progress indicators: {str(e)}"
            )
            return False
    
    def test_api_backend_integration(self):
        """Test that backend API is working and accessible from dashboard context"""
        try:
            # Test the API endpoints that the dashboard might use
            api_response = requests.get(f"{self.base_url}/api/root", timeout=10)
            
            if api_response.status_code == 200:
                api_data = api_response.json()
                if api_data.get('message') == 'Hello World':
                    self.log_test(
                        "API Backend Integration", 
                        True, 
                        "Backend API accessible and responding correctly"
                    )
                    return True
                else:
                    self.log_test(
                        "API Backend Integration", 
                        False, 
                        f"API responding but with unexpected data: {api_data}"
                    )
                    return False
            else:
                self.log_test(
                    "API Backend Integration", 
                    False, 
                    f"API not accessible - HTTP {api_response.status_code}"
                )
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test(
                "API Backend Integration", 
                False, 
                f"Error accessing API: {str(e)}"
            )
            return False
    
    def run_all_tests(self):
        """Run all dashboard tests"""
        print("🚀 Starting HeadwayOS Dashboard Functionality Tests")
        print(f"📍 Testing against: {self.base_url}/dashboard")
        print("=" * 60)
        
        # Run tests in order
        self.test_dashboard_accessibility()
        self.test_mock_data_integration()
        self.test_metric_cards_structure()
        self.test_interactive_elements()
        self.test_task_management_structure()
        self.test_sidebar_navigation()
        self.test_theme_system()
        self.test_progress_indicators()
        self.test_api_backend_integration()
        
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
    tester = DashboardTester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/dashboard_test_results.json', 'w') as f:
        json.dump({
            'summary': {
                'passed': tester.passed,
                'failed': tester.failed,
                'success_rate': (tester.passed / (tester.passed + tester.failed) * 100) if (tester.passed + tester.failed) > 0 else 0,
                'timestamp': datetime.now().isoformat()
            },
            'tests': tester.test_results
        }, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: /app/dashboard_test_results.json")
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()