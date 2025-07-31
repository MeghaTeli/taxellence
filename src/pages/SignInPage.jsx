// src/pages/SignInPage.jsx
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

// Define the base URL for your backend API
const API_BASE_URL = 'http://localhost:5000/api'; // IMPORTANT: Adjust if your backend is on a different URL

// SignInPage component for user login
const SignInPage = ({ onNavigate, onLoginSuccess }) => {
    const [identifier, setIdentifier] = useState(''); // Can be username or email
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(''); // State for login error messages

    // Handles form submission for sign-in
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError(''); // Clear previous errors

        try {
            const response = await fetch(`${API_BASE_URL}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token); // Store JWT token
                localStorage.setItem('user', JSON.stringify(data.user)); // Store user info
                onLoginSuccess(); // Call the success handler from App.jsx
            } else {
                console.error('Login failed:', data.message);
                setLoginError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Network error during sign-in:', error);
            setLoginError('Network error. Please try again later.');
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-form-card">
                <h2>Sign into your account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="auth-input-group">
                        <label htmlFor="identifier">Username or Email</label>
                        <div className="auth-input-wrapper">
                            <User size={20} className="auth-icon" />
                            <input
                                type="text"
                                id="identifier"
                                className="auth-input"
                                placeholder="Username or Email"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-input-group">
                        <label htmlFor="password">Password</label>
                        <div className="auth-input-wrapper">
                            <Lock size={20} className="auth-icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="auth-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="auth-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                <span>{showPassword ? 'Hide' : 'Show'}</span>
                            </button>
                        </div>
                        {loginError && <p className="auth-helper-text text-red-500">{loginError}</p>}
                    </div>

                    <div className="auth-recaptcha-placeholder">
                        <label>
                            <input type="checkbox" required />
                            I'm not a robot
                        </label>
                        <img src="[https://www.gstatic.com/recaptcha/api2/logo_48.png](https://www.gstatic.com/recaptcha/api2/logo_48.png)" alt="reCAPTCHA" className="recaptcha-logo" />
                    </div>

                    <button type="submit" className="auth-submit-button">Sign Into account</button>
                </form>

                <p className="auth-switch-link">
                    Don't have an account? <a href="#" onClick={() => onNavigate('signup')}>Sign Up</a>
                </p>
            </div>
        </div>
    );
};

// SignUpPage component for user registration
const SignUpPage = ({ onNavigate }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signupError, setSignupError] = useState(''); // State for signup error messages
    const [signupSuccess, setSignupSuccess] = useState(''); // State for signup success message

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignupError(''); // Clear previous errors
        setSignupSuccess(''); // Clear previous success messages

        if (password !== confirmPassword) {
            setSignupError('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Sign-up successful:', data);
                setSignupSuccess('Registration successful! Please sign in.');
                // Optionally, redirect to sign-in page after a short delay
                setTimeout(() => onNavigate('signin'), 2000);
            } else {
                console.error('Sign-up failed:', data.message);
                setSignupError(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Network error during sign-up:', error);
            setSignupError('Network error. Please try again later.');
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-form-card signup-form-card">
                <h2>Create an account</h2>
                <p className="auth-switch-link-top">
                    Already have an account? <a href="#" onClick={() => onNavigate('signin')}>Log In</a>
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="auth-input-group">
                        <label htmlFor="username">Username</label>
                        <div className="auth-input-wrapper">
                            <User size={20} className="auth-icon" />
                            <input
                                type="text"
                                id="username"
                                className="auth-input"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-input-group">
                        <label htmlFor="email">Email address</label>
                        <div className="auth-input-wrapper">
                            <Mail size={20} className="auth-icon" />
                            <input
                                type="email"
                                id="email"
                                className="auth-input"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-input-group">
                        <label htmlFor="password">Password</label>
                        <div className="auth-input-wrapper">
                            <Lock size={20} className="auth-icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="auth-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="auth-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                <span>{showPassword ? 'Hide' : 'Show'}</span>
                            </button>
                        </div>
                        <p className="auth-helper-text">Use 8 or more characters with a mix of letters, numbers & symbols</p>
                    </div>

                    <div className="auth-input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <div className="auth-input-wrapper">
                            <Lock size={20} className="auth-icon" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirm-password"
                                className="auth-input"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="auth-password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                <span>{showConfirmPassword ? 'Hide' : 'Show'}</span>
                            </button>
                        </div>
                        <p className="auth-helper-text">Use 8 or more characters with a mix of letters, numbers & symbols</p>
                    </div>

                    <p className="auth-terms-policy">
                        By creating an account, you agree to our <a href="#">Terms of use</a> and <a href="#" onClick={() => onNavigate('services')}>Privacy Policy</a>
                    </p>

                    <div className="auth-recaptcha-placeholder">
                        <label>
                            <input type="checkbox" required />
                            I'm not a robot
                        </label>
                        <img src="[https://www.gstatic.com/recaptcha/api2/logo_48.png](https://www.gstatic.com/recaptcha/api2/logo_48.png)" alt="reCAPTCHA" className="recaptcha-logo" />
                    </div>

                    <button type="submit" className="auth-submit-button">Create an account</button>
                </form>

                {signupError && <p className="auth-helper-text text-red-500">{signupError}</p>}
                {signupSuccess && <p className="auth-helper-text text-green-500">{signupSuccess}</p>}

                <p className="auth-switch-link">
                    Already have an account? <a href="#" onClick={() => onNavigate('signin')}>Sign In</a>
                </p>
            </div>
        </div>
    );
};

export { SignInPage, SignUpPage };
