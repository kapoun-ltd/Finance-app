import supabase from "../services/supabase";
import { toast } from "react-toastify";

export const getActiveMeta = async (
    currentDate
) => {

    const { data, error } = await supabase
        .from("meta")
        .select("*")
        .lte("start_date", currentDate)
        .gte("end_date", currentDate);

    if (error) {
        console.error(error);

        return [];
    }

    return data;

}   