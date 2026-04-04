import "./deposit.css";
import Sidebar from '../Sidebar/Sidebar';
import supabase from "../../supabase";
import React, { useState, useEffect } from "react";

function Deposit() {
    const [deposits, setDeposits] = useState([]);
    const [balance, setBalance] = useState(0);

    const [formData, setFormData] = useState({
        amount: "",
        account_deposit: "",
        deposit_method: ""
    })

    const fetchDeposit = async () => {
        const { data, error } = await supabase
            .from("deposit")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.error("Error fetching deposits:", error);
        } else {
            setDeposits(data);

            // calculate balance
            const total = data.reduce((sum, item) => sum + Number(item.amount), 0);
            setBalance(total);
        }
        await fetchDeposit();
    };

    useEffect(() => {
        fetchDeposit();
    }, []);



    const handleDeposit = async (e) => {
        e.preventDefault();
        const { amount, account_deposit, deposit_method } = formData;
        const { data, error } = await supabase
            .from("deposit")
            .insert([
                {
                    amount: Number(amount),
                    account_deposit: String(account_deposit),
                    deposit_method: String(deposit_method)
                }
            ])
            .select();
        if (error) {
            console.error("Error depositing:", error);
        } else {
            console.log("Deposit successful:", data);

            setFormData({
                amount: "",
                account_deposit: "",
                deposit_method: ""
            });

            if (!amount || !account_deposit || !deposit_method) {
                alert("Please fill all fields");
                return;
            }
            alert("Deposit successful 🎉");
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <div>
            <Sidebar />
            <div className="deposit-container">
                <div className="deposit-mini-container">
                    <div className="deposit-header">
                        <h1>Fund Your Account</h1>
                    </div>

                    <div className="deposit-content">
                        <div className="deposit-content-header">
                            <h2>Amounts</h2>
                            <form onSubmit={handleDeposit}>
                                <input type="number" placeholder="Enter Amount" name="amount" value={formData.amount} onChange={handleInputChange} />
                                <input type="text" placeholder="Account Deposit" name="account_deposit" value={formData.account_deposit} onChange={handleInputChange} />

                                {/* use of option methode*/}
                                <input
                                    type="text"
                                    list="methods"
                                    placeholder="Deposit Method"
                                    name="deposit_method"
                                    value={formData.deposit_method}
                                    onChange={handleInputChange}
                                />
                                <datalist id="methods">
                                    <option value="Cash" />
                                    <option value="Card" />
                                    <option value="Bank Transfer" />
                                    <option value="Mobile Money" />
                                </datalist>

                                <button className="deposit-btn" type="submit">Deposit</button>
                            </form>
                        </div>

                        <div className="deposit-content-footer">
                            <h2>Account Balance</h2>
                            <label className="account-balance">
                                $ {balance.toLocaleString()}
                            </label>
                        </div>
                        <div className="other-details">
                            <div className="recent-transactions">
                                <h2>Recent Transactions</h2>
                                <div className="recent-transaction-listing">
                                    {deposits.map((item, index) => (
                                        <div key={index} className="transaction-item">
                                            <span>{item.id}</span> -
                                            <span>${item.amount}</span> -
                                            <span>{item.deposit_method}</span> -
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

export default Deposit;