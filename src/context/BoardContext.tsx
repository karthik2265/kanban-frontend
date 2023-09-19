import BoardDataManager from "@/data/BoardDataManager";
import BoardLocalStorageStrategy from "@/data/stratagies/BoardLocalStorageStrategy";
import { ReactNode, createContext, useState } from "react";

const BoardContext = createContext<null | {
  selectedBoard: string | null;
  setSelectedBoard: React.Dispatch<React.SetStateAction<string | null>>;
  boardDataManager: BoardDataManager;
}>(null);

function BoardContextProvider({ children }: { children: ReactNode }) {
  const [selectedBoard, setSelectedBoard] = useState<null | string>(null);
  // TODO check if user logged in and decide strategy
  const boardDataManager = new BoardDataManager(new BoardLocalStorageStrategy());
  return (
    <BoardContext.Provider value={{ selectedBoard, setSelectedBoard, boardDataManager }}>
      {children}
    </BoardContext.Provider>
  );
}

export { BoardContext, BoardContextProvider };
