import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import supabase from "../services/supabase";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      console.log(data);

      toast.success("Login successful!");

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 const handleGoogleLogin = async () => {
  try {

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      toast.error(error.message);
    }

  } catch (err) {
    console.log(err);
    toast.error("Google login failed");
  }
};



  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
<button
  type="button"
  onClick={handleGoogleLogin}
  className="google-btn"
>
  Continue with Google
</button>
        <p>
          Don’t have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

        <Link to="/">Home</Link>
      </form>
    </div>
  );
}

export default Login;