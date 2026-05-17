import React from 'react';
import "./Profile.css";
import Sidebar from '../components/Sidebar';
import useRegistration from "../Api/user";




function Profile() {
    const { userName, fullName, email, registrationData, loading: userLoading } = useRegistration();

    return (
        <div className="profile">
            <Sidebar />
            <div className='profile-container'>
                <div className='console-profile'>
                    <div className='profile-picture'>
                        <img src="" alt="" />
                    </div>
                    <label>Username:{userName} 👋</label>
                    <label>Email :{email} </label>
                    <label>FullName :{fullName} </label>
                </div>
            </div>

        </div>

    );
}

export default Profile;