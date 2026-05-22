import React from 'react';
import './Accounts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faUser,
  faChartLine,
  faBuildingColumns
} from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import { Label } from 'recharts';
import Sidebar from "../components/Sidebar";



function AccountsPage({ }) {


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
      <span className='account-balance'>$24,500.25</span>
    </div>
  </div>
</div>
      

      
 

  )
}






export default AccountsPage;