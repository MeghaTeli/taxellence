// src/pages/MyFilesPage.jsx
import React, { useState, useEffect } from 'react';
import { Plus, FileText, Download, XCircle } from 'lucide-react'; // Import necessary icons

// Define the base URL for your backend API
const API_BASE_URL = 'http://localhost:5000/api'; // IMPORTANT: Adjust if your backend is on a different URL

const MyFilesPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [userFiles, setUserFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = React.useRef(null);

    // Function to fetch user files
    const fetchUserFiles = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            setUploadMessage('Please log in to view your files.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/files`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setUserFiles(data);
                if (data.length === 0) {
                    setUploadMessage('You have not submitted any documents yet.');
                } else {
                    setUploadMessage(''); // Clear message if files are present
                }
            } else {
                console.error('Failed to fetch files:', data.message);
                setUploadMessage(data.message || 'Failed to load your documents.');
            }
        } catch (error) {
            console.error('Network error fetching files:', error);
            setUploadMessage('Network error. Could not load documents.');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch files on component mount
    useEffect(() => {
        fetchUserFiles();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setUploadMessage(''); // Clear any previous messages
        }
    };

    const handleFileUploadClick = () => {
        fileInputRef.current.click(); // Trigger the hidden file input
    };

    const handleUploadSubmit = async () => {
        if (!selectedFile) {
            setUploadMessage('Please select a file to upload.');
            return;
        }

        setIsLoading(true);
        setUploadMessage(''); // Clear previous messages

        const token = localStorage.getItem('token');
        if (!token) {
            setUploadMessage('You must be logged in to upload files.');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('document', selectedFile); // 'document' must match the field name in multer setup

        try {
            const response = await fetch(`${API_BASE_URL}/files/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` // Send JWT token
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setUploadMessage('File uploaded successfully!');
                setSelectedFile(null); // Clear selected file
                fileInputRef.current.value = ''; // Clear file input
                fetchUserFiles(); // Refresh the list of files
            } else {
                console.error('File upload failed:', data.message);
                setUploadMessage(data.message || 'File upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Network error during file upload:', error);
            setUploadMessage('Network error. Could not upload file.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="my-files-page-container">
            <div className="my-files-content-wrapper">
                <p className="my-files-instruction">Click below to submit Documents</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // Hide the actual input
                />
                <div className="my-files-upload-box" onClick={handleFileUploadClick}>
                    <Plus size={64} className="my-files-plus-icon" />
                </div>
                {selectedFile && (
                    <p className="my-files-selected-file">Selected: {selectedFile.name}
                        <button className="ml-2 text-red-500" onClick={() => {setSelectedFile(null); fileInputRef.current.value = ''; setUploadMessage('');}}>
                            <XCircle size={18} />
                        </button>
                    </p>
                )}
                <button
                    className="auth-submit-button mt-4" // Reusing auth-submit-button style
                    onClick={handleUploadSubmit}
                    disabled={!selectedFile || isLoading}
                >
                    {isLoading ? 'Uploading...' : 'Upload Document'}
                </button>

                {uploadMessage && <p className={`my-files-empty-state ${uploadMessage.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{uploadMessage}</p>}

                <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800">Your Submitted Documents</h3>
                {isLoading ? (
                    <p>Loading files...</p>
                ) : userFiles.length > 0 ? (
                    <div className="user-files-list mt-4">
                        {userFiles.map((file) => (
                            <div key={file.id} className="file-item flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2 shadow-sm">
                                <div className="flex items-center">
                                    <FileText size={20} className="text-primary-green mr-2" />
                                    <span className="text-gray-700">{file.fileName}</span>
                                </div>
                                <a
                                    href={file.fileUrl}
                                    target="_blank" // Open in new tab
                                    rel="noopener noreferrer"
                                    className="text-primary-green hover:text-dark-green transition-colors flex items-center"
                                    download={file.fileName} // Suggest download
                                >
                                    <Download size={20} className="mr-1" /> View/Download
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    !uploadMessage.includes('You have not submitted') && <p className="my-files-empty-state">No documents submitted yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyFilesPage;
