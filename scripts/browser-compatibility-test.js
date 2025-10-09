#!/usr/bin/env node

/**
 * Browser Compatibility Testing Script for Hotel Shasha Website
 * Tests for cross-browser compatibility issues and provides recommendations
 */

const fs = require('fs');
const path = require('path');

class BrowserCompatibilityTester {
  constructor() {
    this.supportedBrowsers = {
      chrome: { name: 'Chrome', minVersion: 90 },
      firefox: { name: 'Firefox', minVersion: 88 },
      safari: { name: 'Safari', minVersion: 14 },
      edge: { name: 'Edge', minVersion: 90 }
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

  // Test CSS features for browser compatibility
  testCSSCompatibility() {
    console.log('\n🔍 Testing CSS Browser Compatibility...');
    
    const cssFiles = [
      'src/styles/globals.css',
      'src/styles/tokens.css'
    ];

    const modernCSSFeatures = [
      { feature: 'CSS Grid', pattern: /display:\s*grid|grid-template/ },
      { feature: 'Flexbox', pattern: /display:\s*flex|flex-direction/ },
      { feature: 'CSS Custom Properties', pattern: /--[\w-]+:|var\(--/ },
      { feature: 'CSS Transforms', pattern: /transform:|translate|rotate|scale/ },
      { feature: 'CSS Transitions', pattern: /transition:|transition-/ },
      { feature: 'CSS Animations', pattern: /@keyframes|animation:/ }
    ];

    cssFiles.forEach(file => {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        modernCSSFeatures.forEach(({ feature, pattern }) => {
          if (pattern.test(content)) {
            this.log(`${feature} detected in ${file} - ensure fallbacks for older browsers`);
          }
        });
      }
    });
  }

  // Test JavaScript features for browser compatibility
  testJavaScriptCompatibility() {
    console.log('\n🔍 Testing JavaScript Browser Compatibility...');
    
    const jsFiles = [
      'src/hooks',
      'src/utils',
      'src/components'
    ];

    const modernJSFeatures = [
      { feature: 'Arrow Functions', pattern: /=>\s*{|=>\s*\w/ },
      { feature: 'Template Literals', pattern: /`.*\${.*}.*`/ },
      { feature: 'Destructuring', pattern: /const\s*{.*}|const\s*\[.*\]/ },
      { feature: 'Async/Await', pattern: /async\s+function|await\s+/ },
      { feature: 'Fetch API', pattern: /fetch\(/ },
      { feature: 'Intersection Observer', pattern: /IntersectionObserver/ }
    ];

    jsFiles.forEach(dir => {
      const dirPath = path.join(__dirname, '..', dir);
      if (fs.existsSync(dirPath)) {
        this.scanDirectoryForFeatures(dirPath, modernJSFeatures);
      }
    });
  }

  scanDirectoryForFeatures(dirPath, features) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    
    files.forEach(file => {
      if (file.isDirectory()) {
        this.scanDirectoryForFeatures(path.join(dirPath, file.name), features);
      } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
        const filePath = path.join(dirPath, file.name);
        const content = fs.readFileSync(filePath, 'utf8');
        
        features.forEach(({ feature, pattern }) => {
          if (pattern.test(content)) {
            this.log(`${feature} used in ${file.name} - ensure polyfills if needed`, 'info');
          }
        });
      }
    });
  }

  // Test for polyfills and fallbacks
  testPolyfillsAndFallbacks() {
    console.log('\n🔍 Testing Polyfills and Fallbacks...');
    
    const nextConfigPath = path.join(__dirname, '..', 'next.config.ts');
    
    if (fs.existsSync(nextConfigPath)) {
      const content = fs.readFileSync(nextConfigPath, 'utf8');
      
      // Check for polyfill configuration
      if (content.includes('polyfill') || content.includes('browserslist')) {
        this.log('Polyfill configuration found in Next.js config');
      } else {
        this.log('No explicit polyfill configuration found', 'warning');
      }
    }

    // Check package.json for browserslist
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      if (packageJson.browserslist) {
        this.log('Browserslist configuration found in package.json');
      } else {
        this.log('No browserslist configuration found', 'warning');
      }
    }
  }

  // Test for vendor prefixes
  testVendorPrefixes() {
    console.log('\n🔍 Testing Vendor Prefixes...');
    
    const cssFiles = [
      'src/styles/globals.css',
      'src/styles/tokens.css'
    ];

    const vendorPrefixes = ['-webkit-', '-moz-', '-ms-', '-o-'];
    
    cssFiles.forEach(file => {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        const hasVendorPrefixes = vendorPrefixes.some(prefix => content.includes(prefix));
        
        if (hasVendorPrefixes) {
          this.log(`Vendor prefixes found in ${file}`);
        } else {
          this.log(`No vendor prefixes in ${file} - consider autoprefixer`, 'warning');
        }
      }
    });
  }

