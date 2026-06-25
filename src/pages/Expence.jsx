import React, { useState, useEffect } from "react"
import supabase from "../services/supabase"
import './Expence.css'

const Expense = () => {
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchExpenses = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from("transactions")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Fetch error:", error)
            setError(error.message)
            setLoading(false)
            return
        }

        setExpenses(data)   // ← store the data
        setLoading(false)
    }

    useEffect(() => {
        fetchExpenses()     // ← call it on mount
    }, [])

    if (loading) return <p>Loading expenses...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="spending-panel">
            <h2>Spending</h2>
            {expenses.length === 0 ? (
                <p>No expenses yet.</p>
            ) : (
                expenses.map((expense) => (
                    <div key={expense.id} className="expense-item">
                        <span>{expense.description}</span>
                        <span>{expense.amount}</span>
                        <span>{new Date(expense.created_at).toLocaleDateString()}</span>
                    </div>
                ))
            )}
        </div>
    )
}

export default Expense