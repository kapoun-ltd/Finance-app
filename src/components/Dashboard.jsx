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


const userName = "Kapoun";



function Dashboard() {
  const [deposits, setDeposits] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [investment, setInvestment] = useState([]);
  const [balance, setBalance] = useState(0);
  const [investmentBalance, setInvestmentBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenceTotal, setExpenceTotal] = useState(0);
  const [type, setType] = useState("")

  const filteredTransactions = type
    ? transactions.filter((tx) => tx.type === type)
    : transactions;

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);

      const data = await fetchTransactions();

      if (data) {
        setTransactions(data);

        const income = data
          .filter((tx) => tx.type === "Income")
          .reduce((sum, tx) => sum + Number(tx.amount), 0);

        const expense = data
          .filter((tx) => tx.type === "Expence")
          .reduce((sum, tx) => sum + Number(tx.amount), 0);

        setIncomeTotal(income);
        setExpenceTotal(expense);
        setBalance(income - expense);
      }

      setLoading(false);
    };

    loadTransactions();

  }, []);



  return (
    <div>
      <Sidebar />
      <div className='dashboard-container'>
        <h1>Welcome, {userName}!</h1>

        <div className='main-dashboard'>
          <div className='console'>
            <div className="card-console-accounts">
              <h1>Accounts</h1>
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
              <div className="card-console-balance">
                <FontAwesomeIcon icon={faWallet} />
                <div>
                  <label htmlFor="">Total Expences</label>
                  <div>
                    <label className='expence-balance'>$ {expenceTotal.toLocaleString()}</label>
                  </div>
                </div>
              </div>
              <div className="card-console-balance">
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
            <label>Other</label>
            <label>$ 0</label>
          </div>

          <div className="card-console-other-pending">
            <label>Pending</label>
            <label>$ 0</label>
          </div>
        </div>
        <div className="card-console-charts-container">
          <div className="card-console-charts-income">
            <label htmlFor="">Total Income Chart</label>
            <label>$ 0</label>
          </div>

          <div className="card-console-charts-expence">
            <label htmlFor="">Total Expence Chart</label>
            <label>$ 0</label>
          </div>

          <div className="card-console-charts-expence">
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
          {/* <div className='transaction-listing'>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Account</th>
                  <th>Method</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{new Date(tx.created_at).toLocaleDateString()}</td>
                    <td>{tx.description || 'Deposit'}</td>
                    <td>{tx.amount}</td>
                    <td>{tx.account}</td>
                    <td>{tx.method}</td>
                    <td>{tx.type}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          {/* </div> */}

        </div>
      </div>
    </div>

  );
}

export default Dashboard;