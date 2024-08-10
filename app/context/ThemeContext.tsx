import React, { createContext, useContext, useState } from 'react';
import { LightTheme, AppDarkTheme } from '../theme';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  styles: any; 
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState<Theme>('light');
  const styles = theme === 'light' ? LightTheme : AppDarkTheme;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, styles }}>
      {children}
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
