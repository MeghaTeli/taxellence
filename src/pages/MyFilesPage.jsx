// src/pages/MyFilesPage.jsx
import React from 'react';
import { Plus } from 'lucide-react'; // Import the Plus icon

const MyFilesPage = () => {
    // Placeholder for file submission logic
    const handleFileUploadClick = () => {
        alert('File upload functionality not implemented yet!');
        // In a real application, this would open a file input dialog
        // or redirect to a file upload form.
    };

    return (
        <div className="my-files-page-container">
            <div className="my-files-content-wrapper">
                <p className="my-files-instruction">Click below to submit Documents</p>
                <div className="my-files-upload-box" onClick={handleFileUploadClick}>
                    <Plus size={64} className="my-files-plus-icon" />
                </div>
                <p className="my-files-empty-state">You have Not Submitted any Documents yet</p>
            </div>
        </div>
    );
};

export default MyFilesPage;