#!/usr/bin/env node

/**
 * Deployment Readiness Check for Hotel Shasha Website
 * Quick verification before going live
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DeploymentChecker {
  constructor() {
    this.checks = {
      passed: 0,
      failed: 0,
      warnings: 0
    };
  }

  log(message, type = 'info') {
    const prefix = {
      info: '✅',
      warning: '⚠️',
      error: '❌',
      section: '🔍'
    }[type];
    
    console.log(`${prefix} ${message}`);
    
    if (type === 'error') this.checks.failed++;
    else if (type === 'warning') this.checks.warnings++;
    else if (type === 'info') this.checks.passed++;
  }

  // Check essential files exist
  checkEssentialFiles() {
    console.log('\n🔍 Checking Essential Files...');
    
    const essentialFiles = [
      'src/app/page.tsx',
      'src/app/layout.tsx',
      'package.json',
      'next.config.ts',
      'tailwind.config.js',
      'public/robots.txt',
      'public/sitemap.xml'
    ];

    essentialFiles.forEach(file => {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        this.log(`${file} exists`);
      } else {
        this.log(`Missing essential file: ${file}`, 'error');
      }
    });
  }

  // Check TypeScript compilation
  checkTypeScript() {
    console.log('\n🔍 Checking TypeScript...');
    
    try {
      execSync('npx tsc --noEmit', { 
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });
      this.log('TypeScript compilation successful');
    } catch (error) {
      this.log('TypeScript compilation failed', 'error');
      console.log(error.stdout?.toString() || error.message);
    }
  }

  // Check for production readiness
  checkProductionReadiness() {
    console.log('\n🔍 Checking Production Readiness...');
    
    // Check for console.log statements
    const srcFiles = this.findFiles(path.join(__dirname, '..', 'src'), ['.ts', '.tsx']);
    let consoleCount = 0;
    
    srcFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const matches = content.match(/console\.(log|warn|error|debug)/g);
      if (matches) {
        consoleCount += matches.length;
      }
    });
    
    if (consoleCount > 0) {
      this.log(`Found ${consoleCount} console statements - consider removing for production`, 'warning');
    } else {
      this.log('No console statements found');
    }
    
    // Check for TODO comments
    let todoCount = 0;
    srcFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const matches = content.match(/\/\/\s*TODO|\/\*\s*TODO|\{\/\*\s*TODO/gi);
      if (matches) {
        todoCount += matches.length;
      }
    });
    
    if (todoCount > 0) {
      this.log(`Found ${todoCount} TODO comments - review before deployment`, 'warning');
    } else {
      this.log('No TODO comments found');
    }
  }

  // Check environment configuration
  checkEnvironment() {
    console.log('\n🔍 Checking Environment Configuration...');
    
    // Check for environment variables
    const nextConfigPath = path.join(__dirname, '..', 'next.config.ts');
    if (fs.existsSync(nextConfigPath)) {
      const content = fs.readFileSync(nextConfigPath, 'utf8');
      
      if (content.includes('env') || content.includes('publicRuntimeConfig')) {
        this.log('Environment configuration found');
      } else {
        this.log('No environment configuration detected');
      }
    }
    
    // Check package.json scripts
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    const requiredScripts = ['build', 'start', 'dev'];
    requiredScripts.forEach(script => {
      if (packageJson.scripts[script]) {
        this.log(`Script '${script}' configured`);
      } else {
        this.log(`Missing script: ${script}`, 'error');
      }
    });
  }

  // Check SEO basics
  checkSEO() {
    console.log('\n🔍 Checking SEO Basics...');
    
    // Check layout.tsx for metadata
    const layoutPath = path.join(__dirname, '..', 'src/app/layout.tsx');
    if (fs.existsSync(layoutPath)) {
      const content = fs.readFileSync(layoutPath, 'utf8');
      
      if (content.includes('metadata') || content.includes('title')) {
        this.log('Metadata configuration found');
      } else {
        this.log('No metadata configuration found', 'warning');
      }
    }
    
    // Check robots.txt
    const robotsPath = path.join(__dirname, '..', 'public/robots.txt');
    if (fs.existsSync(robotsPath)) {
      this.log('robots.txt exists');
    } else {
      this.log('robots.txt missing', 'warning');
    }
    
    // Check sitemap.xml
    const sitemapPath = path.join(__dirname, '..', 'public/sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      this.log('sitemap.xml exists');
    } else {
      this.log('sitemap.xml missing', 'warning');
    }
  }

  // Check security basics
  checkSecurity() {
    console.log('\n🔍 Checking Security Basics...');
    
    // Check for hardcoded secrets
    const srcFiles = this.findFiles(path.join(__dirname, '..', 'src'), ['.ts', '.tsx']);
    let secretsFound = false;
    
    const secretPatterns = [
      /api[_-]?key/i,
      /secret[_-]?key/i,
      /password\s*[:=]/i,
      /token\s*[:=]/i
    ];
    
    srcFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      secretPatterns.forEach(pattern => {
        if (pattern.test(content)) {
          secretsFound = true;
        }
      });
    });
    
    if (secretsFound) {
      this.log('Potential hardcoded secrets found - review code', 'warning');
    } else {
      this.log('No hardcoded secrets detected');
    }
  }

  findFiles(dir, extensions) {
    let files = [];
    
    if (!fs.existsSync(dir)) return files;
    
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        files = files.concat(this.findFiles(fullPath, extensions));
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    });
    
    return files;
  }

  // Generate deployment report
  generateReport() {
    console.log('\n📊 Deployment Readiness Report');
    console.log('===============================');
    console.log(`✅ Passed: ${this.checks.passed}`);
    console.log(`⚠️ Warnings: ${this.checks.warnings}`);
    console.log(`❌ Failed: ${this.checks.failed}`);
    
    const totalChecks = this.checks.passed + this.checks.warnings + this.checks.failed;
    const successRate = Math.round((this.checks.passed / totalChecks) * 100);
    
    console.log(`\n📈 Success Rate: ${successRate}%`);
    
    if (this.checks.failed === 0) {
      console.log('\n🚀 DEPLOYMENT READY!');
      console.log('All critical checks passed. Website is ready for production.');
    } else {
      console.log('\n⚠️ DEPLOYMENT BLOCKED');
      console.log('Critical issues found. Please resolve before deploying.');
    }
    
    console.log('\n📋 Next Steps:');
    console.log('1. Run manual testing checklist');
    console.log('2. Test on staging environment');
    console.log('3. Verify all external integrations');
    console.log('4. Backup current production (if applicable)');
    console.log('5. Deploy to production');
    console.log('6. Monitor for errors post-deployment');
    
    return this.checks.failed === 0;
  }

  // Run all deployment checks
  async runDeploymentCheck() {
    console.log('🚀 Hotel Shasha Website - Deployment Readiness Check');
    console.log('====================================================');
    
    this.checkEssentialFiles();
    this.checkTypeScript();
    this.checkProductionReadiness();
    this.checkEnvironment();
    this.checkSEO();
    this.checkSecurity();
    
    return this.generateReport();
  }
}

// Run checks if script is executed directly
if (require.main === module) {
  const checker = new DeploymentChecker();
  checker.runDeploymentCheck().catch(console.error);
}

module.exports = DeploymentChecker;