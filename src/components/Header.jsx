// src/components/Header.jsx
import React, { useState } from 'react';
import { User, LogOut, FileText, Menu, X } from 'lucide-react'; // Import Menu and X icons

const Header = ({ onNavigate, isLoggedIn, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
    };

    const handleMenuItemClick = (page) => {
        setIsMobileMenuOpen(false); // Close mobile menu
        setIsDropdownOpen(false); // Close desktop dropdown
        if (page === 'logout') {
            onLogout();
        } else {
            onNavigate(page);
        }
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo"></div>

                {/* Desktop Navigation */}
                {/* These will be hidden by CSS on mobile screens */}
                <nav className="nav">
                    <a href="#" className="nav-link" onClick={() => onNavigate('home')}>Home</a>
                    <a href="#" className="nav-link" onClick={() => onNavigate('about')}>About</a>
                    <a href="#" className="nav-link" onClick={() => onNavigate('services')}>Services</a>
                    <a href="#" className="nav-link" onClick={() => onNavigate('contact')}>Contact</a>
                </nav>

                {/* Desktop Sign-in / Account */}
                {/* These will be hidden by CSS on mobile screens */}
                {isLoggedIn ? (
                    <div className="account-menu-container">
                        <button className="account-icon-button" onClick={toggleDropdown}>
                            <User size={24} />
                        </button>
                        {isDropdownOpen && (
                            <div className="account-dropdown-menu">
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
                        onClick={() => onNavigate('signin')}
                    >
                        <User size={18} />
                    </button>
                )}

                {/* Mobile Menu Button (Hamburger/X) */}
                {/* This button shows a hamburger when menu is closed, and nothing when menu is open */}
                {!isMobileMenuOpen && ( // Only render if mobile menu is NOT open
                    <button className="mobile-menu-button" onClick={toggleMobileMenu}>
                        <Menu size={32} />
                    </button>
                )}
                {/* If you prefer to have the X button always visible in the same spot,
                    but only functional as a toggle, you'd keep the ternary.
                    But based on the "two X" problem, hiding it when the menu is open is better.
                    If you still want the X to appear in the top right of the *header* when the menu is open,
                    you'd need to adjust its positioning. The current setup implies the X is *inside* the sliding menu.
                */}


            </div>

            {/* Mobile Navigation Overlay */}
            <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></div>

            {/* Mobile Navigation Menu */}
            <nav className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <button className="close-button" onClick={toggleMobileMenu}>
                    <X size={32} /> {/* This is the only X visible when the menu is open */}
                </button>
                <a href="#" className="nav-link" onClick={() => handleMenuItemClick('home')}>Home</a>
                <a href="#" className="nav-link" onClick={() => handleMenuItemClick('about')}>About</a>
                <a href="#" className="nav-link" onClick={() => handleMenuItemClick('services')}>Services</a>
                <a href="#" className="nav-link" onClick={() => handleMenuItemClick('contact')}>Contact</a>

                <div className="mobile-auth-buttons">
                    {isLoggedIn ? (
                        <>
                            {/* Make sure these buttons also call handleMenuItemClick to close the menu */}
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