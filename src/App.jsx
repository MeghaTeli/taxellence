// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import PurchaseSummaryModal from './components/PurchaseSummaryModal';
import ServicesPage from './pages/ServicesPage';
import { SignInPage, SignUpPage } from './pages/SignInPage.jsx';
import MyFilesPage from './pages/MyFilesPage';

const App = () => {
    const [showConsultationModal, setShowConsultationModal] = useState(false);
    const [showPurchaseSummaryModal, setShowPurchaseSummaryModal] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUsername, setCurrentUsername] = useState(''); // New state for username

    // Check for existing token and user info on app load
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userJson = localStorage.getItem('user');
        if (token && userJson) {
            try {
                const user = JSON.parse(userJson);
                setIsLoggedIn(true);
                setCurrentUsername(user.username); // Set username from localStorage
            } catch (e) {
                console.error("Failed to parse user data from localStorage", e);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setIsLoggedIn(false);
                setCurrentUsername('');
            }
        }
    }, []);

    const handleScheduleConsultationClick = () => {
        console.log("DEBUG: 'Schedule Consultation' button clicked. Attempting to open modal.");
        setShowConsultationModal(true);
    };

    const handleCloseConsultationModal = () => {
        console.log("DEBUG: Closing Consultation Modal.");
        setShowConsultationModal(false);
    };

    const handleNextFromConsultation = () => {
        console.log("DEBUG: 'Next' button clicked in Consultation Modal. Attempting to open Purchase Summary Modal.");
        setShowConsultationModal(false);
        setShowPurchaseSummaryModal(true);
    };

    const handleClosePurchaseSummaryModal = () => {
        console.log("DEBUG: Closing Purchase Summary Modal.");
        setShowPurchaseSummaryModal(false);
    };

    const handleBackFromSummary = () => {
        console.log("DEBUG: Navigating back from Purchase Summary to Consultation.");
        setShowPurchaseSummaryModal(false);
        setShowConsultationModal(true);
    };

    const handleNavigate = (page) => {
        console.log(`DEBUG: Navigating to page: ${page}`);
        setCurrentPage(page);
        setShowConsultationModal(false);
        setShowPurchaseSummaryModal(false);
        window.scrollTo(0, 0);
    };

    const handleLoginSuccess = () => {
        console.log("DEBUG: Login successful. Setting isLoggedIn to true.");
        setIsLoggedIn(true);
        const userJson = localStorage.getItem('user');
        if (userJson) {
            try {
                const user = JSON.parse(userJson);
                setCurrentUsername(user.username); // Set username after successful login
            } catch (e) {
                console.error("Failed to parse user data after login", e);
            }
        }
        handleNavigate('home');
    };

    const handleLogout = () => {
        console.log("DEBUG: Logging out. Setting isLoggedIn to false.");
        setIsLoggedIn(false);
        setCurrentUsername(''); // Clear username on logout
        localStorage.removeItem('token'); // Ensure token is removed
        localStorage.removeItem('user');   // Ensure user data is removed
        handleNavigate('home');
    };

    return (
        <div className="app-container">
            {/* Pass currentUsername to Header */}
            <Header onNavigate={handleNavigate} isLoggedIn={isLoggedIn} onLogout={handleLogout} currentUsername={currentUsername} />

            {currentPage === 'home' && (
                <>
                    <HeroSection
                        onScheduleConsultationClick={handleScheduleConsultationClick}
                        onNavigate={handleNavigate}
                    />
                    <ServicesSection onNavigate={handleNavigate} />
                    <AboutSection />
                    <TestimonialsSection />
                </>
            )}

            {currentPage === 'services' && (
                <ServicesPage />
            )}

            {currentPage === 'signin' && (
                <SignInPage onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />
            )}

            {currentPage === 'signup' && (
                <SignUpPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'my-files' && (
                <MyFilesPage />
            )}

            <Footer onNavigate={handleNavigate} />

            {/* Modals remain globally available */}
            <ConsultationModal
                isOpen={showConsultationModal}
                onClose={handleCloseConsultationModal}
                onNext={handleNextFromConsultation}
            />
            <PurchaseSummaryModal
                isOpen={showPurchaseSummaryModal}
                onClose={handleClosePurchaseSummaryModal}
                onBack={handleBackFromSummary}
            />
        </div>
    );
};

export default App;
