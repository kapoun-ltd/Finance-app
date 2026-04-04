import React from 'react';
import "./Profile.css";
import Sidebar from '../Sidebar/Sidebar';



function Profile() {
    return (
        <div className="setting">

            <Sidebar />
            <h2>Settings</h2>
            <div className="setting-option">
                <label>Notification Preferences</label>
                <select>
                    <option>Email</option>
                    <option>SMS</option>
                    <option>Push Notifications</option>
                </select>
            </div>
            <div className="setting-option">
                <label>Theme</label>
                <select>
                    <option>Light</option>
                    <option>Dark</option>
                </select>
            </div>
            <div className="setting-option">
                <label>Language</label>
                <select>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                </select>
            </div>
        </div>

    );
}

export default Profile;