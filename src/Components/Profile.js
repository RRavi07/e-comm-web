import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserState'; // Adjust the path if needed
import styles from './Css/Profile.module.css';
import Login from './login';

const Profile = () => {
    const { user, fetchUserDetails, logout } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setIsModalOpen(true);
        } else {
            fetchUserDetails();
        }
    }, [fetchUserDetails, logout, user]);

    return (
        <>
            {!localStorage.getItem('token') ? (
                <div className={styles.login}>
                    <Login isOpen={isModalOpen} onClose={() => { (localStorage.getItem('token')) ? setIsModalOpen(false) : setIsModalOpen(true) }} />
                </div>
            ) : (
                <div className={styles.profilePage}>
                    <div className={styles.profileHeader}>
                        {/* <img src={user.profilePicture || 'defaultProfilePictureUrl'} alt="Profile" className={styles.profilePicture} /> */}
                        <h2 className={styles.userName}>{user && user.name}</h2>
                    </div>
                    <div className={styles.userDetails}>
                        <p><strong>Email:</strong> {user && user.email}</p>
                        <p><strong>Address:</strong> {user && user.address}</p>
                        <p><strong>Phone:</strong> {user && user.phone}</p>
                    </div>
                    <button className={styles.logoutButton} onClick={logout}>Logout</button>
                </div>
            )}
        </>
    );
};

export default Profile;
