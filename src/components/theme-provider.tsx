"use client"

import * as React from "react"
import { appThemes, type ThemeDefinition, type ThemeMode, type ThemeCategory, defaultTheme } from '@/lib/themes'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultMode?: ThemeMode
  defaultThemeName?: string
  defaultCategory?: ThemeCategory
  storageKey?: string
}

type ThemeProviderState = {
  mode: ThemeMode
  colorTheme: string
  category: ThemeCategory
  currentThemeDef: ThemeDefinition | null | undefined
  setColorTheme: (category: ThemeCategory, name:string) => void
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

const initialState: ThemeProviderState = {
  mode: defaultTheme.mode,
  colorTheme: defaultTheme.name,
  category: defaultTheme.category,
  currentThemeDef: null,
  setColorTheme: () => null,
  setMode: () => null,
  toggleMode: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultMode = defaultTheme.mode,
  defaultThemeName = "CoachSync Green",
  defaultCategory = "bespokeThemes",
  storageKey = 'app-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [mode, setMode] = React.useState<ThemeMode>(defaultMode)
  const [colorTheme, setColorThemeState] = React.useState<string>(defaultThemeName)
  const [category, setCategory] = React.useState<ThemeCategory>(defaultCategory)
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    let storedTheme: { mode: ThemeMode; colorTheme: string; category: ThemeCategory } | null = null;
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        storedTheme = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }

    if (storedTheme) {
      setMode(storedTheme.mode);
      setColorThemeState(storedTheme.colorTheme);
      setCategory(storedTheme.category);
    }
    setInitializing(false);
  }, [storageKey]);

  const setColorTheme = React.useCallback((newCategory: ThemeCategory, newThemeName: string) => {
    setCategory(newCategory);
    setColorThemeState(newThemeName);
    try {
      localStorage.setItem(storageKey, JSON.stringify({ mode, colorTheme: newThemeName, category: newCategory }))
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
  }, [mode, storageKey]);


  React.useEffect(() => {
    if (initializing) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(mode);

    const themeToClassName = (themeName: string) => themeName.toLowerCase().replace(/[\s_&]+/g, '-');

    // Remove all color theme classes
    const allThemeClassNames = Object.values(appThemes).flat().map(t => themeToClassName(t.name));
    root.classList.remove(...allThemeClassNames);
    
    // Add current color theme class
    root.classList.add(themeToClassName(colorTheme));

    try {
      localStorage.setItem(storageKey, JSON.stringify({ mode, colorTheme, category }))
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
  }, [mode, colorTheme, category, initializing, storageKey]);

  const currentThemeDef = React.useMemo(() => {
    const themesForCategory = appThemes[category];
    if (themesForCategory) {
      return themesForCategory.find(t => t.name === colorTheme) || null;
    }
    return Object.values(appThemes).flat().find(t => t.name === colorTheme) || null;
  }, [colorTheme, category]);


  const toggleMode = React.useCallback(() => {
    setMode(prevMode => {
        const newMode = prevMode === 'light' ? 'dark' : 'light';
        try {
            localStorage.setItem(storageKey, JSON.stringify({ mode: newMode, colorTheme, category }));
        } catch (error) {
            console.warn('Failed to save theme to localStorage:', error);
        }
        return newMode;
    });
  }, [colorTheme, category, storageKey])

  const value = {
    mode,
    setMode: setMode as (mode: ThemeMode) => void,
    colorTheme,
    setColorTheme,
    toggleMode,
    currentThemeDef,
    category,
  }

  if (initializing) {
    return null;
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
