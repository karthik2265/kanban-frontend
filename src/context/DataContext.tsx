import BoardDataManager from "@/data/BoardDataManager";
import UserPreferencesDataManager from "@/data/UserPreferencesDataManager";
import BoardLocalStorageStrategy from "@/data/stratagies/BoardLocalStorageStrategy";
import UserPreferencesLocalStorageStrategy from "@/data/stratagies/UserPreferencesLocalStorageStrategy";
import { ReactNode, createContext } from "react";

const DataContext = createContext<null | {
  boardDataManager: BoardDataManager;
  userPreferencesDataManager: UserPreferencesDataManager;
}>(null);

function DataContextProvider({ children }: { children: ReactNode }) {
  // TODO check if user logged in and decide strategy
  const boardDataManager = new BoardDataManager(new BoardLocalStorageStrategy());
  const userPreferencesDataManager = new UserPreferencesDataManager(new UserPreferencesLocalStorageStrategy());
  return (
    <DataContext.Provider value={{ boardDataManager, userPreferencesDataManager }}>{children}</DataContext.Provider>
  );
}

export { DataContext, DataContextProvider };
