import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faUser,
  faChartLine,
  faBuildingColumns
} from '@fortawesome/free-solid-svg-icons';
// 1. ADDED THESE IMPORTS FROM MUI
import { Modal, Box, Button } from '@mui/material';

import Sidebar from './Sidebar';
import './Dasboard.css';
import ErrorBoundary from "./ErrorBoundary";
import { fetchTransactions } from "../Api/transaction";
import { IncomeChart, PieChart } from '../charts/charts';
import BudgetCard from '../pages/budget';
import BudgetModel from '../pages/module';

const userName = "Kapoun";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [type, setType] = useState("");
  const [data, setData] = useState([]);

  // 2. MODAL STATE AND HANDLERS
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const handleOpen = () => setIsBudgetModalOpen(true);
  const handleClose = () => setIsBudgetModalOpen(false);

  // 3. MODAL STYLING
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: '16px',
    outline: 'none'
  };

  const settings = {
    margin: { top: 50, bottom: 50 },
    legend: { hidden: true },
    height: 300,
  };

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      const resData = await fetchTransactions();
      if (resData) {
        setTransactions(resData);
        const income = resData
          .filter((tx) => tx.type === "Income")
          .reduce((sum, tx) => sum + Number(tx.amount), 0);
        const expense = resData
          .filter((tx) => tx.type === "Expense")
          .reduce((sum, tx) => sum + Number(tx.amount), 0);

        setIncomeTotal(income);
        setExpenseTotal(expense);
        setBalance(income - expense);

        setData([
          { id: 0, value: income, label: 'Income', color: '#2e7d32' },
          { id: 1, value: expense, label: 'Expense', color: '#d32f2f' }
        ]);
      }
      setLoading(false);
    };
    loadTransactions();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className='dashboard-container'>
        <label>Welcome, {userName}!</label>

        <div className='main-dashboard'>
          <div className='console'>
            <div className="card-console-accounts">
              <label>Dashboard</label>
            </div>

            <div className="card-console">
              <div className="card-console-balance">
                <FontAwesomeIcon icon={faWallet} />
                <div>
                  <label>Total Income</label>
                  <div>
                    <label className='income-balance'>$ {(incomeTotal || 0).toLocaleString()}</label>
                  </div>
                </div>
              </div>

              <div className="card-console-balance-expense">
                <FontAwesomeIcon icon={faWallet} />
                <div>
                  <label>Total Expenses</label>
                  <div>
                    <label className='expense-balance'>$ {(expenseTotal || 0).toLocaleString()}</label>
                  </div>
                </div>
              </div>

              <div className="card-console-balance-balance">
                <FontAwesomeIcon icon={faWallet} />
                <div>
                  <label>Total Net Balance</label>
                  <div className="card-console-balance-investment">
                    <FontAwesomeIcon icon={faChartLine} />
                    <label className='net-balance'>$ {(balance || 0).toLocaleString()}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. BUDGET SECTION WITH MODAL TRIGGER */}
        <div className='main-budget-container'>
          <div className='budget-container'>
            <div className='budget'>
              <BudgetModel />
            </div>
          </div>
        </div>


        <div className="card-console-other-container">
          <div className="card-console-other">
            <IncomeChart transactions={transactions} />
          </div>

          <div className="card-console-other-pending">
            <label>Breakdown</label>
            <PieChart
              transactions={transactions}
              settings={settings}
            />
          </div>
        </div>

        {/* ... Rest of your charts and listing ... */}
        <div className="card-console-transaction-listing">
          <h1 className='transaction-listing-title'>Transaction-Listing</h1>
          <button className='trans-widrawal-listing-btn' onClick={() => setType("expense")}>Withdrawals</button>
          <button className='trans-deposite-listing-btn' onClick={() => setType("income")}>Deposit</button>
          <button className='trans-all-listing-btn' onClick={() => setType("")}>All</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;