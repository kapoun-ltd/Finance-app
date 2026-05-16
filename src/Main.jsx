import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BalanceProvider } from "./Context/BalanceContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <BalanceProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BalanceProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);