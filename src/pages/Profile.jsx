import React from 'react';
import "./Profile.css";
import Sidebar from '../components/Sidebar';
import useRegistration from "../Api/user";




function Profile() {
    const { userName, fullName, phone, email, registrationData, loading: userLoading } = useRegistration();

    return (
        <div className="profile">
            <Sidebar />
            <div className='profile-container'>
                <hi className="profile-header">My Profile</hi>
                <div className='console-profile'>
                    <label className='info-header'>Personal Information</label>
                    <div className='profile-info-console'>
                        <div className='profile-info-one'>
                            <label>Username:{userName} 👋</label>
                        </div>
                        <div className='profile-info-one'>
                            <label>Email :{email} </label>
                        </div>
                        <div className='profile-info-one'>
                            <label>FullName :{fullName} </label>
                        </div>
                        <div className='profile-info-one'>
                            <label>Phone :{phone} </label>
                        </div>
                    </div>

                </div>
                <div className='console-one'>
                    <label>Account setting</label>
                </div>
            </div>

        </div>

    );
}

export default Profile;