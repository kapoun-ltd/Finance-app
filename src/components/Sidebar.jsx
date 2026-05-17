import React from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../services/supabase";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    navigate("/");
    alert("user logged out");
  };

  return (
    <div className="sidebar">
      <h2>Tracker</h2>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/payment">Payment</Link>
      <Link to="/profile">Profile</Link>

      {/* REAL logout */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;