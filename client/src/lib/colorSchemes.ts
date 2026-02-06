/**
 * Color Scheme System
 * 4 distinct moods with light and dark mode variants
 * Each scheme defines CSS variables for consistent theming
 */

export type ColorScheme = 'modern' | 'bold' | 'professional' | 'creative';
export type ThemeMode = 'light' | 'dark';

export interface ColorSchemeConfig {
  name: string;
  description: string;
  light: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    card: string;
    cardForeground: string;
  };
  dark: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    card: string;
    cardForeground: string;
  };
}

export const colorSchemes: Record<ColorScheme, ColorSchemeConfig> = {
  modern: {
    name: 'Modern & Minimalist',
    description: 'Clean, minimal aesthetic with cool tones and high contrast',
    light: {
      background: '#ffffff',
      foreground: '#0a0e27',
      primary: '#0ea5e9',
      primaryForeground: '#ffffff',
      secondary: '#64748b',
      secondaryForeground: '#ffffff',
      accent: '#06b6d4',
      accentForeground: '#ffffff',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
      card: '#f8fafc',
      cardForeground: '#0a0e27',
    },
    dark: {
      background: '#0f172a',
      foreground: '#f1f5f9',
      primary: '#0ea5e9',
      primaryForeground: '#0f172a',
      secondary: '#94a3b8',
      secondaryForeground: '#0f172a',
      accent: '#06b6d4',
      accentForeground: '#0f172a',
      muted: '#1e293b',
      mutedForeground: '#94a3b8',
      border: '#334155',
      card: '#1e293b',
      cardForeground: '#f1f5f9',
    },
  },
  bold: {
    name: 'Bold & Energetic',
    description: 'Vibrant, dynamic palette with warm and cool contrasts',
    light: {
      background: '#fafaf9',
      foreground: '#1c1917',
      primary: '#dc2626',
      primaryForeground: '#ffffff',
      secondary: '#f59e0b',
      secondaryForeground: '#ffffff',
      accent: '#8b5cf6',
      accentForeground: '#ffffff',
      muted: '#f5f5f4',
      mutedForeground: '#78716c',
      border: '#e7e5e4',
      card: '#ffffff',
      cardForeground: '#1c1917',
    },
    dark: {
      background: '#1c1917',
      foreground: '#fafaf9',
      primary: '#ef4444',
      primaryForeground: '#1c1917',
      secondary: '#fbbf24',
      secondaryForeground: '#1c1917',
      accent: '#a78bfa',
      accentForeground: '#1c1917',
      muted: '#292524',
      mutedForeground: '#a8a29e',
      border: '#44403c',
      card: '#292524',
      cardForeground: '#fafaf9',
    },
  },
  professional: {
    name: 'Professional & Corporate',
    description: 'Sophisticated palette with navy, gold, and charcoal tones',
    light: {
      background: '#ffffff',
      foreground: '#1e3a5f',
      primary: '#1e3a5f',
      primaryForeground: '#ffffff',
      secondary: '#d4af37',
      secondaryForeground: '#1e3a5f',
      accent: '#2563eb',
      accentForeground: '#ffffff',
      muted: '#f3f4f6',
      mutedForeground: '#6b7280',
      border: '#e5e7eb',
      card: '#f9fafb',
      cardForeground: '#1e3a5f',
    },
    dark: {
      background: '#0f172a',
      foreground: '#f3f4f6',
      primary: '#3b82f6',
      primaryForeground: '#0f172a',
      secondary: '#fbbf24',
      secondaryForeground: '#0f172a',
      accent: '#60a5fa',
      accentForeground: '#0f172a',
      muted: '#1e293b',
      mutedForeground: '#9ca3af',
      border: '#334155',
      card: '#1e293b',
      cardForeground: '#f3f4f6',
    },
  },
  creative: {
    name: 'Creative & Artistic',
    description: 'Vibrant, diverse palette with playful and creative energy',
    light: {
      background: '#fef7f2',
      foreground: '#2d1b4e',
      primary: '#d946ef',
      primaryForeground: '#ffffff',
      secondary: '#06b6d4',
      secondaryForeground: '#ffffff',
      accent: '#ec4899',
      accentForeground: '#ffffff',
      muted: '#fce7f3',
      mutedForeground: '#9333ea',
      border: '#f0d9ff',
      card: '#ffffff',
      cardForeground: '#2d1b4e',
    },
    dark: {
      background: '#2d1b4e',
      foreground: '#fef7f2',
      primary: '#ec4899',
      primaryForeground: '#2d1b4e',
      secondary: '#06b6d4',
      secondaryForeground: '#2d1b4e',
      accent: '#d946ef',
      accentForeground: '#2d1b4e',
      muted: '#4c1d95',
      mutedForeground: '#f0d9ff',
      border: '#7c3aed',
      card: '#4c1d95',
      cardForeground: '#fef7f2',
    },
  },
};

/**
 * Apply color scheme to document
 */
export function applyColorScheme(scheme: ColorScheme, mode: ThemeMode) {
  const config = colorSchemes[scheme];
  const colors = mode === 'light' ? config.light : config.dark;

  const root = document.documentElement;
  Object.entries(colors).forEach(([key, value]) => {
    // Convert camelCase to kebab-case and set CSS variable
    const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  });
}

/**
 * Get stored color scheme preference
 */
export function getStoredColorScheme(): ColorScheme {
  if (typeof window === 'undefined') return 'modern';
  const stored = localStorage.getItem('colorScheme');
  return (stored as ColorScheme) || 'modern';
}

/**
 * Save color scheme preference
 */
export function saveColorScheme(scheme: ColorScheme) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('colorScheme', scheme);
}
