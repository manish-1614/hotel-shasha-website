/**
 * Color Contrast Testing Script
 * Tests the accessibility compliance of the green color palette
 */

// Color palette from Tailwind config
const colors = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#15803d',
    700: '#166534',
    800: '#14532d',
    900: '#0f2419',
  },
  mountain: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  }
};

// Convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Calculate relative luminance
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio
function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

// Test color combinations
function testColorContrast() {
  console.log('🎨 Testing Color Contrast Ratios for Accessibility\n');
  
  const testCombinations = [
    // Primary button combinations
    { bg: colors.primary[600], text: '#ffffff', name: 'Primary Button (primary-600 + white)' },
    { bg: colors.primary[700], text: '#ffffff', name: 'Primary Button Hover (primary-700 + white)' },
    
    // Text on backgrounds
    { bg: '#ffffff', text: colors.mountain[700], name: 'Body Text (white + mountain-700)' },
    { bg: '#ffffff', text: colors.mountain[800], name: 'Heading Text (white + mountain-800)' },
    { bg: '#ffffff', text: colors.primary[600], name: 'Link Text (white + primary-600)' },
    
    // Navigation
    { bg: colors.primary[50], text: colors.mountain[700], name: 'Light Background (primary-50 + mountain-700)' },
    { bg: colors.mountain[900], text: colors.mountain[100], name: 'Footer (mountain-900 + mountain-100)' },
    
    // Interactive elements
    { bg: colors.primary[600], text: colors.primary[50], name: 'Button Alt (primary-600 + primary-50)' },
    { bg: colors.mountain[100], text: colors.mountain[700], name: 'Card Background (mountain-100 + mountain-700)' },
  ];
  
  let allPassed = true;
  
  testCombinations.forEach(combo => {
    const ratio = getContrastRatio(combo.bg, combo.text);
    const aaPass = ratio >= 4.5;
    const aaaPass = ratio >= 7;
    
    const status = aaaPass ? '✅ AAA' : aaPass ? '✅ AA' : '❌ FAIL';
    
    console.log(`${status} ${combo.name}`);
    console.log(`   Ratio: ${ratio.toFixed(2)}:1`);
    console.log(`   Background: ${combo.bg}, Text: ${combo.text}\n`);
    
    if (!aaPass) {
      allPassed = false;
    }
  });
  
  console.log('📊 Summary:');
  console.log(`Overall Status: ${allPassed ? '✅ All combinations pass WCAG AA' : '❌ Some combinations need improvement'}`);
  console.log('\nWCAG Standards:');
  console.log('- AA: 4.5:1 minimum contrast ratio');
  console.log('- AAA: 7:1 minimum contrast ratio');
  
  return allPassed;
}

// Run the test
if (require.main === module) {
  testColorContrast();
}

module.exports = { testColorContrast, getContrastRatio };