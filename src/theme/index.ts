/**
 * Theme utilities for the wallet application
 *
 * This file contains constants and utilities for maintaining a consistent
 * design across the application.
 */

/**
 * Color palette for the application
 */
export const Colors = {
  // Primary colors
  primary: '#3498db',
  primaryDark: '#2980b9',
  primaryLight: '#5dade2',

  // Secondary colors
  secondary: '#2ecc71',
  secondaryDark: '#27ae60',
  secondaryLight: '#58d68d',

  // Accent colors
  accent: '#e74c3c',
  accentDark: '#c0392b',
  accentLight: '#ec7063',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F5F7FA',
  gray200: '#E2E8F0',
  gray300: '#CBD5E0',
  gray400: '#A0AEC0',
  gray500: '#718096',
  gray600: '#4A5568',
  gray700: '#2D3748',
  gray800: '#1A202C',
  gray900: '#171923',

  // Card brand colors
  visa: '#1A1F71',
  mastercard: '#EB001B',
  amex: '#006FCF',
  discover: '#FF6600',

  // Gradients
  gradientPrimary: ['#3498db', '#2980b9'],
  gradientSecondary: ['#2ecc71', '#27ae60'],
  gradientAccent: ['#e74c3c', '#c0392b'],
  gradientLight: ['#F5F7FA', '#E2E8F0'],
  gradientDark: ['#2D3748', '#1A202C'],

  // Card gradients
  gradientVisa: ['#1A1F71', '#0D1137'],
  gradientMastercard: ['#EB001B', '#F79E1B'],
  gradientAmex: ['#006FCF', '#00AEEF'],
  gradientDiscover: ['#FF6600', '#FFAA00'],
  gradientDefault: ['#718096', '#4A5568'],

  // Status colors
  success: '#2ecc71',
  warning: '#f39c12',
  error: '#e74c3c',
  info: '#3498db',
};

/**
 * Typography for the application
 */
export const Typography = {
  // Font families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    // In a real app, we would use custom fonts:
    // regular: 'SFPro-Regular',
    // medium: 'SFPro-Medium',
    // bold: 'SFPro-Bold',
  },

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  // Line heights
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
  // Font weights
  fontWeight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

/**
 * Spacing for the application
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

/**
 * Border radius for the application
 */
export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  round: 9999,
};

/**
 * Shadows for the application
 */
export const Shadows = {
  small: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

/**
 * Card dimensions
 */
export const CardDimensions = {
  width: 320,
  height: 200,
  borderRadius: BorderRadius.md,
};

/**
 * Animation durations
 */
export const AnimationDurations = {
  short: 150,
  medium: 300,
  long: 500,
};

/**
 * Z-index values
 */
export const ZIndex = {
  base: 1,
  card: 10,
  modal: 100,
  toast: 1000,
};

/**
 * Theme object that combines all theme elements
 */
export const Theme = {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  CardDimensions,
  AnimationDurations,
  ZIndex,
};

export default Theme;
