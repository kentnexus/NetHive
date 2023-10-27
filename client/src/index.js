import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { InventoryContextProvider } from "./context/InventoryContext";
export {default as Login} from "./pages/Login";
export {default as Home} from "./pages/Home";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <InventoryContextProvider>
      <App />
    </InventoryContextProvider>
  </BrowserRouter>
);
