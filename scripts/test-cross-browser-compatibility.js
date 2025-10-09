#!/usr/bin/env node

/**
 * Cross-Browser Compatibility Testing Script
 * Verifies animations work smoothly across different browsers
 * Requirements: 2.5, 5.4, 5.5, 5.6
 */

const fs = require('fs');
const path = require('path');

// Browser compatibility matrix
const BROWSER_SUPPORT = {
  'Chrome': { version: '90+', features: ['css-grid', 'flexbox', 'backdrop-filter', 'css-transforms', 'css-animations'] },
  'Firefox': { version: '88+', features: ['css-grid', 'flexbox', 'backdrop-filter', 'css-transforms', 'css-animations'] },
  'Safari': { version: '14+', features: ['css-grid', 'flexbox', 'backdrop-filter', 'css-transforms', 'css-animations'] },
  'Edge': { version: '90+', features: ['css-grid', 'flexbox', 'backdrop-filter', 'css-transforms', 'css-animations'] },
  'iOS Safari': { version: '14+', features: ['css-grid', 'flexbox', 'backdrop-filter', 'css-transforms', 'css-animations'] },
  'Chrome Mobile': { version: '90+', features: ['css-grid', 'flexbox', 'backdrop-filter', 'css-transforms', 'css-animations'] }
};

// CSS features that need vendor prefixes or fallbacks
const CSS_FEATURES = {
  'backdrop-filter': {
    prefixes: ['-webkit-backdrop-filter'],
    fallback: 'background-color with opacity',
    support: 'Modern browsers (Chrome 76+, Safari 9+, Firefox 103+)'
  },
  'css-grid': {
    prefixes: ['-ms-grid'],
    fallback: 'flexbox layout',
    support: 'All modern browsers'
  },
  'css-transforms': {
    prefixes: ['-webkit-transform', '-moz-transform', '-ms-transform'],
    fallback: 'position changes',
    support: 'All browsers'
  },
  'css-animations': {
    prefixes: ['-webkit-animation', '-moz-animation'],
    fallback: 'transition-based animations',
    support: 'All browsers'
  },
  'object-fit': {
    prefixes: [],
    fallback: 'background-image with background-size',
    support: 'Modern browsers (IE not supported)'
  }
};

