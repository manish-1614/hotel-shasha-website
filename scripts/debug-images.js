#!/usr/bin/env node

/**
 * Debug Image Loading Issues
 * Simple script to test image accessibility
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Debugging Image Loading Issues...\n');

// Test specific room images
const roomImages = [
  '/images/rooms/deluxe-valley-1.jpg',
  '/images/rooms/premium-suite-1.jpg',
  '/images/rooms/cottage-1.jpg',
  '/images/rooms/family-garden-1.jpg',
  '/images/rooms/riverside-villa-1.jpg',
  '/images/rooms/mountain-retreat-1.jpg'
];

console.log('📁 Checking Room Images:');
roomImages.forEach(imagePath => {
  const fullPath = path.join(__dirname, '..', 'public', imagePath);
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${imagePath} - ${exists ? 'EXISTS' : 'MISSING'}`);
  
  if (exists) {
    const stats = fs.statSync(fullPath);
    console.log(`   Size: ${Math.round(stats.size / 1024)}KB`);
  }
});

console.log('\n📁 Checking Hero Images:');
const heroImages = [
  '/images/hero-1.jpg',
  '/images/hero-2.svg',
  '/images/hero-3.svg'
];

heroImages.forEach(imagePath => {
  const fullPath = path.join(__dirname, '..', 'public', imagePath);
  const exists = fs.existsSync(fullPath);
  console.log(`${exists ? '✅' : '❌'} ${imagePath} - ${exists ? 'EXISTS' : 'MISSING'}`);
});

console.log('\n📁 Checking Placeholder Image:');
const placeholderPath = path.join(__dirname, '..', 'public', 'images', 'placeholder.svg');
const placeholderExists = fs.existsSync(placeholderPath);
console.log(`${placeholderExists ? '✅' : '❌'} /images/placeholder.svg - ${placeholderExists ? 'EXISTS' : 'MISSING'}`);

console.log('\n📁 Available Images in public/images/rooms:');
const roomsDir = path.join(__dirname, '..', 'public', 'images', 'rooms');
if (fs.existsSync(roomsDir)) {
  const files = fs.readdirSync(roomsDir);
  files.forEach(file => {
    if (file.endsWith('.jpg') || file.endsWith('.png')) {
      console.log(`✅ ${file}`);
    }
  });
} else {
  console.log('❌ Rooms directory not found');
}