  // Test for accessibility features
  testAccessibilityFeatures() {
    console.log('\n🔍 Testing Accessibility Features...');
    
    const componentDirs = [
      'src/components/common',
      'src/components/sections',
      'src/components/ui'
    ];

    const accessibilityFeatures = [
      { feature: 'ARIA Labels', pattern: /aria-label|aria-labelledby/ },
      { feature: 'ARIA Roles', pattern: /role=/ },
      { feature: 'Alt Text', pattern: /alt=/ },
      { feature: 'Tab Index', pattern: /tabIndex|tabindex/ },
      { feature: 'Focus Management', pattern: /focus\(|onFocus/ }
    ];

    componentDirs.forEach(dir => {
      const dirPath = path.join(__dirname, '..', dir);
      if (fs.existsSync(dirPath)) {
        this.scanDirectoryForAccessibility(dirPath, accessibilityFeatures);
      }
    });
  }

  scanDirectoryForAccessibility(dirPath, features) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    
    files.forEach(file => {
      if (file.isDirectory()) {
        this.scanDirectoryForAccessibility(path.join(dirPath, file.name), features);
      } else if (file.name.endsWith('.tsx')) {
        const filePath = path.join(dirPath, file.name);
        const content = fs.readFileSync(filePath, 'utf8');
        
        features.forEach(({ feature, pattern }) => {
          if (pattern.test(content)) {
            this.log(`${feature} implemented in ${file.name}`);
          }
        });
      }
    });
  }

  // Generate browser compatibility report
  generateReport() {
    console.log('\n📊 Browser Compatibility Test Results');
    console.log('=====================================');
    console.log(`✓ Passed: ${this.testResults.passed}`);
    console.log(`⚠ Warnings: ${this.testResults.warnings}`);
    console.log(`✗ Failed: ${this.testResults.failed}`);
    
    console.log('\n🌐 Supported Browsers:');
    Object.values(this.supportedBrowsers).forEach(browser => {
      console.log(`- ${browser.name} ${browser.minVersion}+`);
    });
    
    console.log('\n📋 Browser Testing Checklist:');
    const checklist = [
      'Test page loading and navigation',
      'Verify form submissions work',
      'Check animation performance',
      'Test responsive design',
      'Validate accessibility features',
      'Check console for JavaScript errors',
      'Test touch interactions on mobile',
      'Verify image loading and optimization'
    ];
    
    checklist.forEach(item => console.log(`- [ ] ${item}`));
    
    // Write detailed report
    const reportPath = path.join(__dirname, '..', 'browser-compatibility-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      ...this.testResults,
      supportedBrowsers: this.supportedBrowsers,
      checklist,
      recommendations: [
        'Use autoprefixer for vendor prefixes',
        'Include polyfills for older browsers',
        'Test on actual devices when possible',
        'Use progressive enhancement approach',
        'Implement graceful degradation for animations'
      ]
    }, null, 2));
    
    console.log(`\nDetailed report saved to: ${reportPath}`);
    
    return this.testResults.failed === 0;
  }

  // Run all browser compatibility tests
  async runAllTests() {
    console.log('🌐 Starting Browser Compatibility Testing Suite');
    console.log('===============================================');
    
    this.testCSSCompatibility();
    this.testJavaScriptCompatibility();
    this.testPolyfillsAndFallbacks();
    this.testVendorPrefixes();
    this.testAccessibilityFeatures();
    
    const success = this.generateReport();
    
    if (success) {
      console.log('\n🎉 Browser compatibility tests completed!');
    } else {
      console.log('\n❌ Some compatibility issues found. Please review.');
    }
    
    return success;
  }
}

// Run tests if script is executed directly
if (require.main === module) {
  const tester = new BrowserCompatibilityTester();
  tester.runAllTests().catch(console.error);
}

module.exports = BrowserCompatibilityTester;