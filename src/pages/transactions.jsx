import React, { useState } from 'react';
import { useEffect } from 'react';
import './transactions.css';
import Sidebar from '../components/Sidebar.jsx';
import { addTransaction, fetchTransactions } from "../Api/transaction";
function Transactions() {
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [investmentTotal, setInvestmentTotal] = useState(0);
    const [expenceTotal, setExpenceTotal] = useState(0);
    const [type, setType] = useState("")
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        type: "",
        category: "",
        account: "",
        method: "",
        date: "",
        user_id: ""
    })
    const filteredTransactions = type
        ? transactions.filter((tx) => tx.type === type)
        : transactions;

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
                category: "",
                account: "",
                method: "",
                date: "",
                user_id: ""
            });
        }
    }

    useEffect(() => {
        const loadTransactions = async () => {
            setLoading(true);

            const data = await fetchTransactions(); // 👈 always all

            if (data) {
                setTransactions(data);

                const income = data
                    .filter((tx) => tx.type === "Income")
                    .reduce((sum, tx) => sum + Number(tx.amount), 0);

                const expense = data
                    .filter((tx) => tx.type === "Expense")
                    .reduce((sum, tx) => sum + Number(tx.amount), 0);

                setIncomeTotal(income);
                setExpenceTotal(expense);
                setBalance(income - expense);

                const investment = data
                    .filter((tx) => tx.type === "Investment")
                    .reduce((sum, tx) => sum + Number(tx.amount), 0);
                setInvestmentTotal(investment);
            }

            setLoading(false);
        };

        loadTransactions();

    }, []);

    return (
        <div className='transaction-main-container'>
            <Sidebar />
            <div className='container'>
                <div className="transaction-title-container">
                    <div className="transaction-balance-all-container">
                        <div className="transaction-balance-container">
                            <label className='balance-label'>Balance </label>
                            <label className='net-balance'> {balance.toLocaleString()}</label>

                        </div>

                        <div className="transaction-expense-container">
                            <label className='expense-label'>Expense </label>
                            <label className='expense-value'>{expenceTotal.toLocaleString()}</label>
                        </div>

                        <div className="transaction-income-container">
                            <label className='investment-label'>Investment </label>
                            <label className='investment-value'>{investmentTotal.toLocaleString()}</label>
                        </div>

                    </div>
                    <div className="transaction-btn-container">
                        <button className="trans-btn">Import</button>
                        <button className="trans-btn">Export</button>
                    </div>
                </div>
                <div className='transaction-mini-container'>

                    <div className='transaction-form'>

                        <form onSubmit={handleSubmit}>
                            <div className='transaction-form-title'>
                                <label className='transaction-form-title-label'>Add Transaction</label>
                            </div>
                            <select name="type" value={formData.type} onChange={handleChange} required>
                                <option value="">Select Type</option>
                                <option value="Income">Income</option>
                                <option value="Expense">Expense</option>
                                <option value="Investment">Investment</option>
                            </select>
                            <input type="text" list="account" placeholder="Account" name="account" value={formData.account} onChange={handleChange} required />
                            <datalist id="account">
                                <option value="Main Wallet" />
                                <option value="Saving Wallet" />
                                <option value="Mpesa" />
                                <option value="Bank" />
                                <option value="Cash" />
                                <option value="Card" />
                            </datalist>
                            <input type="number" placeholder="Amount" name="amount" value={formData.amount} onChange={handleChange} required />
                            <input type="text" list="method" placeholder="Method" name="method" value={formData.method} onChange={handleChange} required />
                            <datalist id="method">
                                <option value="Cash" />
                                <option value="Card" />
                                <option value="Bank Transfer" />
                                <option value="Mobile Money" />
                            </datalist>
                            <input type="text" list="category" placeholder="Category" name="category" value={formData.category} onChange={handleChange} required />
                            <datalist id="category">
                                <option value="Food" />
                                <option value="Transportation" />
                                <option value="Utilites" />
                                <option value="Entertainment" />
                                <option value="Shopping" />
                                <option value="Bills" />
                                <option value="Salary" />
                                <option value="Freelance" />
                                <option value="Investments" />
                                <option value="Loans" />
                                <option value="Rent" />
                                <option value="Groceries" />
                                <option value="Bills" />
                                <option value="Education" />
                                <option value="Health" />
                                <option value="Transport" />
                                <option value="Entertainment" />
                                <option value="Shopping" />
                                <option value="Subscription" />
                                <option value="Other income" />
                                <option value="Other expense" />

                            </datalist>
                            <input type="text" placeholder="Description" name="description" value={formData.description} onChange={handleChange} required />

                            <input type="date" placeholder="Date" name="date" value={formData.date} onChange={handleChange} required />
                            <button className='trans-btn'>Submit</button>
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

        </div>
    );
}

export default Transactions;