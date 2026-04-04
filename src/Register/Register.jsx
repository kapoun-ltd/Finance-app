import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from "../../supabase";
import './Register.css';
import logo from '../assets/logo.png';

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirm_password) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {

      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password
      });
      if (error) throw error;

      // Insert profile info into your RLS-safe table
      const { error: profileError } = await supabase
        .from('registration')
        .insert({
          id: data.user.id,
          full_name: user.full_name,
          phone_number: user.phone_number
        });

      if (profileError) throw profileError;

      setSuccessMessage("Registration successful!");
      setErrorMessage('');
      navigate('/'); // redirect to login or dashboard

    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className='register-container'>
      <img src={logo} alt="Finance Tracker Logo" className='logo' />
      <h2>Register Page</h2>

      <form onSubmit={registerUser}>
        <label>Full Name</label>
        <input type="text" name="full_name" value={user.full_name} onChange={handleChange} placeholder='Enter your full name' required />

        <label>Email</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} placeholder='Enter your email' required />

        <label>Phone Number</label>
        <input type="text" name="phone_number" value={user.phone_number} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" name="password" value={user.password} onChange={handleChange} required />

        <label>Confirm Password</label>
        <input type="password" name="confirm_password" value={user.confirm_password} onChange={handleChange} required />

        <button type="submit">Register</button>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>

      <label>If you already have an account</label>
      <Link to="/">Login Here</Link>
    </div>
  );
}

export default Register;