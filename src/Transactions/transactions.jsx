import React, { useState } from 'react'
import './transactions.css'
import Sidebar from '../Sidebar/Sidebar'
import TransactionList from '../TransactionList/TransactionList'
import { useEffect } from 'react'
import { useMemo } from 'react'
import TransactionForm from '../Transactionform/transactionform.jsx'

function Transactions() {
    return (
        <div className='transaction-container'>
            <Sidebar />
            <h1>Transactions</h1>
            <div className='transaction-mini-container'>
                <h2>Recent Transactions</h2>
                <div className='transaction-listing'>
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Type</th>
                        </tr>
                        <tr>
                            <td>2022-01-01</td>
                            <td>Salary</td>
                            <td>5000</td>
                            <td>Income</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Transactions;
