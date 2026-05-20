import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../services/supabase";
import { toast } from "react-toastify";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const { error: dbError } = await supabase
      .from("registration")
      .insert({
        id: data.user.id,
        username: user.username,
        full_name: user.full_name,
        email: user.email,
      });

    if (dbError) {
      toast.error(dbError.message);
      return;
    }

    toast.success("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={user.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

        <Link to="/">Home</Link>
      </form>
    </div>
  );
}

export default Register;