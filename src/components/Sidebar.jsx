import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "./Sidebar.css";
import ErrorBoundary from "./ErrorBoundary";

function Sidebar({ currentPage, setCurrentPage }) {
  const links = [
    "Dashboard",
    "Accounts",
    "Income",
    "Expenditure",
    "Investments",
    "Transactions",
    "Reports",
    "Profile",
    "Deposit",
    "Withdrawal",
    "payment",

  ];

  return (
    <div className="sidebar">
      <h2>Finance Tracker</h2>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/deposit">Deposit</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/payment">payment</Link>
      <Link to="/profile">profile</Link>

    </div>
  );
}

export default Sidebar;
