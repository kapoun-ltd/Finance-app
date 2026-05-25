import supabase from "../services/supabase";
import { toast } from "react-toastify";

export const getActiveBudget = async (
    currentDate
) => {

    const { data, error } = await supabase
    .from("budget")
    .select("*")
    .eq("user_id", (await supabase.auth.getUser()).data.user.id)
    .lte("start_date", currentDate)
    .gte("end_date", currentDate);

    if (error) {
        console.error(error);

        return [];
    }

    return data;

}

export const updateBudget = async (budgetId, updatedData) => {

    const { data, error } = await supabase
        .from("budget")
        .update(updatedData)
        .eq("id", budgetId)
        .eq("user_id", (await supabase.auth.getUser()).data.user.id)
        .select()
        .single();

        if (error) {
            console.error("Update budget error:", error);
            return null;
        }
        toast.info("Budget updated successfully!");

        return data;
}


export const addBudget = async (budgetData) => {

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error("User not found:", userError);
        return null;
    }

    const { budget_limit = 0, category, start_date, end_date } = budgetData;

    const { data, error } = await supabase
        .from("budget")
        .insert([
            {
                category,
                budget_limit,
                start_date,
                end_date,
                user_id: user.id}
        ])
        .select()
        .single();

    if (error) {
        console.error("Insert budget error:", error);
        return null;
    }
    toast.info("Budget added successfully!");
    

    return data;
};

