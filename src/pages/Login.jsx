import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import logo from '../assets/logo.png';
import supabase from "../services/supabase";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      console.log("Logged in user:", data.user);
      // redirect to dashboard or home page
      navigate('/dashboard');

    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
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
          <label>Email</label>
          <input
            type="email"
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <label>If you don't have an account  <Link to="/register">Register Here</Link></label>
        </form>
      </div>
    </div>
  );
}

export default Login;