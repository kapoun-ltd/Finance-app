import React, { useState, useEffect } from 'react';
import './Accounts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWallet,
  faUser,
  faChartLine,
  faBuildingColumns
} from '@fortawesome/free-solid-svg-icons';

import Sidebar from "../components/Sidebar";
// Note: Removed the duplicate local transaction import to prevent conflicts with state
import { fetchTransactions } from "../Api/transaction";

function AccountsPage() {
  // 1. Grouped balance and used states together for each account
  const [mainAccount, setMainAccount] = useState({ balance: 0, used: 0 });
  const [bankAccount, setBankAccount] = useState({ balance: 0, used: 0 });
  const [savingAccount, setSavingAccount] = useState({ balance: 0, used: 0 });
  const [cashAccount, setCashAccount] = useState({ balance: 0, used: 0 });
  const [cardAccount, setCardAccount] = useState({ balance: 0, used: 0 });
  
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Derived overall global metrics across all combined accounts
  const totalBalance = mainAccount.balance + bankAccount.balance + savingAccount.balance + cashAccount.balance;
  const totalUsedOverall = mainAccount.used + bankAccount.used + savingAccount.used + cashAccount.used;

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      const data = await fetchTransactions();

      if (data) {
        setTransactions(data);

        // 2. Setup the initial state structure for tracking both variables per account
        const initialTotals = {
          main:   { balance: 0, used: 0 },
          bank:   { balance: 0, used: 0 },
          saving: { balance: 0, used: 0 },
          cash:   { balance: 0, used: 0 },
          card:   { balance: 0, used: 0 }
        };

        const totals = data.reduce((acc, tx) => {
          const amount = Number(tx.amount) || 0;
          const isIncome = tx.type.toLowerCase() === "income";

          // Point to the correct object block inside our accumulator
          let targetAccount = null;
          if (tx.account === "Main Wallet") targetAccount = acc.main;
          else if (tx.account === "Bank Account") targetAccount = acc.bank;
          else if (tx.account === "Saving") targetAccount = acc.saving;
          else if (tx.account === "Cash") targetAccount = acc.cash;
          else if (tx.account === "Card Account") targetAccount = acc.card;

          if (targetAccount) {
            if (isIncome) {
              targetAccount.balance += amount; // Income grows remaining balance
            } else {
              targetAccount.balance -= amount; // Expense drops remaining balance
              targetAccount.used += amount;    // Expense accumulates used metrics
            }
          }

          return acc;
        }, initialTotals);

        // 3. Update all our states with the multi-property objects
        setMainAccount(totals.main);
        setBankAccount(totals.bank);
        setSavingAccount(totals.saving);
        setCashAccount(totals.cash);
        setCardAccount(totals.card);
      }

      setLoading(false);
    };

    loadTransactions();
  }, []);

  return (
    <div className='main-container'>
      <Sidebar />
      <div className='accounts-container'>
        <h1>Accounts</h1>

        {/* Optional: Global Overview Summary Card */}
        <div className='global-overview-card' style={{ marginBottom: '20px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Net Overview</label>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Total Balance: $ {totalBalance.toLocaleString()}</span>
            <span>Total Used: $ {totalUsedOverall.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Main Account Card */}
        <div className='account-card'>
          <label>Main Account</label>
          <div className='account-metrics'>
            <label className='used-balance'>Used: $ {mainAccount.used.toLocaleString()}</label>
            <label className='net-balance'>Remaining: $ {mainAccount.balance.toLocaleString()}</label>
          </div>
        </div>

        {/* Bank Account Card */}
        <div className='account-card'>
          <label>Bank Account</label>
          <div className='account-metrics'>
            <label className='used-balance'>Used: $ {bankAccount.used.toLocaleString()}</label>
            <label className='net-balance'>Remaining: $ {bankAccount.balance.toLocaleString()}</label>
          </div>
        </div>

        {/* Saving Account Card */}
        <div className='account-card'>
          <label>Saving Account</label>
          <div className='account-metrics'>
            <label className='used-balance'>Used: $ {savingAccount.used.toLocaleString()}</label>
            <label className='net-balance'>Remaining: $ {savingAccount.balance.toLocaleString()}</label>
          </div>
        </div>

        {/* Cash Account Card */}
        <div className='account-card'>
          <label>Cash Account</label>
          <div className='account-metrics'>
            <label className='used-balance'>Used: $ {cashAccount.used.toLocaleString()}</label>
            <label className='net-balance'>Remaining: $ {cashAccount.balance.toLocaleString()}</label>
          </div>
        </div>

        {/* Card Account Card */}
        <div className='account-card'>
          <label>Card Account</label>
          <div className='account-metrics'>
            <label className='used-balance'>Used: $ {cardAccount.used.toLocaleString()}</label>
            <label className='net-balance'>Remaining: $ {cardAccount.balance.toLocaleString()}</label>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default AccountsPage;