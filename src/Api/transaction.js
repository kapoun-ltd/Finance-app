import supabase from "../services/supabase";

// 🔄 SUBSCRIBE to real-time transaction updates
export const subscribeToTransactions = (onUpdate) => {
    return supabase
        .channel('realtime-transactions')
        .on(
            'postgres_changes',
            { event: '*', scheme: 'public', table: 'transactions' },
            (payload) => {
                // This callback runs whenever a row is INSERTED, UPDATED, or DELETED
                console.log('Change received!', payload);
                onUpdate(payload);
            }
        )
        .subscribe();
};

// ➕ ADD transaction
export const addTransaction = async (formData) => {

    const { amount, type, account, method, description } = formData;

    const { data, error } = await supabase
        .from("transactions")
        .insert([{
            amount: Number(amount),
            type,
            account,
            method,
            description
        }])
        .select();

    if (error) {
        console.error("Insert error:", error);
        return null;
    }

    return data[0];
};

// 📥 FETCH transactions
export const fetchTransactions = async (type = "") => {
    let query = supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

    if (type) {
        query = query.eq("type", type);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Fetch error:", error);
        return [];
    }

    return data;
};


