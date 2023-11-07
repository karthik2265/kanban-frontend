import { ThemeOptions } from "@/types/styles";
import IUserPreferencesStorageStrategy from "./stratagies/IUserPreferencesStorageStrategy";

class UserPreferencesDataManager {
  private strategy: IUserPreferencesStorageStrategy;

  constructor(strategy: IUserPreferencesStorageStrategy) {
    this.strategy = strategy;
    this.setTheme = this.setTheme.bind(this);
    this.getTheme = this.getTheme.bind(this);
  }

  setStrategy(newStrategy: IUserPreferencesStorageStrategy) {
    this.strategy = newStrategy;
  }

  setTheme(data: { theme: ThemeOptions; userId?: string }) {
    return this.strategy.setThemePreference(data);
  }

  getTheme(userId?: string) {
    return this.strategy.getTheme(userId);
  }
}

export default UserPreferencesDataManager;
