import { useState } from "react";
import supabase from "../services/supabase";
import { toast } from "react-toastify";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
 const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            options: {
                redirectTo: `${window.location.origin}/reset-password`
            }
        });

        sertLoading(false);
        if (error) {
            toast.error(error.message);
        }
        if (data) {
            toast.success("Password reset email sent! Please check your inbox.");
        }
    }

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;