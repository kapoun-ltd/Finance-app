import React, { createContext, useState, useEffect } from "react";
import supabase from "../services/supabase";

// 1. Create context
export const BalanceContext = createContext();

// 2. Provider component
export const BalanceProvider = ({ children }) => {
    const [deposits, setDeposits] = useState([]);
    const [balance, setBalance] = useState(0);

    // Fetch deposits from Supabase
    const fetchDeposit = async () => {
        const { data, error } = await supabase
            .from("deposit")
            .select("*")
            .order("id", { ascending: false });

        if (!error && data) {
            setDeposits(data);
            const total = data.reduce((sum, item) => sum + Number(item.amount), 0);
            setBalance(total);
        }
    };

    // Load once when app starts
    useEffect(() => {
        fetchDeposit();
    }, []);

    return (
        <BalanceContext.Provider value={{ deposits, balance, fetchDeposit }}>
            {children}
        </BalanceContext.Provider>
    );
};