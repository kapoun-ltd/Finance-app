import { useState, useEffect } from "react";
import supabase from "../services/supabase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // When user clicks the reset link, Supabase sets a session automatically
    // We listen for the PASSWORD_RECOVERY event to confirm the link is valid
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setValidSession(true); // ✅ Link is valid, show the form
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password updated successfully!");
    navigate("/login");
  };

  // Show a message if the reset link is invalid or expired
  if (!validSession) {
    return (
      <div>
        <p>Waiting for reset link verification...</p>
        <p>If this takes too long, your link may have expired. 
           <a href="/forgot-password"> Request a new one.</a>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Set New Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="button" disabled={loading} onClick={handleReset}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;