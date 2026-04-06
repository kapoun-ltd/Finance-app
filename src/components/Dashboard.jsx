import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faUser,
  faChartLine,
  faBuildingColumns
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import AccountsPage from '../pages/Accounts';
import supabase from '../services/supabase'; // Make sure your supabase instance is imported
import './Dasboard.css';
import ErrorBoundary from "./ErrorBoundary";

const userName = "Kapoun";

function Dashboard() {
  // 1️⃣ State for deposits and balance
  const [deposits, setDeposits] = useState([]);
  const [balance, setBalance] = useState(0);

  // 2️⃣ Fetch deposits from Supabase
  const fetchDeposit = async () => {
    const { data, error } = await supabase
      .from("deposit")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching deposits:", error);
    } else {
      setDeposits(data);

      // Calculate total deposit amount
      const total = data.reduce((sum, item) => sum + Number(item.amount), 0);
      setBalance(total);
    }
  };

  // 3️⃣ Fetch once when component mounts
  useEffect(() => {
    fetchDeposit();
  }, []);

  return (
    <div className='dashboard-container'>
      <Sidebar />
      <div className='dashboard-content'>
        <h1>Welcome, {userName}!</h1>
      </div>
      <div className='main-dashboard'>
        <h1 className='dashboard-subtitle'>Here's an overview of your financial health:</h1>

        <div className='console'>
          <div className="chart-console"></div>

          <div className="card-console-accounts">
            <h1>Account Balance</h1>
            <label className="account-balance">
              $ {balance.toLocaleString()}
            </label>
          </div>

          <div className="card-console">
            <div className="card-console-balance-one">
              <h1>Total Deposit</h1>
              <label>$ {balance.toLocaleString()}</label>
            </div>
            <div className="card-console-balance-one">
              <h1>Total Withdraw</h1>
              <label>$ 0</label> {/* you can fetch withdrawals later */}
            </div>
          </div>

          <div className="card-console">
            <div className="card-console-balance-one">
              <h1>Total Investment</h1>
              <label>$ 0</label>
            </div>
            <div className="card-console-balance-one">
              <h1>Total Income</h1>
              <label>$ 0</label>
            </div>
          </div>
        </div>

        <div className="card-console-investment-listing">
          <button className='investment-listing-btn'>Investment</button>
        </div>

        <div className="card-console-transaction-listing">
          <h1 className='transaction-listing-title'>Transaction-Listing</h1>
          <button className='trans-widrawal-listing-btn'>Withdrawals</button>
          <button className='trans-deposite-listing-btn'>Deposit</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;