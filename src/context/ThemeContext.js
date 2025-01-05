import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize theme from cookies
    return Cookies.get("theme") === "dark";
  });

  useEffect(() => {
    // Apply the theme to the <html> element
    if (darkMode) {
      document.documentElement.classList.add("dark");
      Cookies.set("theme", "dark", { expires: 7 });
    } else {
      document.documentElement.classList.remove("dark");
      Cookies.set("theme", "light", { expires: 7 });
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);
  const value = useMemo(() => ({ darkMode, toggleTheme }), [darkMode, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};