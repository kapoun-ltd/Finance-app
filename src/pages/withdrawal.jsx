import "./withdrawal.css";
import supabase from "../services/supabase";
import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';


function Withdrawal() {
    const [withdrawals, setWithdrawals] = useState([]);
    const [balance, setBalance] = useState(0);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        amount: "",
        account_withdrawal: "",
        withdrawal_method: ""
    });

    // ✅ Fetch withdrawals
    const fetchWithdrawal = async () => {
        const { data, error } = await supabase
            .from("withdrawal")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.error("Error fetching withdrawals:", error);
        } else {
            setWithdrawals(data);

            const total = data.reduce((sum, item) => sum - Number(item.amount), 0);
            setBalance(total);
        }
    };

    useEffect(() => {
        fetchWithdrawal();
    }, []);

    // ✅ Handle input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ✅ Handle withdrawal
    const handleWithdrawal = async (e) => {
        e.preventDefault();

        const { amount, account_withdrawal, withdrawal_method } = formData;

        if (!amount || !account_withdrawal || !withdrawal_method) {
            setErrorMessage("Please fill all fields");
            setSuccessMessage("");
            return;
        }

        if (Number(amount) > balance) {
            setErrorMessage("Insufficient balance ❌");
            setSuccessMessage("");
            return;
        }

        const { error } = await supabase
            .from("withdrawal")
            .insert([
                {
                    amount: Number(amount),
                    account_withdrawal,
                    withdrawal_method
                }
            ]);

        if (error) {
            console.error("Error withdrawing:", error);
            setErrorMessage("Withdrawal failed ❌");
            setSuccessMessage("");
        } else {
            setSuccessMessage("Withdrawal successful 🎉");
            setErrorMessage("");

            setFormData({
                amount: "",
                account_withdrawal: "",
                withdrawal_method: ""
            });

            fetchWithdrawal(); // refresh UI
        }
    };

    // ✅ UI stays HERE (not inside any function)
    return (
        <div>
            <Sidebar />
            <div className="withdrawal-container">
                <div className="withdrawal-mini-container">
                    <div className="withdrawal-header">
                        <h1>Account Withdrawals</h1>
                    </div>

                    <div className="withdrawal-content">
                        <div className="withdrawal-content-header">

                            <div className="withdrawal-content-footer">
                                <h2>Account Balance</h2>
                                <label className="account-balance">
                                    $ {balance.toLocaleString()}
                                </label>
                            </div>

                            <h2>Withdraw Funds</h2>

                            <form onSubmit={handleWithdrawal}>
                                <input
                                    type="number"
                                    placeholder="Enter Amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                />

                                <input
                                    type="text"
                                    list="method"
                                    placeholder="Account Withdrawal"
                                    name="account_withdrawal"
                                    value={formData.account_withdrawal}
                                    onChange={handleInputChange}
                                />

                                <datalist id="method">
                                    <option value="Investment" />
                                    <option value="Saving" />
                                    <option value="Checking" />
                                    <option value="Credit" />
                                </datalist>

                                <input
                                    type="text"
                                    list="methods"
                                    placeholder="Withdrawal Method"
                                    name="withdrawal_method"
                                    value={formData.withdrawal_method}
                                    onChange={handleInputChange}
                                />

                                <datalist id="methods">
                                    <option value="Cash" />
                                    <option value="Card" />
                                    <option value="Bank Transfer" />
                                    <option value="Mobile Money" />
                                </datalist>

                                <button className="Withdrawal-btn" type="submit">
                                    Withdraw
                                </button>

                                {successMessage && <p className="success">{successMessage}</p>}
                                {errorMessage && <p className="error">{errorMessage}</p>}
                            </form>
                        </div>

                        <div className="other-details">
                            <div className="recent-transactions">
                                <h2>Recent Transactions</h2>

                                <div className="recent-transaction-listing">
                                    {withdrawals.map((item, index) => (
                                        <div key={index} className="transaction-item">
                                            <span>{item.id}</span> -
                                            <span>${item.amount}</span> -
                                            <span>{item.withdrawal_method}</span> -
                                            <span>{new Date(item.created_at).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Withdrawal;