import {createContext, useContext, useEffect, useState} from 'react';
import './styles/theme.css';

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme : Theme;
  toggleTheme: () => void;
}

// Undefined default forces consumers through useTheme(), which throws
// if used outside a ThemeProvider instead of silently returning undefined.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Provides light/dark theme state to the component tree.
 * Applies the current theme as a class on a wrapping div (`app-root light|dark`)
 * so CSS variables defined in theme.css can cascade to all descendants.
 */
export function ThemeProvider({children} : {children: React.ReactNode}){
  const [theme,setTheme] = useState<Theme>('light');
  const toggleTheme = () => (
    setTheme(prev=> prev === 'light' ? 'dark':'light')
  )

  // <html>/<body> sit outside .app-root and are never touched by the theme
  // classes, so they stay at the browser's default (white) background —
  // visible during rubber-band overscroll or wherever app-root's content is
  // shorter than the viewport. Mirroring the theme class onto <html> lets
  // theme.css paint the real page canvas too.
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}} >
     <div className={`app-root ${theme}`}>
       {children}
     </div>
    </ThemeContext.Provider>
  );
}

/** Hook to read/toggle the current theme. Must be used within a ThemeProvider. */
export function useTheme () : ThemeContextType{
  const context = useContext(ThemeContext);
  if(!context) throw new Error('Theme error');
  return context;
}