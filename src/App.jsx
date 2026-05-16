import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./pages/Profile";
import Transactions from "./pages/transactions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import logout from "./components/logout";


export default function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/logout" element={<logout />} />

    </Routes>
  );
}