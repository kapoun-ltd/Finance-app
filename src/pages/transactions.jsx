import React, { useState } from 'react';
import { useEffect } from 'react';
import './transactions.css';
import Sidebar from '../components/Sidebar.jsx';
import { addTransaction, fetchTransactions } from "../Api/transaction";
function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        type: "",
        account: "",
        method: "",
        user_id: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTransaction = await addTransaction(formData);

        if (newTransaction) {
            setTransactions(prev => [newTransaction, ...prev]);
            setFormData({
                description: "",
                amount: "",
                type: "",
                account: "",
                method: "",
                user_id: ""
            });
        }
    }

    useEffect(() => {
        const loadTransactions = async () => {
            setLoading(true);

            const data = await fetchTransactions();

            console.log("Fetched from DB:", data);

            if (data) {
                setTransactions(data);

                // calculate balance
                const total = data.reduce((sum, item) => sum + Number(item.amount), 0);
                setBalance(total);
            }

            setLoading(false);
        };

        loadTransactions();
    }, []);


    return (
        <div className='transaction-container'>
            <Sidebar />

            <div className='transaction-mini-container'>
                <h1>Add Transaction</h1>
                <div className='transaction-form'>
                    <form onSubmit={handleSubmit}>
                        <input type="text" list="method" placeholder="Type" name="type" value={formData.type} onChange={handleChange} required />
                        <datalist id="method">
                            <option value="Income" />
                            <option value="Expence" />
                        </datalist>
                        <input type="text" list="account" placeholder="Account" name="account" value={formData.account} onChange={handleChange} required />
                        <datalist id="account">
                            <option value="Main" />

                        </datalist>
                        <input type="number" placeholder="Amount" name="amount" value={formData.amount} onChange={handleChange} required />
                        <input type="text" list="method-mode" placeholder="Method" name="method" value={formData.method} onChange={handleChange} required />
                        <datalist id="method-mode">
                            <option value="Cash" />
                            <option value="Card" />
                            <option value="Bank Transfer" />
                            <option value="Mobile Money" />
                        </datalist>
                        <input type="text" placeholder="Description" name="description" value={formData.description} onChange={handleChange} required />
                        <button className='trans-btn'>Add Transaction</button>
                    </form>

                </div>



                {!loading && !error && (
                    <div className='transaction-listing'>
                        <h2>Recent Transactions</h2>
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
                                {transactions.map((tx) => (
                                    <tr key={tx.id}>
                                        <td>{new Date(tx.created_at).toLocaleString()}</td>
                                        <td>{tx.description || 'No description'}</td>
                                        <td>{tx.amount}</td>
                                        <td>{tx.type}</td>
                                        <td>{tx.account}</td>
                                        <td>{tx.method}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Transactions;