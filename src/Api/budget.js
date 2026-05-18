import supabase from "../services/supabase";
import { toast } from "react-toastify";

export const getActiveBudget = async (
    currentDate
) => {

    const { data, error } = await supabase
        .from("budget")
        .select("*")
        .lte("start_date", currentDate)
        .gte("end_date", currentDate);

    if (error) {
        console.error(error);

        return [];
    }

    return data;

}



export const addBudget = async (budgetData) => {
    // 1. Destructure with default values to prevent undefined errors
    const { budget_limit = 0, category, start_date, end_date } = budgetData;

    // 2. Perform the insert
    const { data, error } = await supabase
        .from("budget")
        .insert([
            {
                category,
                budget_limit,
                start_date,
                end_date,

            }
        ])
        .select()
        .single();

    if (error) {
        // Log more context for debugging
        console.error(`Error adding budget for ${category}:`, error.message);
        throw new Error(error.message);
    }

    toast.success("Budget added successfully");
    return data;
};