import React, { useState, useEffect, useMemo } from 'react';
import './Accounts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faUser,
  faChartLine,
  faBuildingColumns
} from '@fortawesome/free-solid-svg-icons';

import { Label } from 'recharts';
import Sidebar from "../components/Sidebar";
import transactions from "./transactions"

  /* =========================================
      FETCH TRANSACTIONS
  ========================================= */

function AccountsPage({ }) {
  const [mainaccount , setMainaccount] = useState;


  return (
   <div className='main-container'>
  <Sidebar />
  <div className='accounts-container'>
    <h1>Accounts</h1>
    
    <div className='account-card'>
      <label>Main Account</label>
      <span className='account-balance'>$5,240.50</span>
    </div>

    <div className='account-card'>
      <label>Bank Account</label>
      <span className='account-balance'>$12,800.00</span>
    </div>

    <div className='account-card'>
      <label>Saving Account</label>
      <span className='account-balance'>{incomeTotal.toLocaleString()}</span>
    </div>
  </div>
</div>
      

      
 

  )
}






export default AccountsPage;