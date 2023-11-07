import { ThemeOptions } from "@/types/styles";
import IUserPreferencesStorageStrategy from "./IUserPreferencesStorageStrategy";
import supbase from "@/supbaseClient";

class UserPreferencesSupbaseStorageStrategy implements IUserPreferencesStorageStrategy {
  async setThemePreference({ userId, theme }: { userId?: string; theme: ThemeOptions }) {
    try {
      const { data } = await supbase
        .from("user_preferences")
        .upsert({ selected_theme: theme, user_id: userId }, { onConflict: "user_id" })
        .select(`selected_theme`)
        .throwOnError();
      return data![0].selected_theme;
    } catch (err) {
      console.log("Something went wrrong while updating the theme preference");
      throw err;
    }
  }

  async getTheme(userId?: string): Promise<ThemeOptions | null> {
    try {
      const { data } = await supbase
        .from("user_preferences")
        .select(`selected_theme`)
        .eq("user_id", userId)
        .throwOnError();
      return data && data.length > 1 ? data[0].selected_theme : null;
    } catch (err) {
      console.log("Something went wrrong while getting the theme preference");
      throw err;
    }
  }
}

export default UserPreferencesSupbaseStorageStrategy;
