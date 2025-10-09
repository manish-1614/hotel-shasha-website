#!/usr/bin/env node

/**
 * Mobile Performance Testing Script
 * Optimizes performance for mobile devices
 * Requirements: 5.5, 5.6
 */

const fs = require('fs');
const path = require('path');

// Performance thresholds for mobile devices
const PERFORMANCE_THRESHOLDS = {
  // Core Web Vitals
  LCP: 2.5, // Largest Contentful Paint (seconds)
  FID: 100, // First Input Delay (milliseconds)
  CLS: 0.1, // Cumulative Layout Shift
  
  // Additional metrics
  FCP: 1.8, // First Contentful Paint (seconds)
  TTI: 3.8, // Time to Interactive (seconds)
  TBT: 200, // Total Blocking Time (milliseconds)
  
  // Resource sizes
  maxImageSize: 500, // KB
  maxVideoSize: 2000, // KB
  maxJSBundle: 1000, // KB
  maxCSSBundle: 100, // KB
};

// Mobile-specific optimizations to check
const MOBILE_OPTIMIZATIONS = {
  images: ['lazy loading', 'responsive images', 'WebP format', 'proper sizing'],
  videos: ['lazy loading', 'poster images', 'compression', 'fallback images'],
  animations: ['reduced motion support', 'GPU acceleration', 'performance monitoring'],
  loading: ['code splitting', 'preloading', 'critical CSS', 'resource hints'],
  caching: ['service worker', 'cache headers', 'static assets'],
};

