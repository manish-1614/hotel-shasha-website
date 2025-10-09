#!/usr/bin/env node

/**
 * Responsive Design Testing Script for Hotel Shasha Website
 * Tests layout and functionality across different screen sizes
 */

const fs = require('fs');
const path = require('path');

class ResponsiveTester {
  constructor() {
    this.breakpoints = {
      mobile: [320, 375, 414],
      tablet: [768, 834, 1024],
      desktop: [1280, 1440, 1920]
    };
    
    this.testResults = {
      passed: 0,
      failed: 0,
      warnings: 0,
      details: []
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      info: '✓',
      warning: '⚠',
      error: '✗'
    }[type];
    
    console.log(`${prefix} [${timestamp}] ${message}`);
    
    this.testResults.details.push({
      timestamp,
      message,
      type
    });
    
    if (type === 'error') this.testResults.failed++;
    else if (type === 'warning') this.testResults.warnings++;
    else this.testResults.passed++;
  }

  // Test CSS breakpoints and media queries
  testCSSBreakpoints() {
    console.log('\n🔍 Testing CSS Breakpoints...');
    
    const cssFiles = [
      'src/styles/globals.css',
      'tailwind.config.js'
    ];

    cssFiles.forEach(file => {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for responsive breakpoints
        const hasMediaQueries = content.includes('@media') || content.includes('sm:') || content.includes('md:') || content.includes('lg:');
        
        if (hasMediaQueries) {
          this.log(`Responsive breakpoints found in ${file}`);
        } else {
          this.log(`No responsive breakpoints found in ${file}`, 'warning');
        }
      }
    });
  }

  // Test component responsive behavior
  testComponentResponsiveness() {
    console.log('\n🔍 Testing Component Responsive Behavior...');
    
    const componentDirs = [
      'src/components/common/Header',
      'src/components/sections/Hero',
      'src/components/sections/Rooms',
      'src/components/sections/Contact'
    ];

    componentDirs.forEach(dir => {
      const dirPath = path.join(__dirname, '..', dir);
      if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        
        // Check for CSS modules with responsive styles
        const cssFiles = files.filter(file => file.endsWith('.module.css'));
        
        cssFiles.forEach(cssFile => {
          const cssPath = path.join(dirPath, cssFile);
          const content = fs.readFileSync(cssPath, 'utf8');
          
          if (content.includes('@media')) {
            this.log(`Responsive styles found in ${dir}/${cssFile}`);
          } else {
            this.log(`No responsive styles in ${dir}/${cssFile}`, 'warning');
          }
        });
      }
    });
  }

  // Test mobile navigation
  testMobileNavigation() {
    console.log('\n🔍 Testing Mobile Navigation...');
    
    const headerPath = path.join(__dirname, '..', 'src/components/common/Header/Header.tsx');
    
    if (fs.existsSync(headerPath)) {
      const content = fs.readFileSync(headerPath, 'utf8');
      
      // Check for mobile menu implementation
      const hasMobileMenu = content.includes('hamburger') || content.includes('mobile') || content.includes('MenuIcon');
      
      if (hasMobileMenu) {
        this.log('Mobile navigation implementation found');
      } else {
        this.log('Mobile navigation implementation not found', 'error');
      }
      
      // Check for responsive navigation hook
      const hasResponsiveHook = content.includes('useMobileMenu') || content.includes('useResponsive');
      
      if (hasResponsiveHook) {
        this.log('Responsive navigation hook found');
      } else {
        this.log('Responsive navigation hook not found', 'warning');
      }
    }
  }

  // Test form responsiveness
  testFormResponsiveness() {
    console.log('\n🔍 Testing Form Responsive Design...');
    
    const formComponents = [
      'src/components/sections/Contact/Contact.tsx',
      'src/components/common/Newsletter/Newsletter.tsx'
    ];

    formComponents.forEach(component => {
      const componentPath = path.join(__dirname, '..', component);
      
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf8');
        
        // Check for responsive form classes
        const hasResponsiveClasses = content.includes('sm:') || content.includes('md:') || content.includes('lg:');
        
        if (hasResponsiveClasses) {
          this.log(`Responsive form styling found in ${component}`);
        } else {
          this.log(`No responsive form styling in ${component}`, 'warning');
        }
      }
    });
  }

  // Test image responsiveness
  testImageResponsiveness() {
    console.log('\n🔍 Testing Image Responsive Behavior...');
    
    const imageComponents = [
      'src/components/ui/OptimizedImage/OptimizedImage.tsx',
      'src/components/sections/Hero/Hero.tsx',
      'src/components/sections/Rooms/Rooms.tsx'
    ];

    imageComponents.forEach(component => {
      const componentPath = path.join(__dirname, '..', component);
      
      if (fs.existsSync(componentPath)) {
        const content = fs.readFileSync(componentPath, 'utf8');
        
        // Check for Next.js Image component usage
        const usesNextImage = content.includes('next/image') || content.includes('Image from');
        
        if (usesNextImage) {
          this.log(`Next.js Image component used in ${component}`);
        } else {
          this.log(`Next.js Image component not used in ${component}`, 'warning');
        }
        
        // Check for responsive image attributes
        const hasResponsiveAttrs = content.includes('sizes=') || content.includes('fill') || content.includes('responsive');
        
        if (hasResponsiveAttrs) {
          this.log(`Responsive image attributes found in ${component}`);
        } else {
          this.log(`No responsive image attributes in ${component}`, 'warning');
        }
      }
    });
  }

  // Generate responsive test report
  generateReport() {
    console.log('\n📊 Responsive Design Test Results');
    console.log('=================================');
    console.log(`✓ Passed: ${this.testResults.passed}`);
    console.log(`⚠ Warnings: ${this.testResults.warnings}`);
    console.log(`✗ Failed: ${this.testResults.failed}`);
    
    // Breakpoint recommendations
    console.log('\n📱 Recommended Testing Breakpoints:');
    Object.entries(this.breakpoints).forEach(([device, widths]) => {
      console.log(`${device.toUpperCase()}: ${widths.join('px, ')}px`);
    });
    
    // Write detailed report
    const reportPath = path.join(__dirname, '..', 'responsive-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      ...this.testResults,
      breakpoints: this.breakpoints,
      recommendations: [
        'Test all breakpoints manually in browser dev tools',
        'Verify touch targets are at least 44px on mobile',
        'Check text readability at all screen sizes',
        'Ensure horizontal scrolling is not required',
        'Test form usability on mobile devices'
      ]
    }, null, 2));
    
    console.log(`\nDetailed report saved to: ${reportPath}`);
    
    return this.testResults.failed === 0;
  }

  // Run all responsive tests
  async runAllTests() {
    console.log('📱 Starting Responsive Design Testing Suite');
    console.log('===========================================');
    
    this.testCSSBreakpoints();
    this.testComponentResponsiveness();
    this.testMobileNavigation();
    this.testFormResponsiveness();
    this.testImageResponsiveness();
    
    const success = this.generateReport();
    
    if (success) {
      console.log('\n🎉 Responsive design tests completed successfully!');
    } else {
      console.log('\n❌ Some responsive design issues found. Please review.');
    }
    
    return success;
  }
}

// Run tests if script is executed directly
if (require.main === module) {
  const tester = new ResponsiveTester();
  tester.runAllTests().catch(console.error);
}

module.exports = ResponsiveTester;