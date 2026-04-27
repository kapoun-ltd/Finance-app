import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./payment.css";

function Payment() {
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [phone, setPhone] = useState("");
    const [transactions, setTransactions] = useState([]);

    const handlePayment = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/pay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone,
                    amount: Number(amount),
                }),
            });

            const text = await res.text();
            console.log("Server Response:", text);

            const data = text ? JSON.parse(text) : {};

            if (res.ok) {
                alert("Check your phone 📱");
            } else {
                alert("Payment failed");
            }

        } catch (error) {
            console.error("Frontend Error:", error);
        }
    };

    return (
        <div>
            <Sidebar />

            <div className="payment-container">
                <h1>Payment</h1>

                <label className="make-payment">Make Payment</label>

                <form onSubmit={handlePayment}>
                    <input
                        type="text"
                        placeholder="Phone e.g 254712345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <button type="submit">Pay</button>
                </form>
            </div>
        </div>
    );
}

export default Payment;