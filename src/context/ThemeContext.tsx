import { ReactNode, createContext, useState } from "react";
import { ThemeOptions } from "../types/styles";
import { ThemeProvider as StyledComponentsThemeContextProvider } from "styled-components";

const lightTheme = {
  primaryBg: "#FFFFFF",
  secondaryBg: "#F4F7FD",
  primaryText: "#000112",
  lines: "#E4EBFA",
};

const darkTheme = {
  primaryBg: "#2B2C37",
  secondaryBg: "#20212C",
  primaryText: "#FFFFFF",
  lines: "#3E3F4E",
};

// common for both light theme and dark theme
const theme = {
  mainPurple: "#635FC7",
  mainPurpleHover: "#A8A4FF",
  red: "#EA5555",
  redHover: "#FF9898",
  secondaryText: "#828FA3",
  white: "#FFFFFF",
  black: "#000",
};

const ThemeContext = createContext<null | {
  currentTheme: ThemeOptions;
  toggleTheme: () => void;
}>(null);
function ThemeContextProvider({ children }: { children: ReactNode }) {
  // use dark theme by default
  const [currentTheme, setCurrentTheme] = useState(ThemeOptions.Dark);
  const toggleTheme = () => {
    if (currentTheme === ThemeOptions.Dark) setCurrentTheme(ThemeOptions.Light);
    else setCurrentTheme(ThemeOptions.Dark);
  };
  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <StyledComponentsThemeContextProvider
        theme={
          currentTheme === ThemeOptions.Dark
            ? { ...theme, ...darkTheme, isLightTheme: false }
            : { ...theme, ...lightTheme, isLightTheme: true }
        }
      >
        {children}
      </StyledComponentsThemeContextProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };
