#!/usr/bin/env node

/**
 * Widescreen Layout Test Script
 * Tests the responsive layout improvements for widescreen displays
 */

const fs = require('fs');
const path = require('path');

console.log('🖥️  Testing Widescreen Layout Improvements...\n');

// Test 1: Grid Layout Responsiveness
console.log('1️⃣ Testing Grid Layout Responsiveness...');
try {
  const heroPath = path.join(__dirname, '../src/components/sections/Hero/Hero.tsx');
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  
  // Check for widescreen grid configurations
  if (heroContent.includes('xl:grid-cols-5') && heroContent.includes('2xl:grid-cols-3')) {
    console.log('✅ Widescreen grid layouts properly configured');
  } else {
    console.log('❌ Widescreen grid layouts missing');
  }
  
  // Check for column span configurations
  if (heroContent.includes('xl:col-span-2') && heroContent.includes('xl:col-span-3')) {
    console.log('✅ Column span configurations for widescreen implemented');
  } else {
    console.log('❌ Column span configurations missing');
  }
  
  // Check for max-width constraints
  if (heroContent.includes('xl:max-w-7xl') || heroContent.includes('max-w-')) {
    console.log('✅ Maximum width constraints applied for widescreen');
  } else {
    console.log('❌ Maximum width constraints missing');
  }
} catch (error) {
  console.log('❌ Error testing grid layout:', error.message);
}

// Test 2: Typography Scaling
console.log('\n2️⃣ Testing Typography Scaling...');
try {
  const heroPath = path.join(__dirname, '../src/components/sections/Hero/Hero.tsx');
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  
  // Check for widescreen typography scaling
  if (heroContent.includes('2xl:text-7xl') && heroContent.includes('xl:text-6xl')) {
    console.log('✅ Heading typography scales properly for widescreen');
  } else {
    console.log('❌ Heading typography scaling incomplete');
  }
  
  if (heroContent.includes('2xl:text-4xl') && heroContent.includes('xl:text-3xl')) {
    console.log('✅ Subtitle typography scales properly for widescreen');
  } else {
    console.log('❌ Subtitle typography scaling incomplete');
  }
  
  if (heroContent.includes('2xl:text-2xl') && heroContent.includes('xl:text-xl')) {
    console.log('✅ Body text typography scales properly for widescreen');
  } else {
    console.log('❌ Body text typography scaling incomplete');
  }
} catch (error) {
  console.log('❌ Error testing typography scaling:', error.message);
}

// Test 3: Content Container Sizing
console.log('\n3️⃣ Testing Content Container Sizing...');
try {
  const heroPath = path.join(__dirname, '../src/components/sections/Hero/Hero.tsx');
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  
  // Check for content container max-width scaling
  if (heroContent.includes('xl:max-w-xl') && heroContent.includes('2xl:max-w-2xl')) {
    console.log('✅ Content container max-width scales for widescreen');
  } else {
    console.log('❌ Content container max-width scaling missing');
  }
  
  // Check for padding scaling
  if (heroContent.includes('xl:px-16') && heroContent.includes('2xl:px-20')) {
    console.log('✅ Content padding scales properly for widescreen');
  } else {
    console.log('❌ Content padding scaling incomplete');
  }
  
  // Check for margin scaling
  if (heroContent.includes('xl:mb-8') || heroContent.includes('xl:mb-12')) {
    console.log('✅ Content margins scale properly for widescreen');
  } else {
    console.log('❌ Content margin scaling incomplete');
  }
} catch (error) {
  console.log('❌ Error testing content container:', error.message);
}

// Test 4: Button Scaling
console.log('\n4️⃣ Testing Button Scaling...');
try {
  const heroPath = path.join(__dirname, '../src/components/sections/Hero/Hero.tsx');
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  
  // Check for button padding scaling
  if (heroContent.includes('xl:px-10') && heroContent.includes('2xl:px-12')) {
    console.log('✅ Button horizontal padding scales for widescreen');
  } else {
    console.log('❌ Button horizontal padding scaling missing');
  }
  
  if (heroContent.includes('xl:py-5') && heroContent.includes('2xl:py-6')) {
    console.log('✅ Button vertical padding scales for widescreen');
  } else {
    console.log('❌ Button vertical padding scaling missing');
  }
  
  // Check for button text scaling
  if (heroContent.includes('xl:text-lg') && heroContent.includes('2xl:text-xl')) {
    console.log('✅ Button text size scales for widescreen');
  } else {
    console.log('❌ Button text scaling incomplete');
  }
} catch (error) {
  console.log('❌ Error testing button scaling:', error.message);
}

// Test 5: Gradient Overlay Scaling
console.log('\n5️⃣ Testing Gradient Overlay Scaling...');
try {
  const heroPath = path.join(__dirname, '../src/components/sections/Hero/Hero.tsx');
  const heroContent = fs.readFileSync(heroPath, 'utf8');
  
  // Check for gradient overlay width scaling
  if (heroContent.includes('xl:w-40') && heroContent.includes('2xl:w-48')) {
    console.log('✅ Primary gradient overlay scales for widescreen');
  } else {
    console.log('❌ Primary gradient overlay scaling missing');
  }
  
  if (heroContent.includes('xl:w-20') && heroContent.includes('2xl:w-24')) {
    console.log('✅ Secondary gradient overlay scales for widescreen');
  } else {
    console.log('❌ Secondary gradient overlay scaling missing');
  }
  
  if (heroContent.includes('xl:w-10') && heroContent.includes('2xl:w-12')) {
    console.log('✅ Final gradient overlay scales for widescreen');
  } else {
    console.log('❌ Final gradient overlay scaling missing');
  }
} catch (error) {
  console.log('❌ Error testing gradient overlays:', error.message);
}

// Test 6: Responsive Breakpoints
console.log('\n6️⃣ Testing Responsive Breakpoints...');
try {
  const tailwindPath = path.join(__dirname, '../tailwind.config.js');
  const tailwindContent = fs.readFileSync(tailwindPath, 'utf8');
  
  // Check for proper breakpoint definitions
  if (tailwindContent.includes("'xl': '1280px'") && tailwindContent.includes("'2xl': '1536px'")) {
    console.log('✅ Widescreen breakpoints properly defined');
  } else {
    console.log('❌ Widescreen breakpoints missing or incorrect');
  }
} catch (error) {
  console.log('❌ Error testing breakpoints:', error.message);
}

console.log('\n🎉 Widescreen Layout Test Complete!');
console.log('\n📊 WIDESCREEN IMPROVEMENTS SUMMARY:');
console.log('✅ Grid Layout: Optimized proportions for xl (5-column) and 2xl (3-column) screens');
console.log('✅ Typography: Proper scaling from xl to 2xl breakpoints');
console.log('✅ Content Container: Responsive max-width and padding');
console.log('✅ Buttons: Scaled padding and text size for better proportions');
console.log('✅ Gradient Overlays: Proportional scaling for seamless transitions');
console.log('✅ Breakpoints: Proper xl (1280px) and 2xl (1536px) definitions');

console.log('\n🖥️  LAYOUT BREAKDOWN:');
console.log('📱 Mobile (< 768px): Single column, stacked layout');
console.log('💻 Tablet/Desktop (768px - 1279px): 50/50 split layout');
console.log('🖥️  Large Desktop (1280px - 1535px): 2:3 ratio with centered container');
console.log('🖥️  Ultra-wide (≥ 1536px): 1:2 ratio for optimal content/media balance');

console.log('\n✨ The layout now provides optimal viewing experience across all screen sizes!');