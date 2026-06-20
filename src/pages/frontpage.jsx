import React from "react";
import "./frontpage.css";
import myLogo from "../assets/logo.png";
import one from "../assets/one.jpg"
import two from "../assets/two.jpg"
import three from "../assets/three.jpg"
import four from "../assets/four.jpg"


import { Link } from "react-router-dom";

function Frontpage() {
    return (
    
         

        <div className="front-container">
    <div className="log-options">
           <label>Get Started</label>
        <div className="button-group">
        <Link to="/register"> <button>Register</button> </Link>

        <Link to="/login"><button>Log In</button> </Link>
        </div>
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
             <img className="companylogo" src={one} alt="comapany logo" />
            <p>Experience our state-of-the-art security features designed to protect your financial data and ensure safe transactions every time.</p>
        </div>
        
        <div className="feature-card">
            <h1>Smart Budgeting</h1>
                         <img className="companylogo" src={two} alt="comapany logo" />

            <p>Discover how intelligent budgeting can help you manage your finances effortlessly and achieve your savings goals seamlessly.</p>
        </div>
    </div>
    <div className="feature-card">
        <h1>Transaction History</h1>
                     <img className="companylogo" src={three} alt="comapany logo" />

        <p> Explore your recent transactions with detailed summaries, allowing for easy tracking of spending and income patterns. </p>
    </div>

    <div className="feature-card">
        <h1>Confirm Transaction</h1>
                     <img className="companylogo" src={four} alt="comapany logo" />

        <p>Review all details before proceeding. Ensure the recipient's information and amount are accurate for a smooth transaction.</p>
    </div>
</div>
        </div>
      

    );
}

export default Frontpage;