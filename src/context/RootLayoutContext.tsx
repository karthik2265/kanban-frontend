import { ReactNode, createContext, useCallback, useState } from "react";

const RootLayoutContext = createContext<null | {
  isSecondaryMenuOpen: boolean;
  toggleSecondaryMenuVisibility: () => void;
}>(null);

function RootLayoutContextProvider({ children }: { children: ReactNode }) {
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(true);
  const toggleSecondaryMenuVisibility = useCallback(() => {
    setIsSecondaryMenuOpen((prev) => !prev);
  }, [setIsSecondaryMenuOpen]);
  return (
    <RootLayoutContext.Provider value={{ isSecondaryMenuOpen, toggleSecondaryMenuVisibility }}>
      {children}
    </RootLayoutContext.Provider>
  );
}

export { RootLayoutContext, RootLayoutContextProvider };
