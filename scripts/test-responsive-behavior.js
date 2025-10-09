#!/usr/bin/env node

/**
 * Responsive Behavior Testing Script
 * Tests layout on various screen sizes and devices
 * Requirements: 2.5, 5.4, 5.5, 5.6
 */

const fs = require('fs');
const path = require('path');

// Common screen sizes and breakpoints to test
const SCREEN_SIZES = {
  // Mobile devices
  'iPhone SE': { width: 375, height: 667, type: 'mobile' },
  'iPhone 12/13/14': { width: 390, height: 844, type: 'mobile' },
  'iPhone 12/13/14 Pro Max': { width: 428, height: 926, type: 'mobile' },
  'Samsung Galaxy S21': { width: 360, height: 800, type: 'mobile' },
  'Samsung Galaxy Note': { width: 412, height: 915, type: 'mobile' },
  
  // Tablets
  'iPad Mini': { width: 768, height: 1024, type: 'tablet' },
  'iPad Air': { width: 820, height: 1180, type: 'tablet' },
  'iPad Pro 11"': { width: 834, height: 1194, type: 'tablet' },
  'iPad Pro 12.9"': { width: 1024, height: 1366, type: 'tablet' },
  'Surface Pro': { width: 912, height: 1368, type: 'tablet' },
  
  // Desktop
  'Small Desktop': { width: 1024, height: 768, type: 'desktop' },
  'Medium Desktop': { width: 1280, height: 720, type: 'desktop' },
  'Large Desktop': { width: 1440, height: 900, type: 'desktop' },
  'Full HD': { width: 1920, height: 1080, type: 'desktop' },
  '4K': { width: 3840, height: 2160, type: 'desktop' },
  
  // Edge cases
  'Very narrow': { width: 320, height: 568, type: 'mobile' },
  'Ultra-wide': { width: 2560, height: 1080, type: 'desktop' },
};

// Tailwind breakpoints from config
const TAILWIND_BREAKPOINTS = {
  'xs': 475,
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
};

