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
    "payment",
    "Logout"

  ];

  return (
    <div className="sidebar">
      <h2>Tracker</h2>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/payment">payment</Link>
      <Link to="/profile">profile</Link>
      <Link to="/logout">logout</Link>

    </div>
  );
}

export default Sidebar;
