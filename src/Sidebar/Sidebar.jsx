import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "./Sidebar.css";

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

  ];

  return (
    <div className="sidebar">
      <h2>Finance Tracker</h2>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/deposit">Deposit</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/Profile">Profile</Link>

    </div>
  );
}

export default Sidebar;
