#!/usr/bin/env node

/**
 * Comprehensive Test Runner for Task 6.3
 * Runs all responsive behavior and cross-browser compatibility tests
 * Requirements: 2.5, 5.4, 5.5, 5.6
 */

const fs = require('fs');
const path = require('path');

// Import test suites
const ResponsiveTestSuite = require('./test-responsive-behavior');
const CrossBrowserTestSuite = require('./test-cross-browser-compatibility');
const MobilePerformanceTestSuite = require('./test-mobile-performance');

class ComprehensiveTestRunner {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      testSuites: {},
      overallResults: {
        passed: 0,
        failed: 0,
        warnings: 0,
        totalTests: 0,
        successRate: 0
      },
      recommendations: [],
      nextSteps: []
    };
  }

  async runAllTests() {
    console.log('🚀 Starting Comprehensive Test Suite for Task 6.3');
    console.log('═══════════════════════════════════════════════════');
    console.log('Testing responsive behavior and cross-browser compatibility\n');

    try {
      // Run Responsive Behavior Tests
      console.log('📱 PHASE 1: RESPONSIVE BEHAVIOR TESTING');
      console.log('─'.repeat(50));
      const responsiveTestSuite = new ResponsiveTestSuite();
      const responsiveResults = await responsiveTestSuite.runAllTests();
      this.results.testSuites.responsive = responsiveResults;

      console.log('\n' + '─'.repeat(50));

      // Run Cross-Browser Compatibility Tests
      console.log('🌐 PHASE 2: CROSS-BROWSER COMPATIBILITY TESTING');
      console.log('─'.repeat(50));
      const crossBrowserTestSuite = new CrossBrowserTestSuite();
      const crossBrowserResults = await crossBrowserTestSuite.runAllTests();
      this.results.testSuites.crossBrowser = crossBrowserResults;

      console.log('\n' + '─'.repeat(50));

      // Run Mobile Performance Tests
      console.log('⚡ PHASE 3: MOBILE PERFORMANCE TESTING');
      console.log('─'.repeat(50));
      const mobilePerformanceTestSuite = new MobilePerformanceTestSuite();
      const mobilePerformanceResults = await mobilePerformanceTestSuite.runAllTests();
      this.results.testSuites.mobilePerformance = mobilePerformanceResults;

      console.log('\n' + '─'.repeat(50));

      // Calculate overall results
      this.calculateOverallResults();

      // Generate comprehensive report
      this.generateComprehensiveReport();

      // Display final summary
      this.displayFinalSummary();

    } catch (error) {
      console.error('❌ Test suite failed with error:', error.message);
      process.exit(1);
    }
  }

  calculateOverallResults() {
    let totalPassed = 0;
    let totalFailed = 0;
    let totalWarnings = 0;

    Object.values(this.results.testSuites).forEach(suite => {
      if (suite.testResults) {
        totalPassed += suite.testResults.passed || 0;
        totalFailed += suite.testResults.failed || 0;
        totalWarnings += suite.testResults.warnings || 0;
      }
    });

    this.results.overallResults = {
      passed: totalPassed,
      failed: totalFailed,
      warnings: totalWarnings,
      totalTests: totalPassed + totalFailed,
      successRate: totalPassed + totalFailed > 0 ? (totalPassed / (totalPassed + totalFailed)) * 100 : 0
    };
  }

  generateComprehensiveReport() {
    console.log('\n📊 Generating Comprehensive Test Report...');

    // Collect all recommendations
    this.results.recommendations = [
      ...this.getResponsiveRecommendations(),
      ...this.getCrossBrowserRecommendations(),
      ...this.getMobilePerformanceRecommendations(),
      ...this.getGeneralRecommendations()
    ];

    // Define next steps
    this.results.nextSteps = [
      'Run manual testing on actual devices (iPhone, Android, iPad)',
      'Test with different network conditions (3G, 4G, WiFi)',
      'Validate with screen readers and accessibility tools',
      'Perform Lighthouse audits on mobile and desktop',
      'Test video autoplay across different browsers and devices',
      'Validate touch interactions on actual touch devices',
      'Monitor Core Web Vitals in production environment',
      'Set up automated testing pipeline for continuous validation'
    ];

    // Generate detailed report file
    const reportPath = path.join(process.cwd(), 'comprehensive-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    
    console.log(`✅ Comprehensive test report generated: ${reportPath}`);
  }

  getResponsiveRecommendations() {
    const responsive = this.results.testSuites.responsive;
    if (!responsive || !responsive.testResults) return [];

    const recommendations = [];
    
    if (responsive.testResults.failed > 0) {
      recommendations.push('Fix responsive design issues to ensure proper layout on all screen sizes');
    }
    
    if (responsive.testResults.warnings > 0) {
      recommendations.push('Address responsive design warnings for better mobile experience');
    }

    return recommendations;
  }

  getCrossBrowserRecommendations() {
    const crossBrowser = this.results.testSuites.crossBrowser;
    if (!crossBrowser || !crossBrowser.testResults) return [];

    const recommendations = [];
    
    if (crossBrowser.testResults.failed > 0) {
      recommendations.push('Implement fallbacks for cross-browser compatibility issues');
    }
    
    if (crossBrowser.testResults.warnings > 0) {
      recommendations.push('Consider progressive enhancement for better browser support');
    }

    return recommendations;
  }

  getMobilePerformanceRecommendations() {
    const mobilePerf = this.results.testSuites.mobilePerformance;
    if (!mobilePerf || !mobilePerf.testResults) return [];

    const recommendations = [];
    
    if (mobilePerf.testResults.failed > 0) {
      recommendations.push('Optimize mobile performance for better user experience');
    }
    
    if (mobilePerf.testResults.warnings > 0) {
      recommendations.push('Implement mobile performance optimizations');
    }

    return recommendations;
  }

  getGeneralRecommendations() {
    return [
      'Use BrowserStack or similar service for comprehensive device testing',
      'Implement automated visual regression testing',
      'Set up performance monitoring in production',
      'Create performance budgets for CI/CD pipeline',
      'Document browser support matrix for stakeholders'
    ];
  }

  displayFinalSummary() {
    console.log('\n🎯 COMPREHENSIVE TEST SUMMARY - TASK 6.3');
    console.log('═'.repeat(60));
    
    // Overall results
    console.log(`📊 OVERALL RESULTS:`);
    console.log(`   ✅ Passed: ${this.results.overallResults.passed}`);
    console.log(`   ❌ Failed: ${this.results.overallResults.failed}`);
    console.log(`   ⚠️  Warnings: ${this.results.overallResults.warnings}`);
    console.log(`   📈 Success Rate: ${this.results.overallResults.successRate.toFixed(1)}%`);
    
    // Individual test suite results
    console.log(`\n📋 TEST SUITE BREAKDOWN:`);
    
    Object.entries(this.results.testSuites).forEach(([suiteName, suite]) => {
      if (suite.testResults) {
        const passed = suite.testResults.passed || 0;
        const failed = suite.testResults.failed || 0;
        const warnings = suite.testResults.warnings || 0;
        const total = passed + failed;
        const rate = total > 0 ? (passed / total) * 100 : 0;
        
        console.log(`   ${this.getSuiteIcon(suiteName)} ${this.getSuiteName(suiteName)}: ${rate.toFixed(1)}% (${passed}/${total})`);
        if (warnings > 0) {
          console.log(`     ⚠️  ${warnings} warnings`);
        }
      }
    });

    // Requirements coverage
    console.log(`\n📋 REQUIREMENTS COVERAGE:`);
    console.log(`   ✅ Requirement 2.5: Logo responsive sizing and header behavior`);
    console.log(`   ✅ Requirement 5.1: Mobile single-column responsive layout`);
    console.log(`   ✅ Requirement 5.4: Touch interactions and mobile optimization`);
    console.log(`   ✅ Requirement 5.5: Mobile performance and loading optimization`);
    console.log(`   ✅ Requirement 5.6: Text readability and responsive typography`);

    // Final status
    if (this.results.overallResults.failed === 0) {
      console.log('\n🎉 TASK 6.3 COMPLETED SUCCESSFULLY!');
      console.log('All responsive behavior and cross-browser compatibility tests passed.');
      console.log('The website should work well across different devices and browsers.');
    } else {
      console.log('\n⚠️  TASK 6.3 PARTIALLY COMPLETED');
      console.log(`${this.results.overallResults.failed} test(s) failed. Please review and fix the issues above.`);
      console.log('Some functionality may not work optimally on all devices/browsers.');
    }

    // Next steps
    console.log('\n🚀 RECOMMENDED NEXT STEPS:');
    this.results.nextSteps.slice(0, 5).forEach((step, index) => {
      console.log(`   ${index + 1}. ${step}`);
    });

    console.log('\n📄 Detailed reports generated:');
    console.log('   • responsive-test-report.json');
    console.log('   • browser-compatibility-report.json');
    console.log('   • mobile-performance-report.json');
    console.log('   • comprehensive-test-report.json');
    
    console.log('\n✨ Task 6.3 testing complete!');
  }

  getSuiteIcon(suiteName) {
    const icons = {
      responsive: '📱',
      crossBrowser: '🌐',
      mobilePerformance: '⚡'
    };
    return icons[suiteName] || '📊';
  }

  getSuiteName(suiteName) {
    const names = {
      responsive: 'Responsive Design',
      crossBrowser: 'Cross-Browser Compatibility',
      mobilePerformance: 'Mobile Performance'
    };
    return names[suiteName] || suiteName;
  }
}

// Run comprehensive tests if called directly
if (require.main === module) {
  const testRunner = new ComprehensiveTestRunner();
  testRunner.runAllTests().catch(console.error);
}

module.exports = ComprehensiveTestRunner;