import React from "react";
import "./frontpage.css";
import myLogo from "../assets/logo.png";

function Frontpage() {
    return (
        <div className="front-container">
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