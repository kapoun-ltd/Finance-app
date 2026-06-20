import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faChartLine } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import './Dasboard.css';
import { fetchTransactions } from "../Api/transaction";
import { IncomeChart, PieChart } from '../charts/charts';
import BudgetModel from '../pages/module';
import { getActiveBudget } from '../Api/budget';
import { calculateBudgetRemaining } from '../utils/budgetfunction';
import { checkBudgetStatus } from '../utils/budgetchecker';
import useRegistration from '../Api/user';


function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [budget, setBudget] = useState([]);
  const [settings, setSettings] = useState([]);


  const { userName, registrationData, loading: userLoading } = useRegistration();


  /* =========================================
      FETCH TRANSACTIONS
  ========================================= */
  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      const resData = await fetchTransactions();
      if (resData) {
        setTransactions(resData);

        const income = resData
          .filter(tx => tx.type === "Income")
          .reduce((sum, tx) => sum + Number(tx.amount), 0);

        const expense = resData
          .filter(tx => tx.type === "Expense")
          .reduce((sum, tx) => sum + Number(tx.amount), 0);

        setIncomeTotal(income);
        setExpenseTotal(expense);
        setBalance(income - expense);
      }
      setLoading(false);
    };
    loadTransactions();
  }, []);

  /* =========================================
      FETCH BUDGETS
  ========================================= */
  useEffect(() => {
    const fetchBudgetData = async () => {
      const today = new Date().toISOString().split("T")[0];
      const data = await getActiveBudget(today);
      if (data) {
        setBudget(data);
      }
    };
    fetchBudgetData();
  }, []);

  /* =========================================
      DERIVED DATA (Logic inside function)
  ========================================= */

  // Calculate expenses per category memoized for performance
  const expenseByCategory = useMemo(() => {
    const mapping = {};
    transactions.forEach((item) => {
      if (item.type === "Expense") {
        const category = item.category?.trim();
        mapping[category] = (mapping[category] || 0) + Number(item.amount);
      }
    });
    return mapping;
  }, [transactions]);

  // Calculate the consumed per category
  const consumedByCategory = useMemo(() => {
    const mapping = {};

    transactions.forEach((item) => {
      const category = item.category;
      const amount = Number(item.amount);

      mapping[category] = (mapping[category] || 0) + amount;
    });

    return mapping;
  }, [transactions]);


  // Format data for the Pie Chart
  const pieChartData = useMemo(() => [
    { id: 0, value: incomeTotal, label: 'Income', color: '#2e7d32' },
    { id: 1, value: expenseTotal, label: 'Expenses', color: '#d32f2f' }
  ], [incomeTotal, expenseTotal]);



  return (
    <div>
      <Sidebar />
      <div className='dashboard-container'>
        <label>Welcome, {userName} </label>

        {/* TOP CARDS */}
        <div className='main-dashboard'>
          <div className='console'>
            <div className="card-console-accounts">
              <label>Dashboard Overview</label>
            </div>

            <div className="card-console">
              <div className="card-console-balance">
                <FontAwesomeIcon icon={faWallet} />
                <div>
                  <label>Total Income</label>
                  <label className='income-balance'>
                    Ksh {incomeTotal.toLocaleString()}
                  </label>
                </div>
              </div>

              <div className="card-console-balance-expense">
                <FontAwesomeIcon icon={faWallet} />
                <div>
                  <label>Total Expenses</label>
                  <label className='expense-balance'>
                    Ksh {expenseTotal.toLocaleString()}
                  </label>
                </div>
              </div>

              <div className="card-console-balance-balance">
                <FontAwesomeIcon icon={faWallet} />
                <div>
                  <label>Net Balance</label>
                  <label className='net-balance'>
                    Ksh {balance.toLocaleString()}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BUDGET SECTION */}
        <div className='main-budget-container'>
            <div className="budget-list-container">
              <div className="budget-header">
                <h3>Budget Overview</h3>
                <BudgetModel />
              </div>

              <div className="budget-grid">
                {budget.map((b) => {
                  // Uses the first memoized function which filters by "Expense" type
                  const consumed = expenseByCategory[b.category] || 0;
                  const remaining = b.budget_limit - consumed;

                  const percentage = b.budget_limit > 0
                    ? (consumed / b.budget_limit) * 100
                    : 0;

                  // Determine color based on status
                  const isOverBudget = remaining < 0;

                  return (
                    <div key={b.id || b.category} className="budget-card">
                      <h3>{b.category}</h3>

                      <div className="budget-stats">
                        <p>Limit: <strong>Ksh {Number(b.budget_limit).toLocaleString()}</strong></p>
                        <p>Spent: <span className="spent-amt">Ksh {consumed.toLocaleString()}</span></p>
                        <p>
                          Remaining:
                          <strong style={{ color: isOverBudget ? '#787474' : '#2e7d32' }}>
                            Ksh {remaining.toLocaleString()}
                          </strong>
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="progress-container" style={{ background: '#eee', height: '10px', borderRadius: '5px', marginTop: '10px' }}>
                        <div
                          className="progress-bar"
                          style={{
                            width: `${Math.min(percentage, 100)}%`,
                            backgroundColor: percentage > 90 ? '#d32f2f' : '#2e7d32',
                            height: '100%',
                            borderRadius: '5px',
                            transition: 'width 0.3s ease'
                          }}
                        />
                      </div>
                      <small>{percentage.toFixed(0)}% of budget used</small>
                    </div>
                  );
                })}
              </div>

          </div>
        </div>

        {/* CHARTS */}
        <div className="card-console-other-container">
          <div className="card-console-other">
            <IncomeChart transactions={transactions} />
          </div>
          <div className="pie-console">
            <PieChart
            transactions={transactions}
            settings={settings}
            />
          </div>
        </div>

        <div className="card-console-transaction-listing">
  <h1 className='transaction-listing-title'>Transaction Listing</h1>

  {loading ? (
    <p>Loading transactions...</p>
  ) : transactions.length === 0 ? (
    <p>No transactions found.</p>
  ) : (
    <div className="transaction-listing-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Category</th>
            <th>Type</th>
            <th>Date</th>
            <th>Amount (Ksh)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={tx.id}>
              <td>{index + 1}</td>
              <td>{tx.category}</td>
              <td>
                <span className={`transaction-type ${tx.type.toLowerCase()}`}>
                  {tx.type}
                </span>
              </td>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>Ksh {Number(tx.amount).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

      </div>
    </div >
  );
}

export default Dashboard;