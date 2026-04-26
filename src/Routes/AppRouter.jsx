import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { AuthProvider } from "../Context/AuthContext.jsx";
import ErrorBoundary from "../components/ErrorBoundary";

// Pages
import Dashboard from "../components/Dashboard.jsx";
import Profile from "../pages/Profile";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Transactions from "../pages/transactions";
import Reports from "../pages/Reports.jsx";
import Payment from "../pages/Payment.jsx";


function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* 🌍 Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 Protected Routes */}
          <Route element={<ProtectedRoute />}>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdrawal" element={<Withdrawal />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRouter;