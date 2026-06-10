/**
 * Hope Gym & Spa — Mobile App Theme
 * Black + golden-yellow brand palette matching the website.
 */

export const colors = {
  brand: '#FFD400',
  brandLight: '#FFDF47',
  brandDark: '#E0A800',
  ink: '#0B0B0B',
  ink800: '#121212',
  ink700: '#1A1A1A',
  ink600: '#222222',
  ink500: '#2E2E2E',
  white: '#FFFFFF',
  whiteA80: 'rgba(255,255,255,0.8)',
  whiteA60: 'rgba(255,255,255,0.6)',
  whiteA40: 'rgba(255,255,255,0.4)',
  whiteA20: 'rgba(255,255,255,0.2)',
  whiteA10: 'rgba(255,255,255,0.1)',
  whiteA05: 'rgba(255,255,255,0.04)',
  green: '#22C55E',
  red: '#EF4444',
  orange: '#F97316',
  
  // Semantic Aliases
  primary: '#FFD400',
  background: '#0B0B0B',
  surface: '#121212',
  text: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.6)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  full: 9999,
} as const;

export const fonts = {
  regular: 'System',
  semibold: 'System',
  bold: 'System',
} as const;
