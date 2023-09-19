import IUserPreferencesStorageStrategy from "./stratagies/IUserPreferencesStorageStrategy";

export class UserPreferencesDataManager {
  private strategy: IUserPreferencesStorageStrategy;

  constructor(strategy: IUserPreferencesStorageStrategy) {
    this.strategy = strategy;
  }

  setStrategy(newStrategy: IUserPreferencesStorageStrategy) {
    this.strategy = newStrategy;
  }

}

export default UserPreferencesDataManager;
