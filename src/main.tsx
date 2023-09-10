import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeContextProvider } from "@/context/ThemeContext";
import { RootLayoutContextProvider } from "@/context/RootLayoutContext.tsx";
import { BoardContextProvider } from "@/context/BoardContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <RootLayoutContextProvider>
        <BoardContextProvider>
          <App />
        </BoardContextProvider>
      </RootLayoutContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
