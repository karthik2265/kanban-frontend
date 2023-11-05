import { ThemeOptions } from "@/types/styles";

interface IUserPreferencesStorageStrategy {
  setThemePreference({ theme, userId }: { theme: ThemeOptions; userId?: string }): Promise<ThemeOptions>;

  getTheme(userId?: string): Promise<ThemeOptions | null>;
}

export default IUserPreferencesStorageStrategy;
