import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faUser,
  faChartLine,
  faBuildingColumns
} from '@fortawesome/free-solid-svg-icons';



import AccountsPage from '../Accounts/Accounts';
import './Dasboard.css';
import Income from '../Income/Income';
import Investment from '../Investment/Investment';
import Expenditure from '../Expenditure/Expenditure';
import Sidebar from '../Sidebar/Sidebar';
import Chart from '../charts/charts';
import Card from "../Card/Card"
import Transactions from '../Transactions/transactions';
import TransactionList from '../TransactionList/TransactionList'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useBalance } from "../BalanceContext/BalanceContext";


const userName = "Kapoun";

function Dashboard() {



  return (
    <div className='dashboard-container'>
      <Sidebar />

      <div className='dashboard-content'>
        <h1>Welcome, {userName}!</h1>
        <h1 className='dashboard-subtitle'>Here's an overview of your financial health:</h1>
      </div>
      <div className='main-dashboard'>
        <div className='console'>
          <div className="chart-console">

          </div>
          <div className="card-console-accounts">
            <h1>Account balance</h1>
            {/* <label>$ {balance.toLocaleString()}</label> */}

          </div>


          <div className="card-console">

            <div className="card-console-balance-one">
              <h1>Total Deposite</h1>
              <label>$</label>
            </div>
            <div className="card-console-balance-one">
              <h1>Total Withdraw</h1>
              <label>$</label>
            </div>

          </div>
          <div className="card-console">
            <div className="card-console-balance-one">
              <h1>Total Investment</h1>
              <label>$</label>
            </div>
            <div className="card-console-balance-one">
              <h1>Total Income</h1>
              <label>$</label>
            </div>
          </div>


        </div>
        <div className="card-console-investment-listing">
          <button className='investment-listing-btn'>Investment</button>
        </div>

        <div className="card-console-transaction-listing">
          <h1 className='transaction-listing-title'>Transaction-Listing</h1>
          <button className='trans-widrawal-listing-btn'>Withdrawals</button>
          <button className='trans-deposite-listing-btn'>Deposite</button>
        </div>
      </div>

    </div>

  );
}


export default Dashboard;