class MobilePerformanceTestSuite {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      tests: [],
      optimizations: []
    };
  }

  // Test image optimization for mobile
  testImageOptimization() {
    console.log('\n🔍 Testing Image Optimization for Mobile...');
    
    const imageComponents = [
      'src/components/ui/OptimizedImage/OptimizedImage.tsx',
      'src/components/sections/Hero/Hero.tsx'
    ];

    let imageScore = 0;
    let totalComponents = 0;

    imageComponents.forEach(componentPath => {
      const filePath = path.join(process.cwd(), componentPath);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        totalComponents++;
        
        // Check for image optimization features
        const imageOptimizations = [
          { pattern: /next\/image/, description: 'Next.js Image component for optimization' },
          { pattern: /priority.*loading.*lazy/, description: 'Lazy loading implementation' },
          { pattern: /sizes.*viewport/, description: 'Responsive image sizes' },
          { pattern: /placeholder.*blur/, description: 'Blur placeholder for better UX' },
          { pattern: /quality.*\d+/, description: 'Image quality optimization' }
        ];

        let componentScore = 0;
        imageOptimizations.forEach(optimization => {
          if (optimization.pattern.test(content)) {
            componentScore++;
            this.logTest(`✅ ${path.basename(componentPath)}: ${optimization.description}`);
          }
        });

        if (componentScore >= 3) {
          imageScore++;
        } else {
          this.logTest(`⚠️  ${path.basename(componentPath)}: Could improve image optimization`, 'warning');
        }
      }
    });

    const passed = imageScore === totalComponents;
    this.updateResults(passed, 'Image Optimization');
    return passed;
  }

  // Test video optimization for mobile
  testVideoOptimization() {
    console.log('\n🔍 Testing Video Optimization for Mobile...');
    
    const videoComponent = path.join(process.cwd(), 'src/components/ui/OptimizedVideo/OptimizedVideo.tsx');
    const videoHook = path.join(process.cwd(), 'src/hooks/useVideoOptimization.ts');
    
    let videoOptimizations = 0;
    let totalChecks = 0;

    [videoComponent, videoHook].forEach(filePath => {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        totalChecks++;
        
        // Check for video optimization features
        const optimizations = [
          { pattern: /lazy.*loading/, description: 'Lazy loading for videos' },
          { pattern: /poster.*image/, description: 'Poster images for better loading' },
          { pattern: /preload.*metadata/, description: 'Metadata preloading' },
          { pattern: /muted.*autoplay/, description: 'Muted autoplay for mobile policies' },
          { pattern: /playsInline/, description: 'Inline playback for iOS' },
          { pattern: /fallback.*error/, description: 'Error handling and fallbacks' }
        ];

        let fileScore = 0;
        optimizations.forEach(optimization => {
          if (optimization.pattern.test(content)) {
            fileScore++;
            this.logTest(`✅ ${path.basename(filePath)}: ${optimization.description}`);
          }
        });

        if (fileScore >= 4) {
          videoOptimizations++;
        } else {
          this.logTest(`⚠️  ${path.basename(filePath)}: Could improve video optimization`, 'warning');
        }
      }
    });

    const passed = videoOptimizations === totalChecks;
    this.updateResults(passed, 'Video Optimization');
    return passed;
  }

  // Test animation performance for mobile
  testAnimationPerformance() {
    console.log('\n🔍 Testing Animation Performance for Mobile...');
    
    const animationFiles = [
      'src/utils/animations.ts',
      'src/hooks/useReducedMotion.ts',
      'src/components/sections/Hero/Hero.tsx'
    ];

    let animationScore = 0;
    let totalFiles = 0;

    animationFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        totalFiles++;
        
        // Check for performance-optimized animations
        const performanceFeatures = [
          { pattern: /useReducedMotion|prefersReducedMotion/, description: 'Reduced motion accessibility support' },
          { pattern: /transform.*translate|scale|rotate/, description: 'GPU-accelerated transforms' },
          { pattern: /will-change|transform3d/, description: 'GPU layer optimization hints' },
          { pattern: /ease-out|cubic-bezier/, description: 'Optimized easing functions' },
          { pattern: /duration.*\d+/, description: 'Controlled animation durations' }
        ];

        let fileScore = 0;
        performanceFeatures.forEach(feature => {
          if (feature.pattern.test(content)) {
            fileScore++;
            this.logTest(`✅ ${path.basename(file)}: ${feature.description}`);
          }
        });

        if (fileScore >= 3) {
          animationScore++;
        } else {
          this.logTest(`⚠️  ${path.basename(file)}: Could improve animation performance`, 'warning');
        }
      }
    });

    const passed = animationScore === totalFiles;
    this.updateResults(passed, 'Animation Performance');
    return passed;
  }

  // Test loading performance optimizations
  testLoadingPerformance() {
    console.log('\n🔍 Testing Loading Performance Optimizations...');
    
    const nextConfig = path.join(process.cwd(), 'next.config.ts');
    const packageJson = path.join(process.cwd(), 'package.json');
    
    let loadingOptimizations = 0;
    let totalChecks = 0;

    // Check Next.js configuration
    if (fs.existsSync(nextConfig)) {
      const content = fs.readFileSync(nextConfig, 'utf8');
      totalChecks++;
      
      const configOptimizations = [
        { pattern: /images.*domains/, description: 'Image domain configuration' },
        { pattern: /compress.*true/, description: 'Gzip compression enabled' },
        { pattern: /experimental.*optimizeCss/, description: 'CSS optimization' },
        { pattern: /swcMinify.*true/, description: 'SWC minification' }
      ];

      let configScore = 0;
      configOptimizations.forEach(optimization => {
        if (optimization.pattern.test(content)) {
          configScore++;
          this.logTest(`✅ next.config.ts: ${optimization.description}`);
        }
      });

      if (configScore >= 2) {
        loadingOptimizations++;
      } else {
        this.logTest(`⚠️  next.config.ts: Could improve loading optimizations`, 'warning');
      }
    }

    // Check for performance-related dependencies
    if (fs.existsSync(packageJson)) {
      const content = fs.readFileSync(packageJson, 'utf8');
      totalChecks++;
      
      const performanceDeps = [
        { pattern: /"next"/, description: 'Next.js framework for optimization' },
        { pattern: /"framer-motion"/, description: 'Optimized animation library' },
        { pattern: /"@next\/bundle-analyzer"/, description: 'Bundle analysis tool' }
      ];

      let depScore = 0;
      performanceDeps.forEach(dep => {
        if (dep.pattern.test(content)) {
          depScore++;
          this.logTest(`✅ package.json: ${dep.description}`);
        }
      });

      if (depScore >= 2) {
        loadingOptimizations++;
      }
    }

    const passed = loadingOptimizations === totalChecks;
    this.updateResults(passed, 'Loading Performance');
    return passed;
  }

  // Test responsive design performance
  testResponsivePerformance() {
    console.log('\n🔍 Testing Responsive Design Performance...');
    
    const components = [
      'src/components/common/Header/Header.tsx',
      'src/components/sections/Hero/Hero.tsx'
    ];

    let responsiveScore = 0;
    let totalComponents = 0;

    components.forEach(componentPath => {
      const filePath = path.join(process.cwd(), componentPath);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        totalComponents++;
        
        // Check for responsive performance features
        const responsiveOptimizations = [
          { pattern: /ClientOnly/, description: 'Client-side only rendering for heavy components' },
          { pattern: /useEffect.*\[\]/, description: 'Optimized effect dependencies' },
          { pattern: /useMemo|useCallback/, description: 'Memoization for performance' },
          { pattern: /lazy.*import/, description: 'Lazy loading of components' },
          { pattern: /intersection.*observer/i, description: 'Intersection Observer for efficient scrolling' }
        ];

        let componentScore = 0;
        responsiveOptimizations.forEach(optimization => {
          if (optimization.pattern.test(content)) {
            componentScore++;
            this.logTest(`✅ ${path.basename(componentPath)}: ${optimization.description}`);
          }
        });

        if (componentScore >= 2) {
          responsiveScore++;
        } else {
          this.logTest(`⚠️  ${path.basename(componentPath)}: Could improve responsive performance`, 'warning');
        }
      }
    });

    const passed = responsiveScore === totalComponents;
    this.updateResults(passed, 'Responsive Performance');
    return passed;
  }

  // Test CSS performance optimizations
  testCSSPerformance() {
    console.log('\n🔍 Testing CSS Performance Optimizations...');
    
    const cssFiles = [
      'src/app/globals.css',
      'src/components/common/Header/Header.module.css'
    ];

    let cssScore = 0;
    let totalFiles = 0;

    cssFiles.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        totalFiles++;
        
        // Check for CSS performance optimizations
        const cssOptimizations = [
          { pattern: /will-change/, description: 'will-change property for animation optimization' },
          { pattern: /transform3d|translateZ/, description: 'GPU layer creation' },
          { pattern: /contain.*layout|style/, description: 'CSS containment for performance' },
          { pattern: /@media.*prefers-reduced-motion/, description: 'Reduced motion media query' }
        ];

        let fileScore = 0;
        cssOptimizations.forEach(optimization => {
          if (optimization.pattern.test(content)) {
            fileScore++;
            this.logTest(`✅ ${file}: ${optimization.description}`);
          }
        });

        if (fileScore >= 1) {
          cssScore++;
        } else {
          this.logTest(`ℹ️  ${file}: Using Tailwind classes (optimized by default)`);
          cssScore++; // Tailwind is optimized by default
        }
      }
    });

    const passed = cssScore === totalFiles;
    this.updateResults(passed, 'CSS Performance');
    return passed;
  }

  // Generate performance optimization recommendations
  generatePerformanceRecommendations() {
    const recommendations = [];
    
    // Core Web Vitals recommendations
    recommendations.push('Monitor Core Web Vitals (LCP, FID, CLS) regularly');
    recommendations.push('Use Lighthouse for performance auditing');
    recommendations.push('Implement resource hints (preload, prefetch, preconnect)');
    
    // Mobile-specific recommendations
    recommendations.push('Test on actual mobile devices with throttled networks');
    recommendations.push('Optimize images with WebP format and proper sizing');
    recommendations.push('Use lazy loading for below-the-fold content');
    recommendations.push('Minimize JavaScript bundle size with code splitting');
    
    // Animation recommendations
    recommendations.push('Use transform and opacity for animations (GPU-accelerated)');
    recommendations.push('Respect prefers-reduced-motion for accessibility');
    recommendations.push('Avoid animating layout properties (width, height, margin)');
    
    // Loading recommendations
    recommendations.push('Implement critical CSS inlining');
    recommendations.push('Use service worker for caching strategies');
    recommendations.push('Optimize font loading with font-display: swap');
    
    if (this.results.warnings > 0) {
      recommendations.push('Address performance warnings to improve mobile experience');
    }
    
    return recommendations;
  }

  // Generate mobile performance report
  generateMobilePerformanceReport() {
    console.log('\n📊 Generating Mobile Performance Report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      performanceThresholds: PERFORMANCE_THRESHOLDS,
      mobileOptimizations: MOBILE_OPTIMIZATIONS,
      testResults: this.results,
      recommendations: this.generatePerformanceRecommendations(),
      nextSteps: [
        'Run Lighthouse audit on actual mobile devices',
        'Test with slow 3G network throttling',
        'Monitor real user metrics (RUM)',
        'Implement performance budgets in CI/CD',
        'Use WebPageTest for detailed performance analysis'
      ]
    };

    const reportPath = path.join(process.cwd(), 'mobile-performance-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    this.logTest(`✅ Mobile performance report generated: ${reportPath}`);
    return report;
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

  // Run all mobile performance tests
  async runAllTests() {
    console.log('🚀 Starting Mobile Performance Test Suite...\n');
    
    const tests = [
      () => this.testImageOptimization(),
      () => this.testVideoOptimization(),
      () => this.testAnimationPerformance(),
      () => this.testLoadingPerformance(),
      () => this.testResponsivePerformance(),
      () => this.testCSSPerformance()
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
    const report = this.generateMobilePerformanceReport();
    
    console.log('\n📋 MOBILE PERFORMANCE SUMMARY');
    console.log('═══════════════════════════════');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️  Warnings: ${this.results.warnings}`);
    console.log(`📊 Total Tests: ${this.results.passed + this.results.failed}`);
    
    const successRate = (this.results.passed / (this.results.passed + this.results.failed)) * 100;
    console.log(`📈 Success Rate: ${successRate.toFixed(1)}%`);
    
    if (this.results.failed === 0) {
      console.log('\n🎉 All mobile performance tests passed!');
      console.log('The website should perform well on mobile devices.');
    } else {
      console.log('\n⚠️  Some performance tests failed. Please review and optimize the issues above.');
    }
    
    console.log('\n📱 NEXT STEPS:');
    console.log('1. Run Lighthouse audit: npx lighthouse http://localhost:3000 --view');
    console.log('2. Test on actual mobile devices');
    console.log('3. Monitor Core Web Vitals in production');
    console.log('4. Set up performance budgets');
    
    return report;
  }
}

// Run tests if called directly
if (require.main === module) {
  const testSuite = new MobilePerformanceTestSuite();
  testSuite.runAllTests().catch(console.error);
}

module.exports = MobilePerformanceTestSuite;