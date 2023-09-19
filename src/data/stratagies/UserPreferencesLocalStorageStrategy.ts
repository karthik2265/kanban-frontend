import IUserPreferencesStorageStrategy from "./IUserPreferencesStorageStrategy";

class UserPreferencesLocalStorageStrategy implements IUserPreferencesStorageStrategy {
  getSelectedBoard() {
    if (localStorage.getItem("selected_board")) return localStorage.getItem("selected_board");
    return null;
  }
}

export default UserPreferencesLocalStorageStrategy;
