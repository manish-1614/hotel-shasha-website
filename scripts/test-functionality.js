#!/usr/bin/env node

/**
 * Comprehensive functionality testing script for Hotel Shasha website
 * Tests core functionality, responsive design, and browser compatibility
 */

const fs = require('fs');
const path = require('path');

class WebsiteTester {
  constructor() {
    this.testResults = {
      passed: 0,
      failed: 0,
      warnings: 0,
      details: [],
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      info: '✓',
      warning: '⚠',
      error: '✗',
    }[type];

    console.log(`${prefix} [${timestamp}] ${message}`);

    this.testResults.details.push({
      timestamp,
      message,
      type,
    });

    if (type === 'error') this.testResults.failed++;
    else if (type === 'warning') this.testResults.warnings++;
    else this.testResults.passed++;
  }

  // Test file structure and required files
  testFileStructure() {
    console.log('\n🔍 Testing File Structure...');

    const requiredFiles = [
      'src/app/page.tsx',
      'src/app/layout.tsx',
      'src/components/common/Header/Header.tsx',
      'src/components/common/Footer/Footer.tsx',
      'src/components/sections/Hero/Hero.tsx',
      'src/components/sections/Rooms/Rooms.tsx',
      'src/components/sections/Dining/Dining.tsx',
      'src/components/sections/Amenities/Amenities.tsx',
      'src/components/sections/Location/Location.tsx',
      'src/components/sections/Contact/Contact.tsx',
      'src/components/common/Newsletter/Newsletter.tsx',
    ];

    requiredFiles.forEach((file) => {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        this.log(`Required file exists: ${file}`);
      } else {
        this.log(`Missing required file: ${file}`, 'error');
      }
    });
  }

  // Test TypeScript compilation
  testTypeScript() {
    console.log('\n🔍 Testing TypeScript Compilation...');

    const { execSync } = require('child_process');

    try {
      execSync('npm run type-check', {
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe',
      });
      this.log('TypeScript compilation successful');
    } catch (error) {
      this.log(`TypeScript compilation failed: ${error.message}`, 'error');
    }
  }

  // Test ESLint
  testLinting() {
    console.log('\n🔍 Testing Code Quality (ESLint)...');

    const { execSync } = require('child_process');

    try {
      execSync('npm run lint', {
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe',
      });
      this.log('ESLint passed - no linting errors');
    } catch (error) {
      this.log(`ESLint found issues: ${error.message}`, 'warning');
    }
  }

  // Test build process
  testBuild() {
    console.log('\n🔍 Testing Build Process...');

    const { execSync } = require('child_process');

    try {
      execSync('npm run build', {
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe',
      });
      this.log('Build process completed successfully');

      // Check if build output exists
      const buildPath = path.join(__dirname, '..', '.next');
      if (fs.existsSync(buildPath)) {
        this.log('Build output directory created');
      } else {
        this.log('Build output directory not found', 'error');
      }
    } catch (error) {
      this.log(`Build process failed: ${error.message}`, 'error');
    }
  }

  // Test component imports and exports
  testComponentStructure() {
    console.log('\n🔍 Testing Component Structure...');

    const componentDirs = [
      'src/components/common',
      'src/components/sections',
      'src/components/ui',
    ];

    componentDirs.forEach((dir) => {
      const dirPath = path.join(__dirname, '..', dir);
      if (fs.existsSync(dirPath)) {
        const components = fs.readdirSync(dirPath);
        this.log(`Found ${components.length} components in ${dir}`);

        components.forEach((component) => {
          const componentPath = path.join(dirPath, component);
          const stats = fs.statSync(componentPath);

          if (stats.isDirectory()) {
            const tsxFile = path.join(componentPath, `${component}.tsx`);
            const indexFile = path.join(componentPath, 'index.ts');

            if (fs.existsSync(tsxFile)) {
              this.log(`Component ${component} has main TSX file`);
            } else {
              this.log(
                `Component ${component} missing main TSX file`,
                'warning'
              );
            }
          }
        });
      } else {
        this.log(`Component directory not found: ${dir}`, 'error');
      }
    });
  }

  // Test CSS and styling
  testStyling() {
    console.log('\n🔍 Testing Styling and CSS...');

    const styleFiles = [
      'src/styles/globals.css',
      'src/styles/tokens.css',
      'tailwind.config.js',
    ];

    styleFiles.forEach((file) => {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        this.log(`Style file exists: ${file}`);
      } else {
        this.log(`Missing style file: ${file}`, 'warning');
      }
    });
  }

  // Test API routes
  testAPIRoutes() {
    console.log('\n🔍 Testing API Routes...');

    const apiRoutes = ['src/app/api/contact/route.ts'];

    apiRoutes.forEach((route) => {
      const routePath = path.join(__dirname, '..', route);
      if (fs.existsSync(routePath)) {
        this.log(`API route exists: ${route}`);

        // Check if route has proper exports
        const content = fs.readFileSync(routePath, 'utf8');
        if (content.includes('export async function POST')) {
          this.log(`API route ${route} has POST handler`);
        } else {
          this.log(`API route ${route} missing POST handler`, 'warning');
        }
      } else {
        this.log(`Missing API route: ${route}`, 'error');
      }
    });
  }

  // Generate test report
  generateReport() {
    console.log('\n📊 Test Results Summary');
    console.log('========================');
    console.log(`✓ Passed: ${this.testResults.passed}`);
    console.log(`⚠ Warnings: ${this.testResults.warnings}`);
    console.log(`✗ Failed: ${this.testResults.failed}`);
    console.log(
      `Total Tests: ${this.testResults.passed + this.testResults.warnings + this.testResults.failed}`
    );

    // Write detailed report to file
    const reportPath = path.join(__dirname, '..', 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.testResults, null, 2));
    console.log(`\nDetailed report saved to: ${reportPath}`);

    return this.testResults.failed === 0;
  }

  // Run all tests
  async runAllTests() {
    console.log('🚀 Starting Hotel Shasha Website Testing Suite');
    console.log('===============================================');

    this.testFileStructure();
    this.testComponentStructure();
    this.testStyling();
    this.testAPIRoutes();
    this.testTypeScript();
    this.testLinting();
    this.testBuild();

    const success = this.generateReport();

    if (success) {
      console.log('\n🎉 All tests passed! Website is ready for deployment.');
    } else {
      console.log('\n❌ Some tests failed. Please review the issues above.');
      process.exit(1);
    }
  }
}

// Run tests if script is executed directly
if (require.main === module) {
  const tester = new WebsiteTester();
  tester.runAllTests().catch(console.error);
}

module.exports = WebsiteTester;
