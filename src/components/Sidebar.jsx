import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../services/supabase";
import "./Sidebar.css";
import { toast } from "react-toastify";

function Sidebar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) { console.error(error); return; }
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <>
      {/* Hamburger button — only visible on mobile */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile dropdown overlay */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/accounts" onClick={() => setMenuOpen(false)}>Accounts</Link>
          <Link to="/transactions" onClick={() => setMenuOpen(false)}>Transactions</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
          <button className="logout-btn" onClick={() => { setMenuOpen(false); handleLogout(); }}>
            Logout
          </button>
        </div>
      )}

      {/* Desktop sidebar — hidden on mobile */}
      <div className="sidebar">
        <h2>Tracker</h2>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/accounts">Accounts</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/profile">Profile</Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}

export default Sidebar;