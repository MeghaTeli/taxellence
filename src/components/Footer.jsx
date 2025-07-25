// src/components/Footer.jsx
import React from 'react';

// REMOVE: onNavigate prop is no longer needed here if only Privacy Policy link changed
const Footer = () => { // <--- REMOVE { onNavigate } from props
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <div className="logo">Taxellence</div>
                    <p>Strategic Tax Solutions for Financial Success. We provide expert advice to individuals and businesses.</p>
                </div>

                <div className="footer-column">
                    <h3>Quick Links</h3>
                    <ul>
                        {/* These links would need global state (like in App.jsx) or react-router-dom
                            to navigate. For now, they will just be #.
                            If you still want them to navigate, you'd need to re-add onNavigate to Footer.
                        */}
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Contact Info</h3>
                    <p><span>📍</span> 22nd Floor, World Trade Center,<br/>New York, NY 10007, USA</p>
                    <p><span>📞</span> +1 (123) 456-7890</p>
                    <p><span>✉️</span> info@taxellence.com</p>
                </div>

                <div className="footer-column">
                    <h3>Business Hours</h3>
                    <ul>
                        <li>Monday: 9 AM - 6 PM</li>
                        <li>Tuesday: 9 AM - 6 PM</li>
                        <li>Wednesday: 9 AM - 6 PM</li>
                        <li>Thursday: 9 AM - 6 PM</li>
                        <li>Friday: 9 AM - 5 PM</li>
                        <li>Saturday: Closed</li>
                        <li>Sunday: Closed</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                {/* Updated link to point to an ID on the Services Page */}
                <p>&copy; 2023 Taxellence. All rights reserved. | <a href="#privacy-policy-section-anchor">Privacy Policy</a></p> {/* <--- UPDATED LINK */}
            </div>
        </footer>
    );
};

export default Footer;