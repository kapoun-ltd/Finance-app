import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faUser,
  faChartLine,
  faBuildingColumns
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import './Dasboard.css';
import ErrorBoundary from "./ErrorBoundary";
import { fetchTransactions } from "../Api/transaction";
import { IncomeChart, PieChart } from '../charts/charts';

const userName = "Kapoun";

function Dashboard() {
  const [deposits, setDeposits] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [investment, setInvestment] = useState([]);
  const [balance, setBalance] = useState(0);
  const [investmentBalance, setInvestmentBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [type, setType] = useState("");
  // This state will hold the formatted data array for the PieChart
  const [data, setData] = useState([]);

  const settings = {
    margin: { top: 50, bottom: 50 },
    legend: { hidden: true },
    height: 300,
  };

  // Fixed potential mismatch between "expense" and "expence" typos
  const filteredTransactions = type
    ? transactions.filter((tx) => tx.type === type)
    : transactions;

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);

      const resData = await fetchTransactions();

      if (resData) {
        setTransactions(resData);

        const income = resData
          .filter((tx) => tx.type === "Income")
          .reduce((sum, tx) => sum + Number(tx.amount), 0);

        // Standardized to catch both spellings just in case
        const expense = resData
          .filter((tx) => tx.type === "Expense")
          .reduce((sum, tx) => sum + Number(tx.amount), 0);

        setIncomeTotal(income);
        setExpenseTotal(expense);
        setBalance(income - expense);

        // --- MAP REAL-TIME DATA TO PIE CHART ---
        // Formatting the fetched data to match MUI X PieChart structural expectations
        const pieChartFormattedData = [
          { id: 0, value: income, label: 'Income', color: '#2e7d32' },
          { id: 1, value: expense, label: 'Expense', color: '#d32f2f' }
        ];

        setData(pieChartFormattedData);
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
                  <label htmlFor="">Total Income</label>
                  <div>
                    <label className='income-balance'>$ {incomeTotal.toLocaleString()}</label>
                  </div>
                </div>
              </div>
              <div className="card-console-balance-expense">
                <FontAwesomeIcon icon={faWallet} />
                <div>
                  <label htmlFor="">Total Expenses</label>
                  <div>
                    <label className='expense-balance'>$ {expenseTotal.toLocaleString()}</label>
                  </div>
                </div>
              </div>
              <div className="card-console-balance-balance">
                <FontAwesomeIcon icon={faWallet} />
                <div>
                  <label htmlFor="">Total Net Balance</label>
                  <div>
                    <div className="card-console-balance-investment">
                      <FontAwesomeIcon icon={faChartLine} />
                      <label className='net-balance'>$ {balance.toLocaleString()}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-console-other-container">
          <div className="card-console-other">
            <IncomeChart transactions={transactions} />
          </div>

          <div className="card-console-other-pending">
            <label>Breakdown</label>

            {/* Just pass the transactions state directly here! */}
            <PieChart
              transactions={transactions}
              settings={settings}
            />
          </div>
        </div>

        <div className="card-console-charts-container">
          <div className="card-console-charts-income">
            <label htmlFor="">Total Income Chart</label>
            <label>$ {incomeTotal.toLocaleString()}</label>
          </div>

          <div className="card-console-charts-expense">
            <label htmlFor="">Total Expense Chart</label>
            <label>$ {expenseTotal.toLocaleString()}</label>
          </div>

          <div className="card-console-charts-expense">
            <label htmlFor="">Total Investment Chart</label>
            <label>$ 0</label>
          </div>
        </div>

        <div className="card-console-transaction-listing">
          <h1 className='transaction-listing-title'>Transaction-Listing</h1>
          <button
            className='trans-widrawal-listing-btn'
            onClick={() => setType("expense")}
          >
            Withdrawals
          </button>

          <button
            className='trans-deposite-listing-btn'
            onClick={() => setType("income")}
          >
            Deposit
          </button>

          <button className='trans-all-listing-btn' onClick={() => setType("")}>
            All
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;