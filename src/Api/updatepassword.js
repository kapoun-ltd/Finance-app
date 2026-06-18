import React from "react";

export const Upassord = async (curentpassword, newpassword) => {
 try {
    const response = await fetch("/api/update-password", {
      method: "POST",
      headers: {const data = await response.json();
        "constent-type": "application/json" },
      body: JSON.stringify({ curentpassword, newpassword }),
    });

    if (!response.ok) {
        throw new Error(data.message || "Failed to update password");
 }

    return data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
    toast.error("Failed to update password. Please try again.");
  }

}