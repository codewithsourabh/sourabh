export type ColorScheme = 'modern' | 'bold' | 'professional' | 'creative';

export interface SchemeConfig {
  name: string;
  description: string;
  colors: {
    light: { primary: string; secondary: string; accent: string };
    dark: { primary: string; secondary: string; accent: string };
  };
}

export const colorSchemes: Record<ColorScheme, SchemeConfig> = {
  modern: {
    name: 'Modern & Minimalist',
    description: 'Clean, minimal aesthetic with cool tones and high contrast',
    colors: {
      light: { primary: '#0ea5e9', secondary: '#64748b', accent: '#06b6d4' },
      dark: { primary: '#0ea5e9', secondary: '#94a3b8', accent: '#06b6d4' },
    },
  },
  bold: {
    name: 'Bold & Energetic',
    description: 'Vibrant, dynamic palette with warm and cool contrasts',
    colors: {
      light: { primary: '#f97316', secondary: '#ec4899', accent: '#8b5cf6' },
      dark: { primary: '#fb923c', secondary: '#f472b6', accent: '#a78bfa' },
    },
  },
  professional: {
    name: 'Professional & Corporate',
    description: 'Sophisticated palette with navy, gold, and charcoal tones',
    colors: {
      light: { primary: '#1e40af', secondary: '#b45309', accent: '#4b5563' },
      dark: { primary: '#3b82f6', secondary: '#fbbf24', accent: '#9ca3af' },
    },
  },
  creative: {
    name: 'Creative & Artistic',
    description: 'Vibrant, diverse palette with playful and creative energy',
    colors: {
      light: { primary: '#a855f7', secondary: '#06b6d4', accent: '#ec4899' },
      dark: { primary: '#d946ef', secondary: '#22d3ee', accent: '#f472b6' },
    },
  },
};

export function applyColorScheme(scheme: ColorScheme): void {
  const root = document.documentElement;
  
  // Set data attribute for the color scheme
  root.setAttribute('data-color-scheme', scheme);
  
  // Save to localStorage
  localStorage.setItem('colorScheme', scheme);
}

export function getColorScheme(): ColorScheme {
  const saved = localStorage.getItem('colorScheme') as ColorScheme | null;
  return saved || 'modern';
}

export function initializeColorScheme(): void {
  const scheme = getColorScheme();
  applyColorScheme(scheme);
}
