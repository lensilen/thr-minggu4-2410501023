import { createContext, useCallback, useEffect, useState } from "react";
import { darkColors, lightColors } from "../constants/colors";
import { useStorage } from "../hooks/useStorage";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const { saveTheme, loadTheme } = useStorage();

  useEffect(() => {
    loadTheme().then((saved) => setIsDark(saved));
  }, []);

  const toggleTheme = useCallback(async () => {
    const next = !isDark;
    setIsDark(next);
    await saveTheme(next);
  }, [isDark, saveTheme]);

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}
