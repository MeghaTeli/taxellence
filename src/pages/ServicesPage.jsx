// src/pages/ServicesPage.jsx
import React from 'react';
// Import new icons needed for "Why Choose Us" section
import { CheckCircle, DollarSign, BarChart, BookOpen, Briefcase, Globe, Lightbulb, ShieldCheck, Users, Target } from 'lucide-react';

const servicesData = [
    { icon: <DollarSign size={32} />, title: "Tax Planning", description: "Strategic planning to optimize tax liabilities and maximize your financial potential. We help individuals and businesses navigate complex tax codes to minimize their burden." },
    { icon: <CheckCircle size={32} />, title: "Tax Compliance", description: "Ensuring accurate, complete, and timely tax filings. Our experts keep you compliant with all local, national, and international tax laws." },
    { icon: <Globe size={32} />, title: "International Taxation", description: "Expertise in cross-border tax implications and global compliance. We assist multi-national corporations and individuals with international income streams." },
    { icon: <BookOpen size={32} />, title: "Estate Planning", description: "Securing your legacy with efficient estate and succession planning. We help you protect your assets and ensure a smooth transfer to future generations." },
    { icon: <BarChart size={32} />, title: "Audit Defense", description: "Professional representation and support during tax audits and inquiries. Our team provides robust defense and guidance throughout the audit process." },
    { icon: <Briefcase size={32} />, title: "Business Advisory", description: "Comprehensive advice on business structure, growth, and financial management. From startups to established enterprises, we offer tailored financial strategies." },
    { icon: <DollarSign size={32} />, title: "Corporate Taxation", description: "Specialized tax services for corporations, ensuring compliance and optimizing tax strategies for business growth and profitability." },
    { icon: <CheckCircle size={32} />, title: "Non-profit Taxation", description: "Expert guidance for non-profit organizations on tax-exempt status, compliance, and financial reporting requirements." },
    { icon: <Globe size={32} />, title: "Financial Planning", description: "Holistic financial planning services including investment strategies, retirement planning, and wealth management to achieve long-term goals." },
    { icon: <BookOpen size={32} />, title: "Tax Resolution", description: "Assisting clients with resolving complex tax issues, back taxes, penalties, and disputes with tax authorities, providing peace of mind." },
];

const whyChooseUsData = [
    { icon: <Lightbulb size={40} />, title: "Client-Centric Approach", description: "We prioritize your unique needs, offering personalized solutions and proactive advice to achieve your financial goals effectively." },
    { icon: <ShieldCheck size={40} />, title: "Expertise & Experience", description: "Our team comprises seasoned tax and financial experts with extensive experience navigating complex regulations and markets." },
    { icon: <Users size={40} />, title: "Holistic Solutions", description: "Beyond tax, we provide comprehensive financial planning, wealth management, and strategic business advisory services." },
    { icon: <Target size={40} />, title: "Proven Results", description: "Our track record speaks for itself. We are committed to delivering measurable financial benefits and peace of mind to our clients." },
];

