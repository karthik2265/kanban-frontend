import { ThemeOptions } from "@/types/styles";
import IUserPreferencesStorageStrategy from "./IUserPreferencesStorageStrategy";

class UserPreferencesLocalStorageStrategy implements IUserPreferencesStorageStrategy {
  async setThemePreference({ theme }: { theme: ThemeOptions }) {
    localStorage.setItem("theme", theme);
    return theme;
  }

  async getTheme(): Promise<ThemeOptions | null> {
    const theme = localStorage.getItem("theme");
    if (theme) return theme as ThemeOptions;
    return null;
  }
}

export default UserPreferencesLocalStorageStrategy;
