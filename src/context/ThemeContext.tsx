import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ThemeOptions } from "../types/styles";
import { ThemeProvider as StyledComponentsThemeContextProvider } from "styled-components";
import { DataContext } from "./DataContext";
import useData from "@/hooks/useData";
import { UserContext } from "./UserContext";

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
  black: "#000000",
};

const ThemeContext = createContext<null | {
  currentTheme: ThemeOptions;
  toggleTheme: () => void;
}>(null);
function ThemeContextProvider({ children }: { children: ReactNode }) {
  const { userPreferencesDataManager } = useContext(DataContext)!;
  const { user } = useContext(UserContext)!;
  const { startProcessing: getTheme } = useData(userPreferencesDataManager.getTheme, (s) => {
    if (s.data) {
      setCurrentTheme(s.data);
    }
  });
  const { startProcessing: changeTheme } = useData(userPreferencesDataManager.setTheme, (s) => {
    if (s.error) {
      // TODO show notification
    } else if (s.data) {
      setCurrentTheme(s.data);
    }
  });
  // use dark theme by default
  const [currentTheme, setCurrentTheme] = useState(ThemeOptions.Dark);
  useEffect(() => {
    getTheme(user?.id);
  }, [getTheme]);
  const toggleTheme = () => {
    changeTheme({
      theme: currentTheme === ThemeOptions.Dark ? ThemeOptions.Light : ThemeOptions.Dark,
      userId: user?.id,
    });
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
