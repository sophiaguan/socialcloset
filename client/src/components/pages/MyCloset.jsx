import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../utilities.css";

const MyCloset = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleUploadClothes = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);

        files.forEach(file => {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const fileExtension = file.name.toLowerCase().split('.').pop();
            const allowedExtensions = ['jpg', 'jpeg', 'png'];

            if (allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension)) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageData = {
                        id: Date.now() + Math.random(),
                        name: file.name,
                        url: e.target.result,
                        file: file
                    };

                    // Navigate to edit page with image data
                    navigate('/edit-image', {
                        state: { imageData }
                    });
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select only JPG, JPEG, or PNG files.');
            }
        });

        event.target.value = '';
    };

    return (
        <div>
            <nav style={{ marginBottom: "20px" }}>
                <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
                    ← Back to Home
                </Link>
            </nav>

            <h1>My Closet</h1>
            <p>Manage your wardrobe and upload new clothes to your collection.</p>

            <button
                onClick={handleUploadClothes}
                style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "6px",
                    fontSize: "16px",
                    cursor: "pointer",
                    marginTop: "20px"
                }}
            >
                Upload Clothes
            </button>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            <div style={{ marginTop: "40px" }}>
                <h2>Your Clothes</h2>
                <p>Click "Upload Clothes" to add new items to your closet!</p>
            </div>
        </div>
    );
};

export default MyCloset;
