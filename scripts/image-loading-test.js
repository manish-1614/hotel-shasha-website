#!/usr/bin/env node

/**
 * Image Loading Test for Hotel Shasha Website
 * Tests if all images are properly accessible and loading
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

class ImageLoadingTester {
  constructor() {
    this.testResults = {
      passed: 0,
      failed: 0,
      warnings: 0,
      details: [],
      imageStats: {}
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      info: '✅',
      warning: '⚠️',
      error: '❌',
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

  // Extract image paths from React components
  extractImagePaths() {
    console.log('\n🔍 Extracting Image Paths from Components...');
    
    const imagePaths = new Set();
    const componentDirs = [
      'src/components/sections',
      'src/components/common',
      'src/components/ui'
    ];

    componentDirs.forEach(dir => {
      const dirPath = path.join(__dirname, '..', dir);
      if (fs.existsSync(dirPath)) {
        this.scanComponentsForImages(dirPath, imagePaths);
      }
    });

    // Also check main page
    const mainPagePath = path.join(__dirname, '..', 'src/app/page.tsx');
    if (fs.existsSync(mainPagePath)) {
      this.scanFileForImages(mainPagePath, imagePaths);
    }

    return Array.from(imagePaths);
  }

  scanComponentsForImages(dirPath, imagePaths) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    
    files.forEach(file => {
      if (file.isDirectory()) {
        this.scanComponentsForImages(path.join(dirPath, file.name), imagePaths);
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
        const filePath = path.join(dirPath, file.name);
        this.scanFileForImages(filePath, imagePaths);
      }
    });
  }

  scanFileForImages(filePath, imagePaths) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract image paths from various patterns
    const patterns = [
      /src=['"]([^'"]*\.(jpg|jpeg|png|gif|svg|webp))['"]/gi,
      /['"]\/images\/[^'"]*\.(jpg|jpeg|png|gif|svg|webp)['"]/gi,
      /['"]\/videos\/[^'"]*\.(mp4|webm|ogg)['"]/gi,
      /poster=['"]([^'"]*\.(jpg|jpeg|png|gif|svg|webp))['"]/gi
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const imagePath = match[1] || match[0].replace(/['"]/g, '');
        if (imagePath.startsWith('/')) {
          imagePaths.add(imagePath);
        }
      }
    });
  }

  // Check if image files exist in public directory
  checkImageFiles(imagePaths) {
    console.log('\n🔍 Checking Image File Existence...');
    
    const publicDir = path.join(__dirname, '..', 'public');
    const missingImages = [];
    const existingImages = [];

    imagePaths.forEach(imagePath => {
      const fullPath = path.join(publicDir, imagePath);
      
      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        const sizeKB = Math.round(stats.size / 1024);
        
        existingImages.push({
          path: imagePath,
          size: sizeKB,
          fullPath
        });
        
        this.log(`Image exists: ${imagePath} (${sizeKB}KB)`);
        
        // Check for large images
        if (sizeKB > 1000) {
          this.log(`Large image detected: ${imagePath} (${sizeKB}KB) - consider optimization`, 'warning');
        }
      } else {
        missingImages.push(imagePath);
        this.log(`Missing image: ${imagePath}`, 'error');
      }
    });

    return { existingImages, missingImages };
  }

  // Check image formats and optimization
  checkImageOptimization(existingImages) {
    console.log('\n🔍 Checking Image Optimization...');
    
    const formatStats = {
      jpg: 0,
      jpeg: 0,
      png: 0,
      svg: 0,
      webp: 0,
      gif: 0
    };

    let totalSize = 0;
    let largeImages = 0;

    existingImages.forEach(image => {
      const ext = path.extname(image.path).toLowerCase().substring(1);
      if (formatStats.hasOwnProperty(ext)) {
        formatStats[ext]++;
      }
      
      totalSize += image.size;
      
      if (image.size > 500) {
        largeImages++;
      }
    });

    this.testResults.imageStats = {
      totalImages: existingImages.length,
      totalSizeKB: totalSize,
      averageSizeKB: Math.round(totalSize / existingImages.length),
      largeImages,
      formatDistribution: formatStats
    };

    this.log(`Total images: ${existingImages.length}`);
    this.log(`Total size: ${totalSize}KB`);
    this.log(`Average size: ${Math.round(totalSize / existingImages.length)}KB`);
    this.log(`Large images (>500KB): ${largeImages}`);

    // Check for modern formats
    const modernFormats = formatStats.webp + formatStats.svg;
    const totalRasterImages = formatStats.jpg + formatStats.jpeg + formatStats.png + formatStats.gif;
    
    if (modernFormats === 0 && totalRasterImages > 0) {
      this.log('No modern image formats (WebP) detected - consider optimization', 'warning');
    } else {
      this.log(`Modern formats usage: ${modernFormats}/${existingImages.length} images`);
    }
  }

  // Test Next.js Image component usage
  checkNextImageUsage() {
    console.log('\n🔍 Checking Next.js Image Component Usage...');
    
    const componentFiles = this.findFiles(path.join(__dirname, '..', 'src'), ['.tsx']);
    let nextImageUsage = 0;
    let regularImgUsage = 0;

    componentFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check for Next.js Image import and usage
      if (content.includes('next/image') || content.includes('Image from')) {
        nextImageUsage++;
      }
      
      // Check for regular img tags
      if (content.includes('<img') && !content.includes('Image')) {
        regularImgUsage++;
        this.log(`Regular <img> tag found in ${path.basename(file)} - consider using Next.js Image`, 'warning');
      }
    });

    this.log(`Components using Next.js Image: ${nextImageUsage}`);
    this.log(`Components using regular <img>: ${regularImgUsage}`);

    if (regularImgUsage > 0) {
      this.log('Consider replacing <img> tags with Next.js Image component for better performance', 'warning');
    }
  }

  // Check for broken image handling
  checkErrorHandling() {
    console.log('\n🔍 Checking Image Error Handling...');
    
    const componentFiles = this.findFiles(path.join(__dirname, '..', 'src'), ['.tsx']);
    let errorHandlingFound = 0;

    componentFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check for error handling patterns
      const errorPatterns = [
        /onError\s*=/,
        /onLoadingComplete\s*=/,
        /placeholder\s*=/,
        /fallback/i,
        /alt\s*=/
      ];

      let hasErrorHandling = false;
      errorPatterns.forEach(pattern => {
        if (pattern.test(content)) {
          hasErrorHandling = true;
        }
      });

      if (hasErrorHandling) {
        errorHandlingFound++;
      }
    });

    this.log(`Components with image error handling: ${errorHandlingFound}`);
    
    if (errorHandlingFound === 0) {
      this.log('No image error handling found - consider adding fallbacks', 'warning');
    }
  }

  // Check for accessibility
  checkImageAccessibility() {
    console.log('\n🔍 Checking Image Accessibility...');
    
    const componentFiles = this.findFiles(path.join(__dirname, '..', 'src'), ['.tsx']);
    let altTextUsage = 0;
    let missingAltText = 0;

    componentFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      
      // Count Image components
      const imageMatches = content.match(/<Image[^>]*>/g) || [];
      const imgMatches = content.match(/<img[^>]*>/g) || [];
      const allImages = [...imageMatches, ...imgMatches];

      allImages.forEach(imageTag => {
        if (imageTag.includes('alt=')) {
          altTextUsage++;
        } else {
          missingAltText++;
          this.log(`Missing alt text in ${path.basename(file)}`, 'warning');
        }
      });
    });

    this.log(`Images with alt text: ${altTextUsage}`);
    this.log(`Images missing alt text: ${missingAltText}`);

    if (missingAltText > 0) {
      this.log('Some images are missing alt text - important for accessibility', 'warning');
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

  // Generate comprehensive report
  generateReport() {
    console.log('\n📊 Image Loading Test Results');
    console.log('==============================');
    console.log(`✅ Passed: ${this.testResults.passed}`);
    console.log(`⚠️ Warnings: ${this.testResults.warnings}`);
    console.log(`❌ Failed: ${this.testResults.failed}`);
    
    if (this.testResults.imageStats.totalImages) {
      console.log('\n📈 Image Statistics:');
      console.log(`Total Images: ${this.testResults.imageStats.totalImages}`);
      console.log(`Total Size: ${this.testResults.imageStats.totalSizeKB}KB`);
      console.log(`Average Size: ${this.testResults.imageStats.averageSizeKB}KB`);
      console.log(`Large Images: ${this.testResults.imageStats.largeImages}`);
      
      console.log('\n📊 Format Distribution:');
      Object.entries(this.testResults.imageStats.formatDistribution).forEach(([format, count]) => {
        if (count > 0) {
          console.log(`${format.toUpperCase()}: ${count} images`);
        }
      });
    }
    
    console.log('\n💡 Recommendations:');
    const recommendations = [
      'Use Next.js Image component for automatic optimization',
      'Convert large images to WebP format when possible',
      'Add proper alt text for all images',
      'Implement error handling for failed image loads',
      'Consider lazy loading for images below the fold',
      'Optimize images to be under 500KB when possible'
    ];
    
    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });
    
    // Write detailed report
    const reportPath = path.join(__dirname, '..', 'image-loading-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      ...this.testResults,
      recommendations,
      timestamp: new Date().toISOString()
    }, null, 2));
    
    console.log(`\nDetailed report saved to: ${reportPath}`);
    
    return this.testResults.failed === 0;
  }

  // Run all image loading tests
  async runImageTests() {
    console.log('🖼️ Hotel Shasha Website - Image Loading Test Suite');
    console.log('===================================================');
    
    try {
      // Extract image paths from components
      const imagePaths = this.extractImagePaths();
      this.log(`Found ${imagePaths.length} image references in components`);
      
      // Check if image files exist
      const { existingImages, missingImages } = this.checkImageFiles(imagePaths);
      
      if (missingImages.length > 0) {
        this.log(`${missingImages.length} images are missing from public directory`, 'error');
      }
      
      // Check image optimization
      if (existingImages.length > 0) {
        this.checkImageOptimization(existingImages);
      }
      
      // Check Next.js Image usage
      this.checkNextImageUsage();
      
      // Check error handling
      this.checkErrorHandling();
      
      // Check accessibility
      this.checkImageAccessibility();
      
      const success = this.generateReport();
      
      if (success) {
        console.log('\n🎉 Image loading tests completed successfully!');
      } else {
        console.log('\n❌ Some image loading issues found. Please review.');
      }
      
      return success;
      
    } catch (error) {
      console.error('❌ Image loading test suite failed:', error.message);
      return false;
    }
  }
}

// Run tests if script is executed directly
if (require.main === module) {
  const tester = new ImageLoadingTester();
  tester.runImageTests().catch(console.error);
}

module.exports = ImageLoadingTester;