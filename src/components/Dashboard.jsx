import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faChartLine } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import './Dasboard.css';
import { fetchTransactions , deletetransaction } from "../Api/transaction";
import { IncomeChart, PieChart } from '../charts/charts';
import BudgetModel from '../pages/module';
import { getActiveBudget } from '../Api/budget';
import { calculateBudgetRemaining } from '../utils/budgetfunction';
import { checkBudgetStatus } from '../utils/budgetchecker';
import useRegistration from '../Api/user';
import Budget from '../pages/budget';
import supabase from '../services/supabase';
import Expense from '../pages/Expence'
import Portfolio from '../pages/potfolio';



function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [budget, setBudget] = useState([]);
  const [settings, setSettings] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
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


  // Format data for the Pie Chart
  const pieChartData = useMemo(() => [
    { id: 0, value: incomeTotal, label: 'Income', color: '#2e7d32' },
    { id: 1, value: expenseTotal, label: 'Expenses', color: '#d32f2f' }
  ], [incomeTotal, expenseTotal]);


 // toggle one item
const handleSelect = (id) => {
  setSelectedId((prev) =>
    prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  );
};

const handleDeleteSelected = async () => {
  const success = await deletetransaction(selectedId);

  if (success) {
        setGoals((prev) => prev.filter((g) => g.id !== selectedGoalId));
        setSelectedGoalId(null);
    }
}

  return (
    <div>
      <Sidebar />
      <div className='dashboard-container'>
        <label>Welcome back, {userName} </label>

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
        <div className='analysis-container'>

          <div className='budget-card'>
            <Budget /> 
          </div>
          
          <div className='speeding-card'>
              <Expense />
                
          </div>

          <div className='pendingBills-card'>
             <Portfolio />
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

    {/* Delete bar - only shows when something is checked */}
    {selectedId.length > 0 && (
      <div className="bulk-action-bar">
        <span>{selectedId.length} selected</span>
        <button onClick={handleDeleteSelected} className="delete-selected-btn">
          Delete Selected
        </button>
      </div>
    )}

    <table className="transaction-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              
              checked={selectedId.length === transactions.length && transactions.length > 0}
            />
          </th>
          <th>No</th>
          <th>Category</th>
          <th>Type</th>
          <th>Date</th>
          <th>Amount (Ksh)</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx, index) => (
          <tr key={tx.id} className={selectedId.includes(tx.id) ? 'row-selected' : ''}>
            <td>
              <input
                type="checkbox"
                checked={selectedId.includes(tx.id)}
                onChange={() => handleSelect(tx.id)}
              />
            </td>
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