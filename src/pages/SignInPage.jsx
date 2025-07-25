// src/pages/AuthPages.jsx
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

// SignInPage component for user login
const SignInPage = ({ onNavigate, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Handles form submission for sign-in
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you'd send data to a backend for authentication
        console.log('Attempting sign-in with:', { username, password });

        // Simulate successful login
        // REMOVED: alert('Simulated Sign In successful!'); // <--- REMOVE THIS LINE
        console.log('Simulated Sign In successful! Navigating to home.'); // Added for console debugging

        onLoginSuccess(); // Call the success handler from App.jsx
    };

    return (
        <div className="auth-page-container">
            <div className="auth-form-card">
                <h2>Sign into your account</h2>
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

                    <div className="auth-recaptcha-placeholder">
                        <label>
                            <input type="checkbox" required />
                            I'm not a robot
                        </label>
                        <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="recaptcha-logo" />
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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!'); // Keep this alert for password mismatch
            return;
        }
        console.log('Attempting sign-up with:', { name, email, password });
        // Simulate successful sign-up, then redirect to sign-in page
        // REMOVED: alert('Simulated Sign Up successful! Please sign in.'); // <--- REMOVE THIS LINE
        console.log('Simulated Sign Up successful! Navigating to sign in.'); // Added for console debugging

        onNavigate('signin'); // Redirect to sign-in page after simulated sign-up
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
                        <label htmlFor="name">Name</label>
                        <div className="auth-input-wrapper">
                            <User size={20} className="auth-icon" />
                            <input
                                type="text"
                                id="name"
                                className="auth-input"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                        By creating an account, you agree to our <a href="#">Terms of use</a> and <a href="#" onClick={() => onNavigate('privacy-policy')}>Privacy Policy</a>
                    </p>

                    <div className="auth-recaptcha-placeholder">
                        <label>
                            <input type="checkbox" required />
                            I'm not a robot
                        </label>
                        <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="recaptcha-logo" />
                    </div>

                    <button type="submit" className="auth-submit-button">Create an account</button>
                </form>

                <p className="auth-switch-link">
                    Already have an account? <a href="#" onClick={() => onNavigate('signin')}>Sign In</a>
                </p>
            </div>
        </div>
    );
};

export { SignInPage, SignUpPage };