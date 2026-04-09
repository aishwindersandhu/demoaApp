import {createContext, useContext,useState} from 'react';
import './styles/theme.css';

type Theme = 'light' | 'dark'
 
interface ThemeContextType {
  theme : Theme;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children} : {children: React.ReactNode}){
  const [theme,setTheme] = useState<Theme>('light');
  const toggleTheme = () => (
    setTheme(prev=> prev === 'light' ? 'dark':'light')
  )
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}} >
     <div  className={`app-root ${theme}`} style={{margin:'30px'}}>
       {children}
     </div>
    </ThemeContext.Provider>
  );
}

export function useTheme () : ThemeContextType{
  const context = useContext(ThemeContext);
  if(!context) throw new Error('Theme error');
  return context;
}