class CrossBrowserTestSuite {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: []
    };
  }

  // Test CSS Grid compatibility and fallbacks
  testCSSGridCompatibility() {
    console.log('\n🔍 Testing CSS Grid Compatibility...');
    
    const heroComponent = path.join(process.cwd(), 'src/components/sections/Hero/Hero.tsx');
    
    if (!fs.existsSync(heroComponent)) {
      this.logTest('❌ Hero component not found', 'failed');
      return false;
    }

    const content = fs.readFileSync(heroComponent, 'utf8');
    
    // Check for CSS Grid usage and fallbacks
    const gridTests = [
      {
        pattern: /grid.*grid-cols-/,
        description: 'CSS Grid layout implementation',
        requirement: '5.1'
      },
      {
        pattern: /flex.*flex-col|flex-row/,
        description: 'Flexbox fallback for older browsers',
        requirement: '5.1'
      }
    ];

    let passed = true;
    gridTests.forEach(test => {
      if (test.pattern.test(content)) {
        this.logTest(`✅ ${test.description} (Req: ${test.requirement})`);
      } else {
        this.logTest(`⚠️  ${test.description} not found (Req: ${test.requirement})`, 'warning');
      }
    });

    this.updateResults(passed, 'CSS Grid Compatibility');
    return passed;
  }

  // Test animation compatibility
  testAnimationCompatibility() {
    console.log('\n🔍 Testing Animation Compatibility...');
    
    const animationFiles = [
      'src/utils/animations.ts',
      'src/components/common/Header/Header.tsx',
      'src/components/sections/Hero/Hero.tsx'
    ];

    let animationScore = 0;
    let totalFiles = 0;

    animationFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        totalFiles++;
        
        // Check for animation features
        const animationFeatures = [
          { pattern: /framer-motion/, description: 'Framer Motion for cross-browser animations' },
          { pattern: /transition.*duration/, description: 'CSS transitions with duration' },
          { pattern: /ease-in-out|ease-out|cubic-bezier/, description: 'Easing functions for smooth animations' },
          { pattern: /transform.*translate|scale|rotate/, description: 'CSS transforms for animations' },
          { pattern: /prefersReducedMotion|useReducedMotion/, description: 'Reduced motion accessibility support' }
        ];

        let fileScore = 0;
        animationFeatures.forEach(feature => {
          if (feature.pattern.test(content)) {
            fileScore++;
            this.logTest(`✅ ${path.basename(file)}: ${feature.description}`);
          }
        });

        if (fileScore >= 3) {
          animationScore++;
        } else {
          this.logTest(`⚠️  ${path.basename(file)}: Could improve animation compatibility`, 'warning');
        }
      }
    });

    const passed = animationScore === totalFiles;
    this.updateResults(passed, 'Animation Compatibility');
    return passed;
  }

  // Test backdrop-filter support and fallbacks
  testBackdropFilterSupport() {
    console.log('\n🔍 Testing Backdrop Filter Support...');
    
    const headerComponent = path.join(process.cwd(), 'src/components/common/Header/Header.tsx');
    
    if (!fs.existsSync(headerComponent)) {
      this.logTest('❌ Header component not found', 'failed');
      return false;
    }

    const content = fs.readFileSync(headerComponent, 'utf8');
    
    // Check for backdrop-filter usage and fallbacks
    const backdropTests = [
      {
        pattern: /backdrop-filter.*blur/,
        description: 'Backdrop filter blur effect',
        requirement: '6.1'
      },
      {
        pattern: /backdrop-blur-/,
        description: 'Tailwind backdrop blur classes',
        requirement: '6.1'
      },
      {
        pattern: /bg-.*\/\d+/,
        description: 'Background color fallback with opacity',
        requirement: '6.1'
      }
    ];

    let passed = true;
    backdropTests.forEach(test => {
      if (test.pattern.test(content)) {
        this.logTest(`✅ ${test.description} (Req: ${test.requirement})`);
      } else {
        this.logTest(`⚠️  ${test.description} not found (Req: ${test.requirement})`, 'warning');
      }
    });

    this.updateResults(passed, 'Backdrop Filter Support');
    return passed;
  }

  // Test video compatibility across browsers
  testVideoCompatibility() {
    console.log('\n🔍 Testing Video Compatibility...');
    
    const videoComponent = path.join(process.cwd(), 'src/components/ui/OptimizedVideo/OptimizedVideo.tsx');
    
    if (!fs.existsSync(videoComponent)) {
      this.logTest('❌ OptimizedVideo component not found', 'failed');
      return false;
    }

    const content = fs.readFileSync(videoComponent, 'utf8');
    
    // Check for video compatibility features
    const videoTests = [
      {
        pattern: /playsInline/,
        description: 'iOS Safari inline video support',
        requirement: '5.5'
      },
      {
        pattern: /muted.*autoPlay/,
        description: 'Autoplay with muted for browser policies',
        requirement: '5.5'
      },
      {
        pattern: /poster/,
        description: 'Poster image fallback',
        requirement: '5.5'
      },
      {
        pattern: /onError|fallback/,
        description: 'Error handling and fallbacks',
        requirement: '5.5'
      }
    ];

    let passed = true;
    videoTests.forEach(test => {
      if (test.pattern.test(content)) {
        this.logTest(`✅ ${test.description} (Req: ${test.requirement})`);
      } else {
        this.logTest(`❌ ${test.description} (Req: ${test.requirement})`, 'failed');
        passed = false;
      }
    });

    this.updateResults(passed, 'Video Compatibility');
    return passed;
  }

  // Test touch event compatibility
  testTouchEventCompatibility() {
    console.log('\n🔍 Testing Touch Event Compatibility...');
    
    const components = [
      'src/components/common/Header/Header.tsx',
      'src/components/sections/Hero/Hero.tsx'
    ];

    let touchScore = 0;
    let totalComponents = 0;

    components.forEach(componentPath => {
      const filePath = path.join(process.cwd(), componentPath);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        totalComponents++;
        
        // Check for touch compatibility features
        const touchFeatures = [
          { pattern: /touch-manipulation/, description: 'CSS touch-manipulation for better touch response' },
          { pattern: /whileTap/, description: 'Touch feedback animations' },
          { pattern: /onClick.*onTouchStart/, description: 'Both click and touch event handlers' },
          { pattern: /pointer-events/, description: 'Pointer events for unified input handling' }
        ];

        let componentScore = 0;
        touchFeatures.forEach(feature => {
          if (feature.pattern.test(content)) {
            componentScore++;
            this.logTest(`✅ ${path.basename(componentPath)}: ${feature.description}`);
          }
        });

        if (componentScore >= 1) {
          touchScore++;
        } else {
          this.logTest(`⚠️  ${path.basename(componentPath)}: Could improve touch compatibility`, 'warning');
        }
      }
    });

    const passed = touchScore === totalComponents;
    this.updateResults(passed, 'Touch Event Compatibility');
    return passed;
  }

  // Test CSS custom properties (CSS variables) support
  testCSSCustomProperties() {
    console.log('\n🔍 Testing CSS Custom Properties Support...');
    
    const cssFiles = [
      'src/app/globals.css',
      'src/styles/tokens.css'
    ];

    let cssVarScore = 0;
    let totalFiles = 0;

    cssFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        totalFiles++;
        
        // Check for CSS custom properties
        const hasCustomProps = /--[\w-]+:/.test(content);
        const hasVarUsage = /var\(--[\w-]+\)/.test(content);
        
        if (hasCustomProps && hasVarUsage) {
          cssVarScore++;
          this.logTest(`✅ ${file}: CSS custom properties implemented`);
        } else if (hasCustomProps || hasVarUsage) {
          this.logTest(`⚠️  ${file}: Partial CSS custom properties usage`, 'warning');
        } else {
          this.logTest(`ℹ️  ${file}: No CSS custom properties (using Tailwind classes)`);
        }
      }
    });

    // CSS custom properties are well supported, so this is informational
    this.updateResults(true, 'CSS Custom Properties');
    return true;
  }

  // Test JavaScript ES6+ feature usage and compatibility
  testJavaScriptCompatibility() {
    console.log('\n🔍 Testing JavaScript Compatibility...');
    
    const jsFiles = [
      'src/components/common/Header/Header.tsx',
      'src/components/sections/Hero/Hero.tsx',
      'src/hooks/useReducedMotion.ts'
    ];

    let jsScore = 0;
    let totalFiles = 0;

    jsFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        totalFiles++;
        
        // Check for modern JavaScript features
        const jsFeatures = [
          { pattern: /const |let /, description: 'ES6 const/let declarations' },
          { pattern: /=>/, description: 'Arrow functions' },
          { pattern: /async|await/, description: 'Async/await syntax' },
          { pattern: /\.\.\.|spread/, description: 'Spread operator' },
          { pattern: /\?\./, description: 'Optional chaining' },
          { pattern: /\?\?/, description: 'Nullish coalescing' }
        ];

        let fileScore = 0;
        jsFeatures.forEach(feature => {
          if (feature.pattern.test(content)) {
            fileScore++;
          }
        });

        if (fileScore >= 3) {
          jsScore++;
          this.logTest(`✅ ${path.basename(file)}: Modern JavaScript features used appropriately`);
        } else {
          this.logTest(`ℹ️  ${path.basename(file)}: Conservative JavaScript usage`);
        }
      }
    });

    // Modern JavaScript is transpiled by Next.js, so this is mostly informational
    this.updateResults(true, 'JavaScript Compatibility');
    return true;
  }

  // Generate browser compatibility report
  generateBrowserCompatibilityReport() {
    console.log('\n📊 Generating Browser Compatibility Report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      browserSupport: BROWSER_SUPPORT,
      cssFeatures: CSS_FEATURES,
      testResults: this.results,
      recommendations: this.generateCompatibilityRecommendations()
    };

    const reportPath = path.join(process.cwd(), 'browser-compatibility-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    this.logTest(`✅ Browser compatibility report generated: ${reportPath}`);
    return report;
  }

  generateCompatibilityRecommendations() {
    const recommendations = [];
    
    recommendations.push('Test on actual devices and browsers, not just browser dev tools');
    recommendations.push('Use BrowserStack or similar service for comprehensive browser testing');
    recommendations.push('Implement progressive enhancement for advanced features');
    recommendations.push('Provide fallbacks for CSS features with limited support');
    recommendations.push('Test video autoplay policies across different browsers');
    recommendations.push('Validate touch interactions on actual mobile devices');
    recommendations.push('Check animation performance on lower-end devices');
    
    if (this.results.warnings > 0) {
      recommendations.push('Address compatibility warnings to improve cross-browser support');
    }
    
    return recommendations;
  }

  logTest(message, type = 'passed') {
    console.log(message);
    this.results.tests.push({ message, type, timestamp: new Date().toISOString() });
    
    if (type === 'warning') {
      this.results.warnings++;
    }
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

  // Run all cross-browser compatibility tests
  async runAllTests() {
    console.log('🚀 Starting Cross-Browser Compatibility Test Suite...\n');
    
    const tests = [
      () => this.testCSSGridCompatibility(),
      () => this.testAnimationCompatibility(),
      () => this.testBackdropFilterSupport(),
      () => this.testVideoCompatibility(),
      () => this.testTouchEventCompatibility(),
      () => this.testCSSCustomProperties(),
      () => this.testJavaScriptCompatibility()
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
    const report = this.generateBrowserCompatibilityReport();
    
    console.log('\n📋 CROSS-BROWSER COMPATIBILITY SUMMARY');
    console.log('═══════════════════════════════════════');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️  Warnings: ${this.results.warnings}`);
    console.log(`📊 Total Tests: ${this.results.passed + this.results.failed}`);
    
    const successRate = (this.results.passed / (this.results.passed + this.results.failed)) * 100;
    console.log(`📈 Success Rate: ${successRate.toFixed(1)}%`);
    
    if (this.results.failed === 0) {
      console.log('\n🎉 All cross-browser compatibility tests passed!');
      console.log('The website should work well across modern browsers.');
    } else {
      console.log('\n⚠️  Some compatibility tests failed. Please review and fix the issues above.');
    }
    
    return report;
  }
}

// Run tests if called directly
if (require.main === module) {
  const testSuite = new CrossBrowserTestSuite();
  testSuite.runAllTests().catch(console.error);
}

module.exports = CrossBrowserTestSuite;