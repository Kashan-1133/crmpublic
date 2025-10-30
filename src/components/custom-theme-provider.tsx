"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type CustomThemeContextType = {
  palette: string;
  setPalette: (palette: string) => void;
};

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState('theme-2');

  useEffect(() => {
    const storedPalette = localStorage.getItem('palette');
    if (storedPalette) {
      setPaletteState(storedPalette);
      document.documentElement.setAttribute('data-theme', storedPalette);
    } else {
        document.documentElement.setAttribute('data-theme', 'theme-2');
    }
  }, []);

  const setPalette = (newPalette: string) => {
    setPaletteState(newPalette);
    localStorage.setItem('palette', newPalette);
    document.documentElement.setAttribute('data-theme', newPalette);
  };

  return (
    <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        <CustomThemeContext.Provider value={{ palette, setPalette }}>
            {children}
        </CustomThemeContext.Provider>
    </NextThemesProvider>
  );
}

export function useCustomTheme() {
  const context = useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
}
