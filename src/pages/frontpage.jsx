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
        </div>
      

    );
}

export default Frontpage;