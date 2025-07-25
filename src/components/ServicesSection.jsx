// src/components/ServicesSection.jsx
import React from 'react';
import { CheckCircle, Award, DollarSign, BarChart, BookOpen, Briefcase } from 'lucide-react';

const ServicesSection = ({ onNavigate }) => {
    const services = [
        { icon: <DollarSign size={32} />, title: "Tax Planning", description: "Strategic planning to optimize tax liabilities and maximize your financial efficiency." },
        { icon: <CheckCircle size={32} />, title: "Tax Compliance", description: "Ensuring your tax filings are accurate, complete, and submitted on time." },
        { icon: <Award size={32} />, title: "International Taxation", description: "Expert guidance on cross-border transactions and global tax obligations." },
        { icon: <BookOpen size={32} />, title: "Estate Planning", description: "Securing your legacy with efficient estate and inheritance tax planning." },
        { icon: <BarChart size={32} />, title: "Audit Defense", description: "Professional representation and support during tax audits and inquiries." },
        { icon: <Briefcase size={32} />, title: "Business Advisory", description: "Comprehensive advice on business structures and financial decisions." },
    ];

    const handleViewAllServicesClick = () => {
        if (onNavigate) {
            onNavigate('services');
        }
    };

    return (
        <section className="services-section">
            {/* New div to contain and center the content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <span className="services-tag">Our Services</span>
                <h2>Strategic Tax Solutions for <br /><span>Financial Success</span></h2>
                <p className="services-intro">We provide a wide range of tax services designed to address the unique challenges faced by individuals and businesses.</p>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
                <button
                    className="view-all-services-button"
                    onClick={handleViewAllServicesClick}
                >
                    View All Services
                </button>
            </div>
        </section>
    );
};

export default ServicesSection;