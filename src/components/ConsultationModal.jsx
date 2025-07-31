// src/components/ConsultationModal.jsx
import React, { useState, useEffect } from 'react';
import { User, Mail, Smartphone, Calendar, X } from 'lucide-react';
import DatePicker from 'react-datepicker'; // Import react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Ensure CSS is imported (can also be in main.jsx)

// Define the base URL for your backend API
const API_BASE_URL = 'http://localhost:5000/api'; // IMPORTANT: Adjust if your backend is on a different URL

const ConsultationModal = ({ isOpen, onClose, onNext }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsappNo, setWhatsappNo] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); // Use Date object for DatePicker
    const [consultationError, setConsultationError] = useState('');
    const [consultationSuccess, setConsultationSuccess] = useState('');
    const [bookedDates, setBookedDates] = useState([]); // State to store booked dates as Date objects

    // Fetch booked dates when the modal opens
    useEffect(() => {
        if (isOpen) {
            const fetchBookedDates = async () => {
                try {
                    const response = await fetch(`${API_BASE_URL}/consultations/booked-dates`);
                    const data = await response.json();
                    if (response.ok) {
                        // Convert received date strings to Date objects for react-datepicker
                        setBookedDates(data.map(dateStr => new Date(dateStr)));
                    } else {
                        console.error('Failed to fetch booked dates:', data.message);
                        setConsultationError('Failed to load available dates.');
                    }
                } catch (error) {
                    console.error('Network error fetching booked dates:', error);
                    setConsultationError('Network error. Could not load available dates.');
                }
            };
            fetchBookedDates();
        } else {
            // Reset state when modal closes
            setName('');
            setEmail('');
            setWhatsappNo('');
            setSelectedDate(null);
            setConsultationError('');
            setConsultationSuccess('');
            setBookedDates([]);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setConsultationError('');
        setConsultationSuccess('');

        const token = localStorage.getItem('token');
        if (!token) {
            setConsultationError('You must be logged in to schedule a consultation.');
            return;
        }

        if (!selectedDate) {
            setConsultationError('Please select a date and time for the consultation.');
            return;
        }

        // Format the Date object to ISO string for backend (e.g., "2025-07-21T10:30:00")
        const scheduledDatetimeISO = selectedDate.toISOString().slice(0, 19).replace('T', ' '); // Format for MySQL DATETIME

        // Client-side check for already booked dates (exact match including time)
        // Convert selectedDate to a comparable string format (e.g., "YYYY-MM-DDTHH:mm")
        const selectedDateFormatted = selectedDate.toISOString().slice(0, 16); // "2025-07-21T10:30"
        const isBookedClientSide = bookedDates.some(
            bookedDate => bookedDate.toISOString().slice(0, 16) === selectedDateFormatted
        );

        if (isBookedClientSide) {
            setConsultationError('This exact date and time slot is already booked. Please choose another one.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/consultations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Send JWT token
                },
                body: JSON.stringify({
                    name,
                    email,
                    whatsapp_no: whatsappNo,
                    scheduled_datetime: scheduledDatetimeISO // Send formatted date
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Consultation scheduled successfully:', data);
                setConsultationSuccess('Consultation scheduled successfully!');
                // Add the newly booked date to the local state to immediately mark it
                setBookedDates(prevDates => [...prevDates, selectedDate]);
                // Reset form fields
                setName('');
                setEmail('');
                setWhatsappNo('');
                setSelectedDate(null); // Clear selected date
                // Proceed to next modal after a short delay
                setTimeout(() => {
                    onClose(); // Close current modal
                    onNext();  // Open next modal (Purchase Summary)
                }, 1500);
            } else {
                console.error('Consultation scheduling failed:', data.message);
                setConsultationError(data.message || 'Failed to schedule consultation. Please try again.');
            }
        } catch (error) {
            console.error('Network error during consultation scheduling:', error);
            setConsultationError('Network error. Please try again later.');
        }
    };

    // Filter function to disable already booked dates
    const isDateTimeDisabled = (date) => {
        // Check if the date (including time) matches any booked date
        const dateToCompare = date.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
        return bookedDates.some(bookedDate =>
            bookedDate.toISOString().slice(0, 16) === dateToCompare
        );
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                            <input
                                type="text"
                                className="modal-input"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="modal-form-group">
                        <div className="modal-input-wrapper">
                            <Mail size={20} />
                            <input
                                type="email"
                                className="modal-input"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="modal-form-group">
                        <div className="modal-input-wrapper">
                            <Smartphone size={20} />
                            <input
                                type="tel"
                                className="modal-input"
                                placeholder="WhatsApp No."
                                value={whatsappNo}
                                onChange={(e) => setWhatsappNo(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="modal-form-group">
                        <div className="modal-input-wrapper">
                            <Calendar size={20} />
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => {
                                    setSelectedDate(date);
                                    setConsultationError(''); // Clear error when date changes
                                }}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30} // Allow 30-minute intervals
                                dateFormat="MMMM d, yyyy h:mm aa"
                                minDate={new Date()} // Prevent selecting past dates
                                excludeDates={bookedDates} // Visually mark and prevent selection of these dates
                                filterDate={(date) => {
                                    // Optionally, prevent selecting dates in the past (day-wise)
                                    return date >= new Date().setHours(0, 0, 0, 0);
                                }}
                                placeholderText="Select Date & Time"
                                className="modal-input" // Apply existing input styles
                                required
                                // Custom class for disabled dates (will be styled in index.css)
                                dayClassName={(date) =>
                                    bookedDates.some(booked =>
                                        booked.toDateString() === date.toDateString() &&
                                        booked.getHours() === date.getHours() &&
                                        booked.getMinutes() === date.getMinutes()
                                    ) ? 'booked-date' : undefined
                                }
                            />
                        </div>
                        {/* Display message if selected date is booked (redundant with excludeDates but good for clarity) */}
                        {selectedDate && isDateTimeDisabled(selectedDate) && (
                            <p className="text-red-500 text-sm mt-1">This slot is already booked. Please choose another.</p>
                        )}
                    </div>
                    {consultationError && <p className="text-red-500 text-center">{consultationError}</p>}
                    {consultationSuccess && <p className="text-green-500 text-center">{consultationSuccess}</p>}
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
