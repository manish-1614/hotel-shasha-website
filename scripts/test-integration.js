#!/usr/bin/env node

/**
 * Integration Test Script for Modern Landing Page Redesign
 * Tests the integration of new components with existing layout system
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Starting Integration Tests for Modern Landing Page Redesign...\n');

// Test 1: Verify Layout Component Integration
console.log('1️⃣ Testing Layout Component Integration...');
try {
  // Check if Layout component properly exports and imports
  const layoutPath = path.join(__dirname, '../src/components/common/Layout/Layout.tsx');
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  if (layoutContent.includes('Header') && layoutContent.includes('Footer')) {
    console.log('✅ Layout component properly imports Header and Footer');
  } else {
    console.log('❌ Layout component missing Header or Footer imports');
  }
  
  // Check if Layout has proper padding for fixed header
  if (layoutContent.includes('pt-16') || layoutContent.includes('pt-20')) {
    console.log('✅ Layout has proper top padding for fixed header');
  } else {
    console.log('❌ Layout missing top padding for fixed header');
  }
} catch (error) {
  console.log('❌ Error testing Layout component:', error.message);
}

// Test 2: Verify Header Scroll Integration
console.log('\n2️⃣ Testing Header Scroll Integration...');
try {
  const headerPath = path.join(__dirname, '../src/components/common/Header/Header.tsx');
  const headerContent = fs.readFileSync(headerPath, 'utf8');
  
  if (headerContent.includes('useScrollNavigation') && headerContent.includes('useHeaderScrollAnimations')) {
    console.log('✅ Header uses both scroll navigation and scroll animations hooks');
  } else {
    console.log('❌ Header missing scroll integration hooks');
  }
  
  if (headerContent.includes('scrollToSection')) {
    console.log('✅ Header implements scroll navigation functionality');
  } else {
    console.log('❌ Header missing scroll navigation functionality');
  }
} catch (error) {
  console.log('❌ Error testing Header integration:', error.message);
}

// Test 3: Verify Hero Section Integration
console.log('\n3️⃣ Testing Hero Section Integration...');
try {
  const heroPath = path.join(__dirname, '../src/components/sections/Hero/Hero.tsx');
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  
  if (heroContent.includes('id="home"')) {
    console.log('✅ Hero section has proper ID for scroll navigation');
  } else {
    console.log('❌ Hero section missing ID for scroll navigation');
  }
  
  if (heroContent.includes('handleBookNow') && heroContent.includes('handleExploreRooms')) {
    console.log('✅ Hero section implements navigation to other sections');
  } else {
    console.log('❌ Hero section missing navigation functionality');
  }
} catch (error) {
  console.log('❌ Error testing Hero integration:', error.message);
}

// Test 4: Verify Page Structure Integration
console.log('\n4️⃣ Testing Page Structure Integration...');
try {
  const pagePath = path.join(__dirname, '../src/app/page.tsx');
  const pageContent = fs.readFileSync(pagePath, 'utf8');
  
  if (pageContent.includes('useScrollNavigation')) {
    console.log('✅ Main page uses scroll navigation hook');
  } else {
    console.log('❌ Main page missing scroll navigation hook');
  }
  
  // Check if all sections have proper IDs
  const sections = ['Hero', 'Rooms', 'Dining', 'Amenities', 'Location', 'Contact'];
  const hasAllSections = sections.every(section => pageContent.includes(section));
  
  if (hasAllSections) {
    console.log('✅ All page sections are properly included');
  } else {
    console.log('❌ Some page sections are missing');
  }
} catch (error) {
  console.log('❌ Error testing page structure:', error.message);
}

// Test 5: Verify CSS Integration
console.log('\n5️⃣ Testing CSS Integration...');
try {
  const tailwindPath = path.join(__dirname, '../tailwind.config.js');
  const tailwindContent = fs.readFileSync(tailwindPath, 'utf8');
  
  if (tailwindContent.includes('primary') && tailwindContent.includes('green')) {
    console.log('✅ Tailwind config includes green primary color theme');
  } else {
    console.log('❌ Tailwind config missing green color theme');
  }
  
  const globalCssPath = path.join(__dirname, '../src/app/globals.css');
  if (fs.existsSync(globalCssPath)) {
    console.log('✅ Global CSS file exists');
  } else {
    console.log('❌ Global CSS file missing');
  }
} catch (error) {
  console.log('❌ Error testing CSS integration:', error.message);
}

// Test 6: Build Test
console.log('\n6️⃣ Testing Build Integration...');
try {
  console.log('Building project to test integration...');
  execSync('npm run build', { 
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe'
  });
  console.log('✅ Build successful - all components integrate properly');
} catch (error) {
  console.log('❌ Build failed - integration issues detected');
  console.log('Build error:', error.message);
}

// Test 7: TypeScript Integration
console.log('\n7️⃣ Testing TypeScript Integration...');
try {
  execSync('npx tsc --noEmit', { 
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe'
  });
  console.log('✅ TypeScript compilation successful');
} catch (error) {
  console.log('❌ TypeScript compilation failed');
  console.log('TypeScript error:', error.message);
}

console.log('\n🎉 Integration tests completed!');
console.log('\n📋 Summary:');
console.log('- Layout component integration');
console.log('- Header scroll animations integration');
console.log('- Hero section navigation integration');
console.log('- Page structure and routing integration');
console.log('- CSS and styling integration');
console.log('- Build system integration');
console.log('- TypeScript integration');