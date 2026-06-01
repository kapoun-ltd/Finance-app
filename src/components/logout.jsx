import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error(error);
            return;
        }

    
        navigate("/login", { replace: true });
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}