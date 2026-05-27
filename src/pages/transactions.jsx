import React, { useState, useEffect } from 'react';
import './transactions.css';
import { toast } from "react-toastify";
import Sidebar from '../components/Sidebar.jsx';
import { addTransaction, fetchTransactions } from "../Api/transaction";

function Transactions() {
    const [incomeTotal, setIncomeTotal] = useState(0);
    const [investmentTotal, setInvestmentTotal] = useState(0);
    const [expenceTotal, setExpenceTotal] = useState(0);
    const [savingTotal, setSavingTotal] = useState(0);
    const [type, setType] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [date, setDate] = useState("");
    const [insight, setInsight] = useState(""); // Already declared correctly here!
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
    });

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
        try {
            const newTransaction = await addTransaction(formData);

            if (newTransaction) {
                setTransactions(prev => [newTransaction, ...prev]);
                toast.success("Transaction Added Successfully 💰");

                if (formData.type === "Expense" && Number(formData.amount) > 10000) {
                    toast.warning("Large expense detected ⚠️");
                }
                if (formData.type === "Investment") {
                    toast.info("Investment added 📈");
                }
                if (formData.type === "Saving") {
                    toast.success("Savings growing nicely 🚀");
                }

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
            } else {
                toast.error("Failed to add transaction");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong 🚨");
        }
    };

    // FIXED: Cleaned up the useEffect execution context
    useEffect(() => {
        const loadTransactions = async () => {
            setLoading(true);
            try {
                const data = await fetchTransactions();

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

                    const saving = data
                        .filter((tx) => tx.type === "Saving")
                        .reduce((sum, tx) => sum + Number(tx.amount), 0);
                    setSavingTotal(saving);

                    // Optional: If your transaction payload includes backend-generated AI insights
                    if (data.insight) {
                        setInsight(data.insight);
                    }
                }
            } catch (err) {
                console.error("Error loading transactions:", err);
                setError("Failed to load transactions.");
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
        
    }, []);

    const getAISpendingAnalysis = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/ai/analyze-spending", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ transactions })
            });
            const data = await response.json();
            if (data.insight) setInsight(data.insight);
        } catch (err) {
            console.error("AI Insight Error:", err);
        }
    };

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

                        <div className="transaction-income-container">
                            <label className='investment-label'>Saving </label>
                            <label className='investment-value'>{savingTotal.toLocaleString()}</label>
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
                                <option value="Saving">Saving</option>
                                <option value="Investment">Investment</option>
                            </select>
                            <input type="text" list="account" placeholder="Account" name="account" value={formData.account} onChange={handleChange} required />
                            <datalist id="account">
                                <option value="Main Wallet" />
                                <option value="Saving Wallet" />
                                <option value="Mpesa" />
                                <option value="Bank Account" />
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
                                <option value="Utilities" />
                                <option value="Entertainment" />
                                <option value="Shopping" />
                                <option value="Salary" />
                                <option value="Freelance" />
                                <option value="Investments" />
                                <option value="Loans" />
                                <option value="Rent" />
                                <option value="Groceries" />
                                <option value="Education" />
                                <option value="Health" />
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
                                    {filteredTransactions.map((tx) => (
                                        <tr key={tx.id || tx._id}>
                                            <td>{new Date(tx.created_at || tx.date).toLocaleString()}</td>
                                            <td>{tx.description || 'No description'}</td>
                                            <td>{Number(tx.amount).toLocaleString()}</td>
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
<div className="ai-card">
    <h2>AI Insight</h2>
    <button onClick={getAISpendingAnalysis} className="trans-btn ai-btn">
        Ask AI Assistant
    </button>
    <p className="ai-insight-text">
        {insight || "No feedback generated yet. Click above to analyze."}
    </p>
</div>
            </div>
        </div>
    );
}

export default Transactions;