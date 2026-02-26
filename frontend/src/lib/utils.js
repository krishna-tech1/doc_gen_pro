/**
 * Design System Utilities
 */

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Design System Constants
 */
export const colors = {
  primary: '#4f46e5',      // Indigo-600
  primaryLight: '#eef2ff', // Indigo-50
  success: '#10b981',      // Emerald-600
  successLight: '#d1fae5', // Emerald-50
  warning: '#f59e0b',      // Amber-600
  error: '#ef4444',        // Red-600
  errorLight: '#fee2e2',   // Red-50
  background: '#f9fafb',   // Gray-50
  cardBg: '#ffffff',       // White
  border: '#e5e7eb',       // Gray-200
  text: {
    primary: '#111827',    // Gray-900
    secondary: '#6b7280',  // Gray-500
    tertiary: '#9ca3af',   // Gray-400
  },
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
};

export const transitions = {
  fast: 'all 0.15s ease-in-out',
  normal: 'all 0.3s ease-in-out',
  slow: 'all 0.5s ease-in-out',
};
