// src/components/HeroSection.jsx
import React from 'react';
import { Calendar, ArrowDown, CheckCircle, Lightbulb, Shield } from 'lucide-react';

const HeroSection = ({ onScheduleConsultationClick, onNavigate }) => {
    return (
        <section className="hero-section">
            <div className="hero-background-image"></div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <p className="tagline">Commit conservatively, deliver exceptionally</p>
                <h1>Strategic Tax Solutions <br />for <span>Financial Success</span></h1>
                <p>Expert tax consultancy to optimize your financial position, minimize liabilities, and ensure compliance while maximizing potential benefits.</p>
                <div className="hero-actions">
                    <button
                        className="schedule-button"
                        onClick={onScheduleConsultationClick}
                    >
                        <Calendar size={16} /> Schedule Consultation
                    </button>
                    <a href="#" className="services-link" onClick={() => onNavigate('services')}>Our Services</a>
                </div>
                <div className="hero-info-grid">
                    <div className="hero-info-item">
                        <CheckCircle size={18} /> Expert Advisors
                    </div>
                    <div className="hero-info-item">
                        <Lightbulb size={18} /> Tailored Solutions
                    </div>
                    <div className="hero-info-item">
                        <Shield size={18} /> Audit Protection
                    </div>
                </div>
            </div>
            <div className="personal-tax-strategy-card">
                <div className="card-image"></div>
                <h3>Personalised Tax Strategy</h3>
                <p>We create customized tax plans that align with your personal and business goals.</p>
            </div>
            <div className="scroll-down-indicator">
                <ArrowDown size={24} />
            </div>
        </section>
    );
};

export default HeroSection;