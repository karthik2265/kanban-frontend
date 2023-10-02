import BoardDataManager from "@/data/BoardDataManager";
import BoardLocalStorageStrategy from "@/data/stratagies/BoardLocalStorageStrategy";
import { ReactNode, createContext } from "react";

const DataContext = createContext<null | {
  boardDataManager: BoardDataManager;
}>(null);

function DataContextProvider({ children }: { children: ReactNode }) {
  // TODO check if user logged in and decide strategy
  const boardDataManager = new BoardDataManager(new BoardLocalStorageStrategy());
  return <DataContext.Provider value={{ boardDataManager }}>{children}</DataContext.Provider>;
}

export { DataContext, DataContextProvider };
