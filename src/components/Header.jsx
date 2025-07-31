// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { User, LogOut, FileText, Menu, X } from 'lucide-react';

// Added currentUsername prop
const Header = ({ onNavigate, isLoggedIn, onLogout, currentUsername }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [headerSolid, setHeaderSolid] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setHeaderSolid(true);
            } else {
                setHeaderSolid(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    const handleMenuItemClick = (page) => {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
        if (page === 'logout') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            onLogout();
        } else {
            onNavigate(page);
        }
    };

    return (
        <header className={`header ${headerSolid ? 'solid-bg' : ''}`}>
            <div className="header-content">
                <div className="logo">Taxellence</div>

                {/* Desktop Navigation */}
                <nav className="nav">
                    <a href="#" className="nav-link" onClick={() => handleMenuItemClick('home')}>Home</a>
                    <a href="#" className="nav-link" onClick={() => handleMenuItemClick('about')}>About</a>
                    <a href="#" className="nav-link" onClick={() => handleMenuItemClick('services')}>Services</a>
                    <a href="#" className="nav-link" onClick={() => handleMenuItemClick('contact')}>Contact</a>
                </nav>

                {/* Desktop Sign-in / Account */}
                {isLoggedIn ? (
                    <div className="account-menu-container"> {/* Reusing existing container */}
                        <button className="account-icon-button" onClick={toggleDropdown}>
                            <User size={24} />
                            {/* Removed username display from here */}
                        </button>
                        {isDropdownOpen && (
                            <div className="account-dropdown-menu">
                                {/* Display username at the top of the dropdown */}
                                {currentUsername && (
                                    <div className="dropdown-username-display">
                                        Hello, {currentUsername}
                                    </div>
                                )}
                                <button className="dropdown-item" onClick={() => handleMenuItemClick('my-files')}>
                                    <FileText size={18} /> My Files
                                </button>
                                <button className="dropdown-item" onClick={() => handleMenuItemClick('logout')}>
                                    <LogOut size={18} /> Log Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        className="sign-in-button"
                        onClick={() => handleMenuItemClick('signin')}
                    >
                        <User size={18} /> Sign In
                    </button>
                )}

                {/* Mobile Menu Button (Hamburger/X) */}
                {!isMobileMenuOpen && (
                    <button className="mobile-menu-button" onClick={toggleMobileMenu}>
                        <Menu size={32} />
                    </button>
                )}
            </div>

            {/* Mobile Navigation Overlay */}
            <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></div>

            {/* Mobile Navigation Menu */}
            <nav className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={toggleMobileMenu}>
                    <X size={32} />
                </button>
                <a href="#" className="nav-link" onClick={() => handleMenuItemClick('home')}>Home</a>
                <a href="#" className="nav-link" onClick={() => handleMenuItemClick('about')}>About</a>
                <a href="#" className="nav-link" onClick={() => handleMenuItemClick('services')}>Services</a>
                <a href="#" className="nav-link" onClick={() => handleMenuItemClick('contact')}>Contact</a>

                <div className="mobile-auth-buttons">
                    {isLoggedIn ? (
                        <>
                            {/* Display username in mobile menu as well (already there) */}
                            {currentUsername && <span className="text-light text-lg font-semibold mb-2 block">Hello, {currentUsername}</span>}
                            <button className="account-icon-button" onClick={() => handleMenuItemClick('my-files')}>
                                <FileText size={18} /> My Files
                            </button>
                            <button className="sign-in-button" onClick={() => handleMenuItemClick('logout')}>
                                <LogOut size={18} /> Log Out
                            </button>
                        </>
                    ) : (
                        <button className="sign-in-button" onClick={() => handleMenuItemClick('signin')}>
                            <User size={18} /> Sign In
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
