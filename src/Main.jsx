import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { AuthProvider } from "./Context/AuthContext";
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
       
          <BrowserRouter>
            <App />
          </BrowserRouter>
        
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);