const ServicesPage = () => {
    return (
        <div className="services-page-container">
            {/* Services Page Hero Section */}
            <div className="services-page-hero">
                <h1>Strategic Tax Solutions for Financial Success</h1>
                <p>We provide a wide range of tax services designed to address the unique challenges<br/>faced by individuals and businesses.</p>
            </div>

            {/* Services Grid Section */}
            <section className="services-section-grid">
                <div className="services-content-wrapper">
                    <div className="services-grid">
                        {servicesData.map((service, index) => (
                            <div key={index} className="service-card">
                                <div className="service-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How We Work Section */}
            <section className="how-we-work-section">
                <div className="how-we-work-content-wrapper">
                    <h2>How We Work</h2>
                    <p className="work-intro-text">We follow a proven methodology to ensure excellent, lasting results for every client, every time.</p>
                    <div className="work-steps-grid">
                        <div className="work-step-item">
                            <h3 data-step="01">Discovery</h3>
                            <p>We begin by understanding your current financial situation, goals, and challenges through an in-depth consultation.</p>
                        </div>
                        <div className="work-step-item">
                            <h3 data-step="02">Analysis</h3>
                            <p>Our team carefully reviews your financial data, identifying opportunities and potential issues that need to be addressed.</p>
                        </div>
                        <div className="work-step-item">
                            <h3 data-step="03">Strategy Development</h3>
                            <p>We develop a customized strategy tailored to your specific needs and objectives.</p>
                        </div>
                        <div className="work-step-item">
                            <h3 data-step="04">Implementation</h3>
                            <p>We put your personalized financial strategy into action, handling all necessary filings and documentation.</p>
                        < /div>
                        <div className="work-step-item">
                            <h3 data-step="05">Ongoing Support</h3>
                            <p>We provide ongoing advice and adjustments as your circumstances change or tax laws evolve.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose-us-section">
                <div className="why-choose-us-content-wrapper">
                    <h2>Why Choose Us?</h2>
                    <p className="why-choose-us-intro">Discover the core principles that set Taxellence apart and ensure your financial success.</p>
                    <div className="why-choose-us-grid">
                        {whyChooseUsData.map((item, index) => (
                            <div key={index} className="why-choose-us-item">
                                <div className="why-choose-us-icon">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW: Privacy Policy Section (now part of ServicesPage) */}
            <section className="privacy-policy-section">
                <div className="privacy-policy-content-wrapper-in-services"> {/* Renamed wrapper to avoid global conflict */}
                    <h1>Privacy Policy</h1> {/* Changed from h1 to h2 or similar if nested */}

                    <p>Your privacy is of utmost importance to us. When you access our website, your IP address may be logged along with the date and time of your visit. This data is used exclusively to identify usage trends, manage the website, monitor user navigation, and collect general demographic insights for internal purposes such as statistical analysis and enhancing the website's performance. Importantly, any IP addresses recorded are not associated with personally identifiable data.</p>

                    <p>We may also collect additional information, which is standard practice across most websites. For example, we can generally identify the referral source that directed you to our site. Likewise, we may track how long you stay on our site and the next destination you visit after leaving. Other routinely collected data includes your computer's operating system and the web browser you're using. These practices are typical and serve to create a better, more tailored user experience.</p>

                    <p>Please assume that our website utilizes cookies. You have the option to modify your browser settings to disable cookies or receive alerts when cookies are being used, allowing you to decide how to proceed. Be aware, however, that disabling cookies may impair the functionality of certain features and may limit your ability to fully interact with the website.</p>

                    <p>While interacting with this website, our mobile applications, proprietary extensions, or when using our products and services through online or offline channels including but not limited to bank branches, authorized sales points, third-party platforms, or through any form of communication (electronic or otherwise), or via any current or future method or platform introduced by us (collectively referred to as the "Services"), Taxellence may collect, obtain, store, utilize, manage, process, transfer, and retain your personal data ("Customer Information"). By using or accessing our Services, you acknowledge that you have read, understood, and agreed to be bound by this Privacy Policy and you consent to the collection, storage, usage, processing, transfer, and retention of your Customer Information by Taxellence as outlined herein.</p>

                    <h3>Handling of Personal Information</h3>
                    <p>The core purpose of collecting personal and sensitive information from you is to support the operations of our business and serve you more efficiently. This data is used internally to improve our services and interactions with you. We do not disclose or distribute your personal data to third parties or external entities unless you have explicitly given us consent to do so.</p>

                    <h3>Change Notice</h3>
                    <p>As with all administrative and legal notice pages, the contents of this Privacy Policy are subject to updates and modifications over time. Therefore, the information presented here may differ during subsequent visits. These updates are essential for ensuring your protection and the security of our website. If this information is of importance to you, we recommend reviewing this page periodically, as we will not provide prior or subsequent notice of any modifications made.</p>

                    <h3>Questions / Comments / Concerns</h3>
                    <p>If you have any inquiries about the content of this policy or wish to contact us for any other purpose, please feel free to do so using the contact details provided on our website.</p>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;