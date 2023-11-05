import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import "./index.css";
// context
import { ThemeContextProvider } from "@/context/ThemeContext";
import { RootLayoutContextProvider } from "@/context/RootLayoutContext.tsx";
import { DataContextProvider } from "@/context/DataContext.tsx";
import { BoardContextProvider } from "@/context/BoardContext.tsx";
import { UserContextProvider } from "@/context/UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootLayoutContextProvider>
      <DataContextProvider>
        <UserContextProvider>
          <ThemeContextProvider>
            <BoardContextProvider>
              <App />
            </BoardContextProvider>
          </ThemeContextProvider>
        </UserContextProvider>
      </DataContextProvider>
    </RootLayoutContextProvider>
  </React.StrictMode>
);
