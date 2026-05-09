import supabase from "../services/supabase";

export const addBudget = async (budgetData) => {
    // 1. Destructure with default values to prevent undefined errors
    const { limit = 0, amount = 0, category, month } = budgetData;

    // 2. Perform the insert
    const { data, error } = await supabase
        .from("budget")
        .insert([
            {
                category,
                limit,
                amount,
                month,
            }
        ])
        .select()
        .single(); // Use .single() if you only expect one row back

    if (error) {
        // Log more context for debugging
        console.error(`Error adding budget for ${category}:`, error.message);
        throw new Error(error.message);
    }

    return data;
};