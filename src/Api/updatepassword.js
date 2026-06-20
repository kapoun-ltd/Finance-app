import { toast } from "react-toastify";
import supabase from "../services/supabase";

export async function updatepassword(newPassword) {
    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) {
        toast.error(error.message);
    } else {
        toast.success("Password updated successfully");
    }
}