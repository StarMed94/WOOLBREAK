// src/components/editor/themes.ts

export interface Theme {
  id: string;
  name: string;
  preview: {
    background: string;
    primary: string;
    text: string;
  };
  styles: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      surface: string;
      text: string;
      'text-secondary': string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    spacing: {
      base: string;
    };
  };
}

export const themes: Theme[] = [
  {
    id: 'default-light',
    name: 'Clair (Défaut)',
    preview: {
      background: '#FFFFFF',
      primary: '#3B82F6',
      text: '#111827',
    },
    styles: {
      colors: {
        primary: '#3B82F6',
        secondary: '#6366F1',
        accent: '#EC4899',
        background: '#F9FAFB',
        surface: '#FFFFFF',
        text: '#111827',
        'text-secondary': '#6B7280',
      },
      fonts: {
        heading: '"Inter", sans-serif',
        body: '"Inter", sans-serif',
      },
      spacing: {
        base: '1rem',
      },
    },
  },
  {
    id: 'modern-dark',
    name: 'Sombre Moderne',
    preview: {
      background: '#111827',
      primary: '#38BDF8',
      text: '#F9FAFB',
    },
    styles: {
      colors: {
        primary: '#38BDF8', // sky-400
        secondary: '#818CF8', // indigo-400
        accent: '#F471B5', // pink-400
        background: '#111827', // gray-900
        surface: '#1F2937', // gray-800
        text: '#F9FAFB', // gray-50
        'text-secondary': '#9CA3AF', // gray-400
      },
      fonts: {
        heading: '"Poppins", sans-serif',
        body: '"Roboto", sans-serif',
      },
      spacing: {
        base: '1rem',
      },
    },
  },
  {
    id: 'corporate-blue',
    name: 'Corporate Bleu',
    preview: {
      background: '#F0F5FF',
      primary: '#2563EB',
      text: '#1E3A8A',
    },
    styles: {
      colors: {
        primary: '#2563EB', // blue-600
        secondary: '#0284C7', // cyan-600
        accent: '#F59E0B', // amber-500
        background: '#F0F5FF', // blue-50
        surface: '#FFFFFF',
        text: '#1E3A8A', // blue-900
        'text-secondary': '#475569', // slate-600
      },
      fonts: {
        heading: '"Lato", sans-serif',
        body: '"Open Sans", sans-serif',
      },
      spacing: {
        base: '1rem',
      },
    },
  },
  {
    id: 'vibrant-startup',
    name: 'Startup Vibrante',
    preview: {
      background: '#FFFFFF',
      primary: '#EC4899',
      text: '#1F2937',
    },
    styles: {
      colors: {
        primary: '#EC4899', // pink-500
        secondary: '#8B5CF6', // violet-500
        accent: '#10B981', // emerald-500
        background: '#FFFFFF',
        surface: '#F9FAFB',
        text: '#1F2937', // gray-800
        'text-secondary': '#4B5563', // gray-600
      },
      fonts: {
        heading: '"Montserrat", sans-serif',
        body: '"Source Sans Pro", sans-serif',
      },
      spacing: {
        base: '1rem',
      },
    },
  },
];
