// src/components/AboutSection.jsx
import React from 'react';
// Import the image like this:
import AboutUsImage from '../assets/images/hero-bg.jpeg'; // <--- ADD THIS LINE

const AboutSection = () => {
    return (
        <section className="about-section">
            {/* This div acts as the content wrapper, applying max-width, centering, and flex layout */}
            <div className="about-content-wrapper">
                <div className="about-image-container">
                    {/* Use the imported variable in the src attribute */}
                    <img src={AboutUsImage} alt="About Us Team" className="about-image" /> {/* <--- CHANGE THIS LINE */}
                </div>
                <div className="about-content">
                    <h2>About Us</h2>
                    <p>At Taxellence, we specialize in providing expert tax and financial consulting services tailored to meet the ever-evolving needs of our clients. Our comprehensive approach guides you through strategic tax planning, compliance, and wealth management, ensuring your financial well-being.</p>
                    <p>Our approach goes beyond numbers—we focus on building long-term relationships based on trust, transparency, and integrity. We are committed to helping our clients achieve their financial goals, ensuring every decision is made with their best interests at heart. With a team of experienced professionals, we deliver personalized solutions and proactive advice to help you navigate the complexities of tax laws and financial markets.</p>
                    <p>At Taxellence, trust, transparency, and excellence are at the core of everything we do. Let's build a stronger financial future together.</p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;