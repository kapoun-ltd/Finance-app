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


function AccountsPage({ }) {
  const [account, setAccount] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [userId, setUserId] = useState('');

  const [viewTableOpen, setViewTableOpen] = React.useState(false);


  function handleClick() {
    setFormOpen(true);
  }


  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, name: accountName, type: accountType }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add account.');
      }
      setFormOpen(false);
      // Optionally, refresh the account list or give user feedback here
    } catch (err) {
      console.error('Error adding account:', err);
    }
  }



  return (
    <div >
      <h1 className='h-account'>Account</h1>
      <Sidebar />

      <button onClick={handleClick} className="btn-open-form">
        + Add New Account
      </button>

      {formOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create Account</h3>
            <div className="add-account-form">
              <label htmlFor="userId">User ID:</label>
              <input id='userId' type="text" placeholder="User_id" required value={userId} onChange={(e) => setUserId(e.target.value)} />
              <label htmlFor="name">Account Name:</label>
              <input id='name' type="text" placeholder="name" required value={accountName} onChange={(e) => setAccountName(e.target.value)} />
              <label htmlFor="type">Account Type:</label>
              <input id='type' type="text" placeholder="type" required value={accountType} onChange={(e) => setAccountType(e.target.value)} />
              <div className="button-group">
                <button onClick={() => setFormOpen(false)} className="btn-cancel">
                  Cancel
                </button>
                <button className="btn-submit" onClick={handlesubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="account-container">

        <div className="account-details">
          <label className="details">Personal Account</label>

          <FontAwesomeIcon
            icon={faBuildingColumns}
            className="details-icon"
            size="3x"
          />

          <button className="details-btn">Add</button>
        </div>

        <div className="account-details">
          <label className="details">Business Account</label>
          <button className="details-btn">Add</button>
        </div>

        <div className="account-details">
          <label className="details">Savings Account</label>
          <button className="details-btn">Add</button>
        </div>

      </div>


      <div className='trans-container'>
        <label>RECENT ACCOUNT TRANSACTION</label>

      </div>
    </div>


  )
}






export default AccountsPage;