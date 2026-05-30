import React from "react";
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./components/Dashboard";
import Profile from "./pages/Profile";
import Transactions from "./pages/transactions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import Logout from "./components/logout";
import Frontpage from "./pages/frontpage";
import AccountsPage from "./pages/Accounts";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/resetPassword";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element ={<Frontpage />} />
        <Route path="/Accounts" element ={<AccountsPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


        
      </Routes>
    </>
  );
}