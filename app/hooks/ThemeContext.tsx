import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Themes } from '@/assets/colors';

interface ThemeContextType {
  theme: typeof Themes.light;
  setTheme: (theme: typeof Themes.light) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: Themes.light,
  setTheme: () => {},
});

// ✅ Hook to use the theme
export const useTheme = () => useContext(ThemeContext);

// ✅ Fix here: define the props properly
interface ThemeProviderProps {
  children: ReactNode;
}

// ✅ Now it's typed correctly
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

  const [theme, setTheme] = useState<typeof Themes.light>(Themes.light);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;






  

                                       









