import React, { useState } from "react"

const Expence = () => {
    const [error, setError] = useState()
    const [Expence, setExpence] = useState()


    const fetchExpence = async () => {
        const { data, error } = await supabase
            .from("transactions")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Fetch error:", error);
            return [];
        }

        return data;
    };
}
