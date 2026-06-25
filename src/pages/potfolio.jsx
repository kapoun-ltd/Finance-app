import React, { useState, useEffect } from "react"
import supabase from "../services/supabase"
import './potfolio.css'

const Portfolio = () => {
    const [transactions, setTransactions] = useState([])
    const [accounts, setAccounts] = useState([])
    const [assets, setAssets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAll()
    }, [])

    const fetchAll = async () => {
        setLoading(true)

        const [{ data: txns }, { data: accs }, { data: asst }] = await Promise.all([
            supabase.from("transactions").select("*"),
            supabase.from("accounts").select("*"),       // adjust table name
            supabase.from("assets").select("*"),         // adjust table name
        ])

        setTransactions(txns || [])
        setAccounts(accs || [])
        setAssets(asst || [])
        setLoading(false)
    }

    // --- Derived values ---
    const income = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + Number(t.amount), 0)

    const expenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + Number(t.amount), 0)

    const totalBalance = accounts
        .reduce((sum, a) => sum + Number(a.balance), 0)

    const totalAssets = assets
        .reduce((sum, a) => sum + Number(a.value), 0)

    const netWorth = totalBalance + totalAssets - expenses

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
                    <span className="card-sub">Assets + Balance − Expenses</span>
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
                    {/* Progress bar */}
                    <div className="ie-bar">
                        <div
                            className="ie-bar-fill"
                            style={{ width: `${Math.min((expenses / income) * 100, 100)}%` }}
                        />
                    </div>
                    <span className="card-sub">
                        {income > 0
                            ? `${((expenses / income) * 100).toFixed(1)}% of income spent`
                            : "No income recorded"}
                    </span>
                </div>

                {/* Account Balances */}
                <div className="portfolio-card accounts">
                    <span className="card-label">Account Balances</span>
                    <span className="card-value total">{fmt(totalBalance)}</span>
                    <div className="account-list">
                        {accounts.length === 0 ? (
                            <p className="empty">No accounts found.</p>
                        ) : (
                            accounts.map(acc => (
                                <div key={acc.id} className="account-row">
                                    <span className="account-name">{acc.name}</span>
                                    <span className="account-balance">{fmt(acc.balance)}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Assets / Investments */}
                <div className="portfolio-card assets">
                    <span className="card-label">Assets & Investments</span>
                    <span className="card-value total">{fmt(totalAssets)}</span>
                    <div className="asset-list">
                        {assets.length === 0 ? (
                            <p className="empty">No assets recorded.</p>
                        ) : (
                            assets.map(asset => (
                                <div key={asset.id} className="asset-row">
                                    <div className="asset-info">
                                        <span className="asset-name">{asset.name}</span>
                                        <span className="asset-type">{asset.type}</span>
                                    </div>
                                    <span className="asset-value">{fmt(asset.value)}</span>
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