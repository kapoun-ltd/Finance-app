import { useState, useEffect } from "react";
import supabase from "../services/supabase";

export default function useRegistration() {
    const [registrationData, setRegistrationData] = useState(null);
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data, error } = await supabase
                    .from("registration")
                    .select("*")
                    .eq("id", localStorage.getItem("id"))
                    .maybeSingle();

                if (error) throw error;

                if (data) {
                    setRegistrationData(data);
                    setUserName(data.full_name);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return {
        registrationData,
        userName,
        loading,
    };
}