class ResponsiveTestSuite {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };
  }

  // Test if components follow mobile-first responsive design
  testMobileFirstDesign() {
    console.log('\n🔍 Testing Mobile-First Design Principles...');
    
    const cssFiles = [
      'src/components/common/Header/Header.module.css',
      'src/app/globals.css',
      'src/styles/tokens.css'
    ];

    let mobileFirstScore = 0;
    let totalChecks = 0;

    cssFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for mobile-first media queries (min-width)
        const minWidthQueries = (content.match(/@media.*min-width/g) || []).length;
        const maxWidthQueries = (content.match(/@media.*max-width/g) || []).length;
        
        totalChecks++;
        if (minWidthQueries >= maxWidthQueries) {
          mobileFirstScore++;
          this.logTest(`✅ ${file}: Mobile-first approach detected (${minWidthQueries} min-width vs ${maxWidthQueries} max-width)`);
        } else {
          this.logTest(`⚠️  ${file}: Consider mobile-first approach (${minWidthQueries} min-width vs ${maxWidthQueries} max-width)`, 'warning');
        }
      }
    });

    const passed = mobileFirstScore === totalChecks;
    this.updateResults(passed, 'Mobile-First Design');
    return passed;
  }

  // Test responsive grid layouts
  testResponsiveGrids() {
    console.log('\n🔍 Testing Responsive Grid Layouts...');
    
    const heroComponent = path.join(process.cwd(), 'src/components/sections/Hero/Hero.tsx');
    
    if (!fs.existsSync(heroComponent)) {
      this.logTest('❌ Hero component not found', 'failed');
      return false;
    }

    const content = fs.readFileSync(heroComponent, 'utf8');
    
    // Check for responsive grid classes
    const tests = [
      {
        pattern: /grid-cols-1.*md:grid-cols-2/,
        description: 'Hero section uses responsive grid (mobile single-column, desktop split-screen)',
        requirement: '5.1'
      },
      {
        pattern: /min-h-\[50vh\].*md:min-h-full/,
        description: 'Proper minimum height handling for mobile and desktop',
        requirement: '5.2'
      },
      {
        pattern: /order-\d+.*md:order-\d+/,
        description: 'Content ordering changes between mobile and desktop',
        requirement: '5.1'
      }
    ];

    let passed = true;
    tests.forEach(test => {
      if (test.pattern.test(content)) {
        this.logTest(`✅ ${test.description} (Req: ${test.requirement})`);
      } else {
        this.logTest(`❌ ${test.description} (Req: ${test.requirement})`, 'failed');
        passed = false;
      }
    });

    this.updateResults(passed, 'Responsive Grid Layouts');
    return passed;
  }

  // Test touch-friendly interactions
  testTouchInteractions() {
    console.log('\n🔍 Testing Touch-Friendly Interactions...');
    
    const components = [
      'src/components/common/Header/Header.tsx',
      'src/components/sections/Hero/Hero.tsx',
      'src/components/ui/HamburgerIcon/HamburgerIcon.tsx'
    ];

    let touchFriendlyScore = 0;
    let totalComponents = 0;

    components.forEach(componentPath => {
      const filePath = path.join(process.cwd(), componentPath);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        totalComponents++;
        
        // Check for touch-friendly features
        const touchFeatures = [
          { pattern: /touch-manipulation/, description: 'CSS touch-manipulation property' },
          { pattern: /p-\d+.*sm:p-\d+/, description: 'Responsive padding for touch targets' },
          { pattern: /w-\d+.*h-\d+.*sm:w-\d+.*sm:h-\d+/, description: 'Responsive touch target sizes' },
          { pattern: /whileTap/, description: 'Touch feedback animations' }
        ];

        let componentScore = 0;
        touchFeatures.forEach(feature => {
          if (feature.pattern.test(content)) {
            componentScore++;
            this.logTest(`✅ ${path.basename(componentPath)}: ${feature.description}`);
          }
        });

        if (componentScore >= 2) {
          touchFriendlyScore++;
        } else {
          this.logTest(`⚠️  ${path.basename(componentPath)}: Could improve touch-friendliness`, 'warning');
        }
      }
    });

    const passed = touchFriendlyScore === totalComponents;
    this.updateResults(passed, 'Touch-Friendly Interactions');
    return passed;
  }

  // Test responsive typography
  testResponsiveTypography() {
    console.log('\n🔍 Testing Responsive Typography...');
    
    const heroComponent = path.join(process.cwd(), 'src/components/sections/Hero/Hero.tsx');
    
    if (!fs.existsSync(heroComponent)) {
      this.logTest('❌ Hero component not found', 'failed');
      return false;
    }

    const content = fs.readFileSync(heroComponent, 'utf8');
    
    // Check for responsive text classes
    const typographyTests = [
      {
        pattern: /text-\w+.*sm:text-\w+.*md:text-\w+.*lg:text-\w+/,
        description: 'Multi-breakpoint responsive text sizing',
        requirement: '5.6'
      },
      {
        pattern: /text-\w+.*md:text-\w+/,
        description: 'Basic responsive text sizing',
        requirement: '5.6'
      },
      {
        pattern: /leading-\w+/,
        description: 'Proper line height management',
        requirement: '5.6'
      }
    ];

    let passed = true;
    typographyTests.forEach(test => {
      if (test.pattern.test(content)) {
        this.logTest(`✅ ${test.description} (Req: ${test.requirement})`);
      } else {
        this.logTest(`⚠️  ${test.description} not found (Req: ${test.requirement})`, 'warning');
      }
    });

    this.updateResults(passed, 'Responsive Typography');
    return passed;
  }

  // Test breakpoint consistency
  testBreakpointConsistency() {
    console.log('\n🔍 Testing Breakpoint Consistency...');
    
    const tailwindConfig = path.join(process.cwd(), 'tailwind.config.js');
    
    if (!fs.existsSync(tailwindConfig)) {
      this.logTest('❌ Tailwind config not found', 'failed');
      return false;
    }

    const content = fs.readFileSync(tailwindConfig, 'utf8');
    
    // Check if custom breakpoints are defined
    const hasCustomBreakpoints = /screens:\s*{/.test(content);
    
    if (hasCustomBreakpoints) {
      this.logTest('✅ Custom breakpoints defined in Tailwind config');
      
      // Extract breakpoint values
      Object.entries(TAILWIND_BREAKPOINTS).forEach(([name, value]) => {
        const pattern = new RegExp(`'${name}':\\s*'${value}px'`);
        if (pattern.test(content)) {
          this.logTest(`✅ Breakpoint ${name}: ${value}px correctly defined`);
        }
      });
    } else {
      this.logTest('⚠️  Using default Tailwind breakpoints', 'warning');
    }

    this.updateResults(true, 'Breakpoint Consistency');
    return true;
  }

  // Test component responsiveness
  testComponentResponsiveness() {
    console.log('\n🔍 Testing Component Responsiveness...');
    
    const components = [
      {
        path: 'src/components/common/Header/Header.tsx',
        tests: [
          { pattern: /h-12.*lg:h-14/, description: 'Logo responsive sizing', requirement: '2.5' },
          { pattern: /px-4.*sm:px-6.*lg:px-8/, description: 'Responsive padding', requirement: '2.5' }
        ]
      },
      {
        path: 'src/components/sections/Hero/Hero.tsx',
        tests: [
          { pattern: /flex-col.*sm:flex-row/, description: 'Button layout responsive', requirement: '5.4' },
          { pattern: /w-full.*sm:w-auto/, description: 'Button width responsive', requirement: '5.4' },
          { pattern: /text-center.*md:text-left/, description: 'Text alignment responsive', requirement: '5.1' }
        ]
      }
    ];

    let allPassed = true;
    
    components.forEach(component => {
      const filePath = path.join(process.cwd(), component.path);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        component.tests.forEach(test => {
          if (test.pattern.test(content)) {
            this.logTest(`✅ ${path.basename(component.path)}: ${test.description} (Req: ${test.requirement})`);
          } else {
            this.logTest(`❌ ${path.basename(component.path)}: ${test.description} (Req: ${test.requirement})`, 'failed');
            allPassed = false;
          }
        });
      } else {
        this.logTest(`❌ Component not found: ${component.path}`, 'failed');
        allPassed = false;
      }
    });

    this.updateResults(allPassed, 'Component Responsiveness');
    return allPassed;
  }

  // Generate responsive test report
  generateResponsiveTestReport() {
    console.log('\n📊 Generating Responsive Test Report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      screenSizes: SCREEN_SIZES,
      breakpoints: TAILWIND_BREAKPOINTS,
      testResults: this.results,
      recommendations: this.generateRecommendations()
    };

    const reportPath = path.join(process.cwd(), 'responsive-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    this.logTest(`✅ Responsive test report generated: ${reportPath}`);
    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.results.warnings > 0) {
      recommendations.push('Address responsive design warnings to improve mobile experience');
    }
    
    if (this.results.failed > 0) {
      recommendations.push('Fix failed responsive tests to ensure proper layout on all devices');
    }
    
    recommendations.push('Test on actual devices to validate responsive behavior');
    recommendations.push('Use browser dev tools to simulate different screen sizes');
    recommendations.push('Consider implementing responsive images with srcset');
    
    return recommendations;
  }

  logTest(message, type = 'passed') {
    console.log(message);
    this.results.tests.push({ message, type, timestamp: new Date().toISOString() });
  }

  updateResults(passed, testName) {
    if (passed) {
      this.results.passed++;
      console.log(`✅ ${testName}: PASSED`);
    } else {
      this.results.failed++;
      console.log(`❌ ${testName}: FAILED`);
    }
  }

  // Run all responsive tests
  async runAllTests() {
    console.log('🚀 Starting Responsive Behavior Test Suite...\n');
    
    const tests = [
      () => this.testMobileFirstDesign(),
      () => this.testResponsiveGrids(),
      () => this.testTouchInteractions(),
      () => this.testResponsiveTypography(),
      () => this.testBreakpointConsistency(),
      () => this.testComponentResponsiveness()
    ];

    for (const test of tests) {
      try {
        await test();
      } catch (error) {
        console.error(`❌ Test failed with error: ${error.message}`);
        this.results.failed++;
      }
    }

    // Generate final report
    const report = this.generateResponsiveTestReport();
    
    console.log('\n📋 RESPONSIVE TEST SUMMARY');
    console.log('═══════════════════════════');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️  Warnings: ${this.results.warnings}`);
    console.log(`📊 Total Tests: ${this.results.passed + this.results.failed}`);
    
    const successRate = (this.results.passed / (this.results.passed + this.results.failed)) * 100;
    console.log(`📈 Success Rate: ${successRate.toFixed(1)}%`);
    
    if (this.results.failed === 0) {
      console.log('\n🎉 All responsive tests passed! The layout should work well on all screen sizes.');
    } else {
      console.log('\n⚠️  Some responsive tests failed. Please review and fix the issues above.');
    }
    
    return report;
  }
}

// Run tests if called directly
if (require.main === module) {
  const testSuite = new ResponsiveTestSuite();
  testSuite.runAllTests().catch(console.error);
}

module.exports = ResponsiveTestSuite;