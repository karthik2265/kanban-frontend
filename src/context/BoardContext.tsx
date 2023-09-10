import { ReactNode, createContext, useState } from "react";

const BoardContext = createContext<null | {
  selectedBoard: string | null;
  setSelectedBoard: React.Dispatch<React.SetStateAction<string | null>>;
}>(null);

function BoardContextProvider({ children }: { children: ReactNode }) {
  const [selectedBoard, setSelectedBoard] = useState<null | string>(null);
  return <BoardContext.Provider value={{ selectedBoard, setSelectedBoard }}>{children}</BoardContext.Provider>;
}

export { BoardContext, BoardContextProvider };
