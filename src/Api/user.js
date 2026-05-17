import { useState, useEffect } from "react";
import supabase from "../services/supabase";
import { useAuth } from "../Context/AuthContext.jsx";

export default function useRegistration() {
    const { user } = useAuth();

    const [registrationData, setRegistrationData] = useState(null);
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchUserData = async () => {
            try {
                if (!user?.id) return;

                const { data, error } = await supabase
                    .from("registration")
                    .select("*")
                    .eq("id", user.id)
                    .maybeSingle();

                if (error) throw error;

                if (data && isMounted) {
                    setRegistrationData(data);
                    setUserName(data.full_name);
                    setEmail(data.email);
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchUserData();

        return () => {
            isMounted = false;
        };
    }, [user?.id]); // 🔥 dependency added

    return {
        registrationData,
        userName,
        loading,
        email,
        fullName,

    };
}