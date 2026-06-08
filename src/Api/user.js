import { useState, useEffect } from "react";
import supabase from "../services/supabase";
import { useAuth } from "../Context/AuthContext.jsx";

export default function useRegistration() {
    const { user, loading: authLoading } = useAuth(); // 👈 get auth loading state

    const [registrationData, setRegistrationData] = useState(null);
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchUserData = async () => {
            if (authLoading) return;      // 👈 wait for auth to finish
            if (!user?.id) {              // 👈 if auth done but no user, stop loading
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from("registration")
                    .select("*")
                    .eq("id", user.id)
                    .maybeSingle();

                if (error) throw error;

                if (data && isMounted) {
                    setRegistrationData(data);
                    setUserName(data.username);
                    setFullName(data.full_name);
                    setEmail(data.email);
                    setPhone(data.phone_number);
                    // setuserid(data.user_id); // ❌ this was also missing from your state/return
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchUserData();

        return () => { isMounted = false; };

    }, [user?.id, authLoading]); // 👈 re-run when authLoading changes

    return { registrationData, userName, loading, email, fullName, phone };
}