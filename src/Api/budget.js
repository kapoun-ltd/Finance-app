import supabase from "../services/supabase";

export const addBudget = async (budgetData) => {
    // 1. Destructure with default values to prevent undefined errors
    const { limit = 0, amount = 0, category, start_month, end_month } = budgetData;

    // 2. Perform the insert
    const { data, error } = await supabase
        .from("budget")
        .insert([
            {
                category,
                limit,
                amount,
                start_month,
                end_month,
            }
        ])
        .select()
        .single();

    if (error) {
        // Log more context for debugging
        console.error(`Error adding budget for ${category}:`, error.message);
        throw new Error(error.message);
    }

    return data;
};