import React, { createContext, useContext, useMemo } from 'react';
import { Theme, themes } from './themes';

interface ThemeContextType {
  theme: Theme;
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeThemeId, setActiveThemeId] = React.useState<string>(themes[0].id);

  const activeTheme = useMemo(() => {
    return themes.find(t => t.id === activeThemeId) || themes[0];
  }, [activeThemeId]);
  
  const themeStyles = useMemo(() => {
    const styles = activeTheme.styles;
    const cssVars: React.CSSProperties = {};
    
    Object.entries(styles.colors).forEach(([key, value]) => {
      cssVars[`--color-${key}` as any] = value;
    });

    Object.entries(styles.fonts).forEach(([key, value]) => {
      cssVars[`--font-${key}` as any] = value;
    });

    cssVars['--spacing-base' as any] = styles.spacing.base;

    return cssVars;
  }, [activeTheme]);

  const value = {
    theme: activeTheme,
    setTheme: setActiveThemeId,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div style={themeStyles}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
