// src/components/PurchaseSummaryModal.jsx
import React from 'react';
import { X } from 'lucide-react';

const PurchaseSummaryModal = ({ isOpen, onClose, onBack }) => {
    if (!isOpen) return null;

    const handleCheckout = () => {
        console.log('Proceeding to checkout!');
        // Implement checkout logic here
        onClose(); // Close modal after checkout
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="purchase-summary-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>
                    <X size={24} />
                </button>
                <div className="purchase-summary-header">
                    <h2>Purchase Summary</h2>
                </div>
                <div className="summary-details">
                    <div className="summary-item">
                        <span>Plan Amount</span>
                        <span>599</span>
                    </div>
                    <div className="summary-item">
                        <span>Coupon Discount</span>
                        <span>00</span>
                    </div>
                    <div className="summary-item">
                        <span>GST</span>
                        <span>107.82</span>
                    </div>
                    <div className="summary-item">
                        <span>Total Price</span>
                        <span>706.82</span>
                    </div>
                </div>
                <div className="summary-actions">
                    <button type="button" className="summary-button back" onClick={onBack}>Back</button>
                    <button type="button" className="summary-button checkout" onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseSummaryModal;