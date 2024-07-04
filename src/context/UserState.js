import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider component
const UserState = (props) => {
    const host = "http://localhost:5000";
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (authToken) {
            fetchUserDetails();
        } else {
            setLoading(false);
        }
    }, [authToken]);

    // Function to fetch user details
    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`${host}/api/auth/fetchuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                }
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data);
            } else {
                setAuthToken(null);
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            setAuthToken(null);
            localStorage.removeItem('token');
        }
        setLoading(false);
    };

    // Function to fetch all users
    const fetchAllUsers = async () => {
        try {
            const response = await fetch(`${host}/api/auth/fetchalluser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (response.ok) {
                setUsers(data);
            } else {
                console.error('Error fetching users:', data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Function to create a user
    const createUser = async (name, email, password, isAdmin) => {
        try {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, isAdmin })
            });

            const data = await response.json();
            if (response.ok) {
                setAuthToken(data.authtoken);
                localStorage.setItem('token', data.authtoken);
                fetchUserDetails();
            } else {
                console.error('Error creating user:', data);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // Function to login user
    const loginUser = async (email, password) => {
        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                setAuthToken(data.authtoken);
                localStorage.setItem('token', data.authtoken);
                fetchUserDetails();
            } else {
                console.error('Error logging in:', data);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    // Function to login admin
    const loginAdmin = async (email, password) => {
        try {
            const response = await fetch(`${host}/api/auth/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                setAuthToken(data.authtoken);
                localStorage.setItem('token', data.authtoken);
                fetchUserDetails();
            } else {
                console.error('Error logging in as admin:', data);
            }
        } catch (error) {
            console.error('Error logging in as admin:', error);
        }
    };

    // Function to logout
    const logout = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ users, user, loading, createUser, loginUser, loginAdmin, fetchAllUsers, logout,fetchUserDetails }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
