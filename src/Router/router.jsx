import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your page components
import Dashboard from "../Dashboard/Dashboard";
import Accounts from "../Accounts/Accounts";
import Income from "../Income/Income";
import Profile from "../Profile/Profile";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";
import Transactions from "../Transactions/transactions";
import Reports from "../Reports/Reports.jsx";
import deposit from "../Deposit/deposit.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/income" element={<Income />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/deposit" element = {<deposit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
