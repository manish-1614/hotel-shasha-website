#!/usr/bin/env node

/**
 * Final Testing Suite for Hotel Shasha Website
 * Comprehensive testing before deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import our existing test modules
const WebsiteTester = require('./test-functionality');
const BrowserCompatibilityTester = require('./browser-compatibility-test');
const ResponsiveTester = require('./responsive-test');

class FinalTestingSuite {
  constructor() {
    this.testResults = {
      passed: 0,
      failed: 0,
      warnings: 0,
      details: [],
      performance: {},
      recommendations: []
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      info: '✓',
      warning: '⚠',
      error: '✗',
      section: '🔍'
    }[type];
    
    console.log(`${prefix} [${timestamp}] ${message}`);
    
    this.testResults.details.push({
      timestamp,
      message,
      type
    });
    
    if (type === 'error') this.testResults.failed++;
    else if (type === 'warning') this.testResults.warnings++;
    else if (type === 'info') this.testResults.passed++;
  }

  // Test bundle size and performance
  async testPerformance() {
    console.log('\n🚀 Testing Performance Metrics...');
    
    try {
      // Build the project first
      this.log('Building project for performance analysis...', 'section');
      execSync('npm run build', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });

      // Check bundle sizes
      const nextDir = path.join(__dirname, '..', '.next');
      if (fs.existsSync(nextDir)) {
        const buildManifest = path.join(nextDir, 'build-manifest.json');
        if (fs.existsSync(buildManifest)) {
          const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
          this.log('Build manifest found - analyzing bundle sizes');
          
          // Analyze main bundle size
          const pages = manifest.pages;
          if (pages['/']) {
            const mainBundles = pages['/'];
            this.log(`Main page bundles: ${mainBundles.length} files`);
          }
        }
      }

      // Check for common performance issues
      this.checkImageOptimization();
      this.checkCSSOptimization();
      this.checkJavaScriptOptimization();
      
    } catch (error) {
      this.log(`Performance testing failed: ${error.message}`, 'error');
    }
  }

  checkImageOptimization() {
    this.log('Checking image optimization...', 'section');
    
    const publicDir = path.join(__dirname, '..', 'public');
    if (fs.existsSync(publicDir)) {
      const images = this.findFiles(publicDir, ['.jpg', '.jpeg', '.png', '.webp']);
      
      images.forEach(image => {
        const stats = fs.statSync(image);
        const sizeKB = Math.round(stats.size / 1024);
        
        if (sizeKB > 500) {
          this.log(`Large image detected: ${path.basename(image)} (${sizeKB}KB)`, 'warning');
          this.testResults.recommendations.push(`Optimize ${path.basename(image)} - consider WebP format`);
        } else {
          this.log(`Image size OK: ${path.basename(image)} (${sizeKB}KB)`);
        }
      });
    }
  }

  checkCSSOptimization() {
    this.log('Checking CSS optimization...', 'section');
    
    const cssFiles = [
      'src/styles/globals.css',
      'src/styles/tokens.css'
    ];

    cssFiles.forEach(file => {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n').length;
        const sizeKB = Math.round(Buffer.byteLength(content, 'utf8') / 1024);
        
        this.log(`CSS file ${file}: ${lines} lines, ${sizeKB}KB`);
        
        // Check for unused CSS patterns
        if (content.includes('/* TODO') || content.includes('// TODO')) {
          this.log(`TODO comments found in ${file}`, 'warning');
        }
      }
    });
  }

  checkJavaScriptOptimization() {
    this.log('Checking JavaScript optimization...', 'section');
    
    // Check for console.log statements in production code
    const jsFiles = this.findFiles(path.join(__dirname, '..', 'src'), ['.ts', '.tsx']);
    let consoleLogsFound = 0;
    
    jsFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const consoleMatches = content.match(/console\.(log|warn|error)/g);
      if (consoleMatches) {
        consoleLogsFound += consoleMatches.length;
      }
    });
    
    if (consoleLogsFound > 0) {
      this.log(`${consoleLogsFound} console statements found in source code`, 'warning');
      this.testResults.recommendations.push('Remove console statements before production deployment');
    } else {
      this.log('No console statements found in source code');
    }
  }

  findFiles(dir, extensions) {
    let files = [];
    
    if (!fs.existsSync(dir)) return files;
    
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files = files.concat(this.findFiles(fullPath, extensions));
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    });
    
    return files;
  }

  // Test accessibility compliance
  async testAccessibility() {
    console.log('\n♿ Testing Accessibility Compliance...');
    
    const components = this.findFiles(path.join(__dirname, '..', 'src/components'), ['.tsx']);
    
    let accessibilityScore = 0;
    let totalChecks = 0;
    
    components.forEach(component => {
      const content = fs.readFileSync(component, 'utf8');
      const fileName = path.basename(component);
      
      // Check for ARIA labels
      totalChecks++;
      if (content.includes('aria-label') || content.includes('aria-labelledby')) {
        accessibilityScore++;
        this.log(`ARIA labels found in ${fileName}`);
      }
      
      // Check for alt text on images
      totalChecks++;
      if (content.includes('<Image') || content.includes('<img')) {
        if (content.includes('alt=')) {
          accessibilityScore++;
          this.log(`Alt text found in ${fileName}`);
        } else {
          this.log(`Missing alt text in ${fileName}`, 'warning');
        }
      } else {
        accessibilityScore++; // No images, so this passes
      }
      
      // Check for semantic HTML
      totalChecks++;
      const semanticTags = ['<main', '<section', '<article', '<nav', '<header', '<footer'];
      if (semanticTags.some(tag => content.includes(tag))) {
        accessibilityScore++;
        this.log(`Semantic HTML found in ${fileName}`);
      }
    });
    
    const accessibilityPercentage = Math.round((accessibilityScore / totalChecks) * 100);
    this.log(`Accessibility score: ${accessibilityPercentage}% (${accessibilityScore}/${totalChecks})`);
    
    if (accessibilityPercentage < 80) {
      this.testResults.recommendations.push('Improve accessibility compliance - aim for 90%+');
    }
  }

  // Test SEO readiness
  async testSEO() {
    console.log('\n🔍 Testing SEO Readiness...');
    
    // Check layout.tsx for meta tags
    const layoutPath = path.join(__dirname, '..', 'src/app/layout.tsx');
    if (fs.existsSync(layoutPath)) {
      const content = fs.readFileSync(layoutPath, 'utf8');
      
      if (content.includes('metadata')) {
        this.log('Metadata configuration found in layout');
      } else {
        this.log('No metadata configuration found', 'warning');
      }
      
      if (content.includes('title')) {
        this.log('Title configuration found');
      } else {
        this.log('No title configuration found', 'warning');
      }
    }
    
    // Check for robots.txt
    const robotsPath = path.join(__dirname, '..', 'public/robots.txt');
    if (fs.existsSync(robotsPath)) {
      this.log('robots.txt found');
    } else {
      this.log('robots.txt not found', 'warning');
      this.testResults.recommendations.push('Add robots.txt for better SEO');
    }
    
    // Check for sitemap
    const sitemapPath = path.join(__dirname, '..', 'public/sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      this.log('sitemap.xml found');
    } else {
      this.log('sitemap.xml not found', 'warning');
      this.testResults.recommendations.push('Add sitemap.xml for better SEO');
    }
  }

  // Generate comprehensive final report
  generateFinalReport() {
    console.log('\n📊 Final Testing Report');
    console.log('========================');
    console.log(`✓ Passed: ${this.testResults.passed}`);
    console.log(`⚠ Warnings: ${this.testResults.warnings}`);
    console.log(`✗ Failed: ${this.testResults.failed}`);
    console.log(`Total Tests: ${this.testResults.passed + this.testResults.warnings + this.testResults.failed}`);
    
    if (this.testResults.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      this.testResults.recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec}`);
      });
    }
    
    console.log('\n🚀 Deployment Readiness Checklist:');
    const checklist = [
      'All core functionality tests pass',
      'Browser compatibility verified',
      'Responsive design tested',
      'Performance metrics acceptable',
      'Accessibility compliance checked',
      'SEO basics implemented',
      'No console errors in production build',
      'Images optimized for web',
      'Bundle size optimized'
    ];
    
    checklist.forEach(item => console.log(`- [ ] ${item}`));
    
    // Write comprehensive report
    const reportPath = path.join(__dirname, '..', 'final-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      ...this.testResults,
      checklist,
      timestamp: new Date().toISOString(),
      deploymentReady: this.testResults.failed === 0
    }, null, 2));
    
    console.log(`\nComprehensive report saved to: ${reportPath}`);
    
    return this.testResults.failed === 0;
  }

  // Run all final tests
  async runFinalTests() {
    console.log('🎯 Hotel Shasha Website - Final Testing Suite');
    console.log('==============================================');
    console.log('Running comprehensive pre-deployment tests...\n');
    
    try {
      // Run existing test suites
      console.log('1️⃣ Running Core Functionality Tests...');
      const functionalityTester = new WebsiteTester();
      await functionalityTester.runAllTests();
      
      console.log('\n2️⃣ Running Browser Compatibility Tests...');
      const browserTester = new BrowserCompatibilityTester();
      await browserTester.runAllTests();
      
      console.log('\n3️⃣ Running Responsive Design Tests...');
      const responsiveTester = new ResponsiveTester();
      await responsiveTester.runAllTests();
      
      // Run additional final tests
      console.log('\n4️⃣ Running Performance Tests...');
      await this.testPerformance();
      
      console.log('\n5️⃣ Running Accessibility Tests...');
      await this.testAccessibility();
      
      console.log('\n6️⃣ Running SEO Readiness Tests...');
      await this.testSEO();
      
      const success = this.generateFinalReport();
      
      if (success) {
        console.log('\n🎉 All final tests completed successfully!');
        console.log('🚀 Website is ready for deployment!');
      } else {
        console.log('\n❌ Some issues found. Please review before deployment.');
      }
      
      return success;
      
    } catch (error) {
      console.error('❌ Final testing suite failed:', error.message);
      return false;
    }
  }
}

// Run tests if script is executed directly
if (require.main === module) {
  const finalTester = new FinalTestingSuite();
  finalTester.runFinalTests().catch(console.error);
}

module.exports = FinalTestingSuite;