// src/components/ConsultationModal.jsx
import React from 'react';
import { User, Mail, Smartphone, Calendar, X } from 'lucide-react';

const ConsultationModal = ({ isOpen, onClose, onNext }) => { // Added onNext prop
    if (!isOpen) return null; // Don't render if not open

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you'd validate the form data here
        console.log('Consultation form submitted, opening summary...');
        onClose(); // Close current modal
        onNext();  // Open next modal
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside from closing modal */}
                <button className="modal-close-button" onClick={onClose}>
                    <X size={24} />
                </button>
                <div className="modal-header">
                    <h2>Get Expert Tax Assistance</h2>
                    <p>Share Your Details</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-form-group">
                        <div className="modal-input-wrapper">
                            <User size={20} />
                            <input type="text" className="modal-input" placeholder="Name" required />
                        </div>
                    </div>
                    <div className="modal-form-group">
                        <div className="modal-input-wrapper">
                            <Mail size={20} />
                            <input type="email" className="modal-input" placeholder="Email" required />
                        </div>
                    </div>
                    <div className="modal-form-group">
                        <div className="modal-input-wrapper">
                            <Smartphone size={20} />
                            <input type="tel" className="modal-input" placeholder="WhatsApp No." required />
                        </div>
                    </div>
                    <div className="modal-form-group">
                        <div className="modal-input-wrapper">
                            <Calendar size={20} />
                            <input type="datetime-local" className="modal-input" placeholder="Expected Date & Time" required />
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="modal-button back" onClick={onClose}>Back</button>
                        <button type="submit" className="modal-button next">Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConsultationModal;
