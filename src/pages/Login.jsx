import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import logo from '../assets/logo.png';
import supabase from "../services/supabase";
import { toast } from "react-toastify";

function Login() {
  const [identifier, setIdentifier] = useState(""); // Renamed from email to fit both formats
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let emailToAuth = identifier.trim();

      // 1. Check if the input is a username (doesn't contain '@')
      if (!emailToAuth.includes("@")) {
        console.log("Username detected, fetching associated email...");

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("email")
          .eq("username", emailToAuth)
          .single();

        if (profileError || !profile) {
          throw new Error("No account found with that username.");
        }

        // Overwrite identifier with the real email found in the profiles table
        emailToAuth = profile.email;
      }

      // 2. Proceed with standard Supabase email/password authentication
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: emailToAuth,
        password: password,
      });

      if (authError) throw authError;

      console.log("Logged in user:", data.user);
      toast.success("Logged in successfully!");

      // Redirect to dashboard or home page
      navigate('/dashboard');

    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="auth-box">
        <img src={logo} alt="Finance Tracker Logo" className='logo' />
        <h2>Login Page</h2>
        <p>Welcome back! Log in to continue where you left off.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Username or Email</label>
          <input
            type="text"
            placeholder='Enter username or email'
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          <label style={{ display: 'block', marginTop: '15px' }}>
            If you don't have an account <Link to="/register">Register Here</Link>
            
          </label>
          <Link to="/">Home</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;