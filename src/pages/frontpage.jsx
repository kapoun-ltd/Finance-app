import React from "react";
import "./frontpage.css";
import myLogo from "../assets/logo.png";

function Frontpage() {
    return (
    
         

        <div className="front-container">
    <div className="log-options">
            <lable>Get Started</lable>
            <a href="/register">
                <button>Register</button>
            </a>
           <a href="/login">
                <button>Log In</button>
            </a>
        </div>
            <div className="front-text">
                <img className="company-logo" src={myLogo} alt="comapany logo" />

                <h1>Next-Gen</h1>
                <h1>Solutions</h1>

                <p>
                    Leading the charge in innovation, driven by excellence and integrity.
                </p>

            </div>
            <div className="landing-wrapper">
    <div className="front-intro">
        <h1>Welcome to</h1>
        <h1 className="brand-name">Finovate</h1>
        <p>Experience seamless financial management with our intuitive platform designed to simplify your budgeting and transactions.</p>
    </div>

    <div className="features-container">
        <div className="feature-card">
            <h1>Secure Transactions</h1>
            <p>Experience our state-of-the-art security features designed to protect your financial data and ensure safe transactions every time.</p>
        </div>
        
        <div className="feature-card">
            <h1>Smart Budgeting</h1>
            <p>Discover how intelligent budgeting can help you manage your finances effortlessly and achieve your savings goals seamlessly.</p>
        </div>
    </div>
</div>
        </div>
      

    );
}

export default Frontpage;