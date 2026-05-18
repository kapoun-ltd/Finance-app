import supabase from "../services/supabase";
import { toast } from "react-toastify";


export const getActiveGoals = async (currentDate = new Date()) => {

    // Convert Date object → YYYY-MM-DD
    const formattedDate = currentDate instanceof Date
        ? currentDate.toISOString().split('T')[0]
        : currentDate;

    const { data, error } = await supabase
        .from("goals")
        .select("*")
        .lte("start_date", formattedDate)
        .gte("end_date", formattedDate);

    if (error) {
        console.error("Supabase Error fetching goals:", error);
        toast.error(`Failed to load goals: ${error.message}`);
        return [];
    }

    return data ?? [];
};


export const addGoal = async (goalsData) => {
    const { goal_name, goal_amount, start_date, end_date } = goalsData;

    if (!goal_name || !goal_amount || !start_date || !end_date) {
        toast.error("Please fill in all required goal fields.");
        return null;
    }

    const { data, error } = await supabase
        .from("goals")
        .insert([
            {
                goal_name,
                goal_amount: Number(goal_amount),
                start_date,
                end_date,
            }
        ])
        .select()
        .single();

    if (error) {
        console.error(`Error adding goal for ${goal_name}:`, error.message);
        toast.error(`Error saving goal: ${error.message}`);
        return null;
    }

    toast.success("Goal added successfully!");
    return data;
};