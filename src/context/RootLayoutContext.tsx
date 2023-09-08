import { ReactNode, createContext, useState } from "react";

const RootLayoutContext = createContext<null | {
  isBoardMenuOpen: boolean;
  setIsBoardMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>(null);

function RootLayoutContextProvider({ children }: { children: ReactNode }) {
  const [isBoardMenuOpen, setIsBoardMenuOpen] = useState(false);

  return (
    <RootLayoutContext.Provider value={{ isBoardMenuOpen, setIsBoardMenuOpen }}>{children}</RootLayoutContext.Provider>
  );
}

export { RootLayoutContext, RootLayoutContextProvider };
