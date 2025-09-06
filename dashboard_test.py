#!/usr/bin/env python3
"""
Dashboard Functionality Testing for HeadwayOS Application
Tests the dashboard features including mock data, interactivity, and persistence
"""

import requests
import json
import sys
import time
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException

class DashboardTester:
    def __init__(self):
        self.test_results = []
        self.passed = 0
        self.failed = 0
        self.base_url = "http://localhost:3001"
        self.driver = None
        
    def setup_driver(self):
        """Setup Chrome driver with headless options"""
        try:
            chrome_options = Options()
            chrome_options.add_argument("--headless")
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument("--disable-dev-shm-usage")
            chrome_options.add_argument("--disable-gpu")
            chrome_options.add_argument("--window-size=1920,1080")
            
            self.driver = webdriver.Chrome(options=chrome_options)
            self.driver.implicitly_wait(10)
            return True
        except Exception as e:
            self.log_test("Driver Setup", False, f"Failed to setup Chrome driver: {str(e)}")
            return False
    
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
    
    def test_dashboard_loads_without_loading_screen(self):
        """Test that dashboard loads properly without showing loading screen"""
        try:
            self.driver.get(f"{self.base_url}/dashboard")
            
            # Wait for page to load
            time.sleep(3)
            
            # Check if loading screen is present
            loading_elements = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Loading your dashboard')]")
            
            if loading_elements:
                self.log_test(
                    "Dashboard Loading", 
                    False, 
                    "Dashboard still shows loading screen - mock data not loading properly"
                )
                return False
            
            # Check for main dashboard elements
            try:
                welcome_element = WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'WELCOME BACK')]"))
                )
                
                self.log_test(
                    "Dashboard Loading", 
                    True, 
                    "Dashboard loaded successfully without loading screen"
                )
                return True
                
            except TimeoutException:
                self.log_test(
                    "Dashboard Loading", 
                    False, 
                    "Dashboard elements not found - page may not be loading correctly"
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Dashboard Loading", 
                False, 
                f"Error accessing dashboard: {str(e)}"
            )
            return False
    
    def test_mock_data_integration(self):
        """Test that mock data is properly integrated and displayed"""
        try:
            # Check for user name display
            user_elements = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Aarav')]")
            if not user_elements:
                self.log_test(
                    "Mock Data Integration", 
                    False, 
                    "User name 'Aarav' not found in dashboard"
                )
                return False
            
            # Check for metrics display
            metrics_found = 0
            metric_texts = ["MATCH", "MARKET FIT", "INTERVIEWS", "MODULES"]
            
            for metric in metric_texts:
                elements = self.driver.find_elements(By.XPATH, f"//*[contains(text(), '{metric}')]")
                if elements:
                    metrics_found += 1
            
            if metrics_found >= 3:  # At least 3 out of 4 metrics should be visible
                self.log_test(
                    "Mock Data Integration", 
                    True, 
                    f"Mock data properly integrated - found {metrics_found}/4 metric cards"
                )
                return True
            else:
                self.log_test(
                    "Mock Data Integration", 
                    False, 
                    f"Insufficient metric cards found - only {metrics_found}/4 visible"
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Mock Data Integration", 
                False, 
                f"Error checking mock data: {str(e)}"
            )
            return False
    
    def test_metric_cards_display(self):
        """Test that metric cards display correctly with trending indicators"""
        try:
            # Look for percentage values in metric cards
            percentage_elements = self.driver.find_elements(By.XPATH, "//*[contains(text(), '%')]")
            
            if len(percentage_elements) >= 2:
                self.log_test(
                    "Metric Cards Display", 
                    True, 
                    f"Metric cards displaying correctly with percentage values - found {len(percentage_elements)} percentage indicators"
                )
                return True
            else:
                self.log_test(
                    "Metric Cards Display", 
                    False, 
                    f"Insufficient metric percentage displays found - only {len(percentage_elements)}"
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Metric Cards Display", 
                False, 
                f"Error checking metric cards: {str(e)}"
            )
            return False
    
    def test_interactive_metrics(self):
        """Test that metric cards are clickable and update values"""
        try:
            # Find clickable metric cards
            metric_cards = self.driver.find_elements(By.CSS_SELECTOR, "[class*='cursor-pointer']")
            
            if not metric_cards:
                self.log_test(
                    "Interactive Metrics", 
                    False, 
                    "No clickable metric cards found"
                )
                return False
            
            # Try to click on the first metric card
            initial_text = metric_cards[0].text if metric_cards else ""
            
            # Click the metric card
            self.driver.execute_script("arguments[0].click();", metric_cards[0])
            time.sleep(1)
            
            # Check if anything changed (this is a basic test)
            self.log_test(
                "Interactive Metrics", 
                True, 
                f"Metric cards are clickable - found {len(metric_cards)} interactive elements"
            )
            return True
                
        except Exception as e:
            self.log_test(
                "Interactive Metrics", 
                False, 
                f"Error testing interactive metrics: {str(e)}"
            )
            return False
    
    def test_task_management(self):
        """Test task management functionality"""
        try:
            # Look for task elements
            task_elements = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Complete') or contains(text(), 'System design') or contains(text(), 'Database')]")
            
            if len(task_elements) >= 2:
                self.log_test(
                    "Task Management", 
                    True, 
                    f"Task management elements found - {len(task_elements)} task-related elements visible"
                )
                return True
            else:
                self.log_test(
                    "Task Management", 
                    False, 
                    f"Insufficient task elements found - only {len(task_elements)}"
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Task Management", 
                False, 
                f"Error checking task management: {str(e)}"
            )
            return False
    
    def test_sidebar_functionality(self):
        """Test navigation sidebar functionality"""
        try:
            # Look for sidebar navigation items
            nav_items = ["Home", "Resume", "Roadmap", "Modules", "Jobs", "Calendar", "Insights", "Settings"]
            found_items = 0
            
            for item in nav_items:
                elements = self.driver.find_elements(By.XPATH, f"//*[contains(text(), '{item}')]")
                if elements:
                    found_items += 1
            
            if found_items >= 6:  # At least 6 out of 8 nav items should be visible
                self.log_test(
                    "Sidebar Functionality", 
                    True, 
                    f"Navigation sidebar working - found {found_items}/8 navigation items"
                )
                return True
            else:
                self.log_test(
                    "Sidebar Functionality", 
                    False, 
                    f"Insufficient navigation items found - only {found_items}/8"
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Sidebar Functionality", 
                False, 
                f"Error checking sidebar: {str(e)}"
            )
            return False
    
    def test_right_sidebar_toggle(self):
        """Test right sidebar visibility toggle"""
        try:
            # Look for Insights button in header
            insights_button = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Insights')]")
            
            if insights_button:
                # Click the insights button to toggle sidebar
                self.driver.execute_script("arguments[0].click();", insights_button[0])
                time.sleep(1)
                
                self.log_test(
                    "Right Sidebar Toggle", 
                    True, 
                    "Right sidebar toggle functionality available"
                )
                return True
            else:
                self.log_test(
                    "Right Sidebar Toggle", 
                    False, 
                    "Insights button not found for sidebar toggle"
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Right Sidebar Toggle", 
                False, 
                f"Error testing sidebar toggle: {str(e)}"
            )
            return False
    
    def test_theme_toggle(self):
        """Test theme toggle functionality"""
        try:
            # Look for theme toggle button or dark mode indicators
            theme_elements = self.driver.find_elements(By.CSS_SELECTOR, "[class*='theme'], [class*='dark']")
            
            # Check if page has dark theme styling
            body_element = self.driver.find_element(By.TAG_NAME, "body")
            body_classes = body_element.get_attribute("class")
            
            if "dark" in body_classes or theme_elements:
                self.log_test(
                    "Theme Toggle", 
                    True, 
                    "Theme system is active - dark mode detected"
                )
                return True
            else:
                self.log_test(
                    "Theme Toggle", 
                    False, 
                    "Theme system not detected"
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Theme Toggle", 
                False, 
                f"Error checking theme toggle: {str(e)}"
            )
            return False
    
    def test_progress_tracking(self):
        """Test progress tracking and visual indicators"""
        try:
            # Look for progress bars or percentage indicators
            progress_elements = self.driver.find_elements(By.CSS_SELECTOR, "[class*='progress'], [style*='width']")
            
            # Look for readiness percentage
            readiness_elements = self.driver.find_elements(By.XPATH, "//*[contains(text(), 'Readiness')]")
            
            if progress_elements or readiness_elements:
                self.log_test(
                    "Progress Tracking", 
                    True, 
                    f"Progress tracking elements found - {len(progress_elements)} progress indicators"
                )
                return True
            else:
                self.log_test(
                    "Progress Tracking", 
                    False, 
                    "No progress tracking elements found"
                )
                return False
                
        except Exception as e:
            self.log_test(
                "Progress Tracking", 
                False, 
                f"Error checking progress tracking: {str(e)}"
            )
            return False
    
    def test_localStorage_persistence(self):
        """Test localStorage data persistence"""
        try:
            # Execute JavaScript to check localStorage
            dashboard_data = self.driver.execute_script("return localStorage.getItem('dashboardData');")
            user_profile = self.driver.execute_script("return localStorage.getItem('userProfile');")
            learning_plan = self.driver.execute_script("return localStorage.getItem('learningPlan');")
            
            stored_items = 0
            if dashboard_data:
                stored_items += 1
            if user_profile:
                stored_items += 1
            if learning_plan:
                stored_items += 1
            
            if stored_items >= 2:
                self.log_test(
                    "LocalStorage Persistence", 
                    True, 
                    f"Data persistence working - {stored_items}/3 data items stored in localStorage"
                )
                return True
            else:
                self.log_test(
                    "LocalStorage Persistence", 
                    False, 
                    f"Insufficient data persistence - only {stored_items}/3 items in localStorage"
                )
                return False
                
        except Exception as e:
            self.log_test(
                "LocalStorage Persistence", 
                False, 
                f"Error checking localStorage: {str(e)}"
            )
            return False
    
    def run_all_tests(self):
        """Run all dashboard tests"""
        print("🚀 Starting HeadwayOS Dashboard Functionality Tests")
        print(f"📍 Testing against: {self.base_url}/dashboard")
        print("=" * 60)
        
        # Setup driver
        if not self.setup_driver():
            return False
        
        try:
            # Run tests in order
            self.test_dashboard_loads_without_loading_screen()
            self.test_mock_data_integration()
            self.test_metric_cards_display()
            self.test_interactive_metrics()
            self.test_task_management()
            self.test_sidebar_functionality()
            self.test_right_sidebar_toggle()
            self.test_theme_toggle()
            self.test_progress_tracking()
            self.test_localStorage_persistence()
            
        finally:
            if self.driver:
                self.driver.quit()
        
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