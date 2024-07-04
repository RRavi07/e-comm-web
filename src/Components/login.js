import React, { useState } from 'react';
import styles from './Css/login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            console.log(json.authtoken);
            onClose();
            navigate('/cart');
        } else {
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: signupData.name, email: signupData.email, password: signupData.password }),
        });
        const json = await response.json();
        if (json.authtoken) {
            localStorage.setItem('token', json.authtoken);
            console.log(json.authtoken);
            onClose();
            navigate('/cart');
        } else {
            alert("Signup failed. Please check your details and try again.");
        }
    };

    const handleChange = (e, type) => {
        if (type === 'login') {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
        } else {
            setSignupData({ ...signupData, [e.target.name]: e.target.value });
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <div className={styles.heading}>
                    <h4>{isLogin ? 'Login' : 'Signup'}</h4>
                </div>
                <div className={styles.form}>
                    {isLogin ? (
                        <form onSubmit={handleLoginSubmit}>
                            <div className={styles.input}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    value={credentials.email}
                                    onChange={(e) => handleChange(e, 'login')}
                                    required
                                />
                            </div>
                            <div className={styles.input}>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={credentials.password}
                                    onChange={(e) => handleChange(e, 'login')}
                                    required
                                />
                            </div>
                            <div className={styles.buttonContainer}>
                                <button type="submit" className={styles.button}>Login</button>
                            </div>
                            <div className={styles.linkContainer}>
                                <span>Don't have an account? </span>
                                <button type="button" onClick={() => setIsLogin(false)} className={styles.linkButton}>Sign Up</button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSignupSubmit}>
                            <div className={styles.input}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={signupData.name}
                                    onChange={(e) => handleChange(e, 'signup')}
                                    required
                                />
                            </div>
                            <div className={styles.input}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    value={signupData.email}
                                    onChange={(e) => handleChange(e, 'signup')}
                                    required
                                />
                            </div>
                            <div className={styles.input}>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={signupData.password}
                                    onChange={(e) => handleChange(e, 'signup')}
                                    required
                                />
                            </div>
                            <div className={styles.buttonContainer}>
                                <button type="submit" className={styles.button}>Signup</button>
                            </div>
                            <div className={styles.linkContainer}>
                                <span>Already have an account? </span>
                                <button type="button" onClick={() => setIsLogin(true)} className={styles.linkButton}>Login</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
