import React, { useState, useEffect } from "react"
import { fetchTransactions } from "../Api/transaction"
import './potfolio.css'

const Portfolio = () => {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            const data = await fetchTransactions() // fetches all
            setTransactions(data)
            setLoading(false)
        }
        load()
    }, [])

    // --- Derived values from your actual fields ---
    const income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0)

    const expenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0)

    const netWorth = income - expenses

    // Group expenses by category
    const byCategory = transactions
        .filter(t => t.type === "expense")
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
            return acc
        }, {})

    // Group by account
    const byAccount = transactions
        .reduce((acc, t) => {
            const sign = t.type === "income" ? 1 : -1
            acc[t.account] = (acc[t.account] || 0) + sign * Number(t.amount)
            return acc
        }, {})

    const fmt = (amount) =>
        new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES" }).format(amount)

    if (loading) return <p className="portfolio-loading">Loading portfolio...</p>

    return (
        <div className="portfolio-container">
            <h2 className="portfolio-title">Portfolio Overview</h2>

            <div className="portfolio-grid">

                {/* Net Worth */}
                <div className="portfolio-card net-worth">
                    <span className="card-label">Net Worth</span>
                    <span className="card-value">{fmt(netWorth)}</span>
                    <span className="card-sub">Total Income − Total Expenses</span>
                </div>

                {/* Income vs Expenses */}
                <div className="portfolio-card income-expense">
                    <span className="card-label">Income vs Expenses</span>
                    <div className="ie-row">
                        <div className="ie-block income">
                            <span className="ie-label">Income</span>
                            <span className="ie-value">{fmt(income)}</span>
                        </div>
                        <div className="ie-divider" />
                        <div className="ie-block expense">
                            <span className="ie-label">Expenses</span>
                            <span className="ie-value">{fmt(expenses)}</span>
                        </div>
                    </div>
                    <div className="ie-bar">
                        <div
                            className="ie-bar-fill"
                            style={{ width: `${Math.min(income > 0 ? (expenses / income) * 100 : 0, 100)}%` }}
                        />
                    </div>
                    <span className="card-sub">
                        {income > 0
                            ? `${((expenses / income) * 100).toFixed(1)}% of income spent`
                            : "No income recorded"}
                    </span>
                </div>

                {/* Account Balances — derived from your account field */}
                <div className="portfolio-card accounts">
                    <span className="card-label">Account Balances</span>
                    <span className="card-value total">{fmt(Object.values(byAccount).reduce((s, v) => s + v, 0))}</span>
                    <div className="account-list">
                        {Object.entries(byAccount).length === 0 ? (
                            <p className="empty">No accounts found.</p>
                        ) : (
                            Object.entries(byAccount).map(([name, balance]) => (
                                <div key={name} className="account-row">
                                    <span className="account-name">{name}</span>
                                    <span
                                        className="account-balance"
                                        style={{ color: balance >= 0 ? "#2ec4b6" : "#e63946" }}
                                    >
                                        {fmt(balance)}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Spending by Category — from your category field */}
                <div className="portfolio-card assets">
                    <span className="card-label">Spending by Category</span>
                    <span className="card-value total">{fmt(expenses)}</span>
                    <div className="asset-list">
                        {Object.entries(byCategory).length === 0 ? (
                            <p className="empty">No expenses recorded.</p>
                        ) : (
                            Object.entries(byCategory)
                                .sort((a, b) => b[1] - a[1])
                                .map(([category, total]) => (
                                    <div key={category} className="asset-row">
                                        <div className="asset-info">
                                            <span className="asset-name">{category}</span>
                                            <span className="asset-type">
                                                {((total / expenses) * 100).toFixed(1)}% of spending
                                            </span>
                                        </div>
                                        <span className="asset-value">{fmt(total)}</span>
                                    </div>
                                ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Portfolio