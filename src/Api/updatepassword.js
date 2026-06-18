import React from "react";

export const updatepassword = async (newPassword) => {
    
 const lodding = true;
    try {
        const {data , error} = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) {
            return { success: false, message: error.message };
        }
        return { success: true, message: "Password updated successfully" };
    }
    catch (error) {
        console.error("Unexpected error:", error);
        return { success: false, message: "An unexpected error occurred" };
    }

    finally {
        lodding = false;
    }

};