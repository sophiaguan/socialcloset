import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../../utilities.css";

const MyCloset = () => {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // Hardcoded clothing data
    const clothingData = {
        "tops": [
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416546251603710063/image4.png?ex=68c73d00&is=68c5eb80&hm=163f059dd7afd26873f38f9c279395b5b0bc71719e7551ca7ebb550039ae9405",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416546220025053395/image5.png?ex=68c73cf9&is=68c5eb79&hm=b2c33e777793ede8d0f09f12b090f112ca5d8d0a21780069b30cfc682074f432",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416547830813950113/image6.png?ex=68c73e79&is=68c5ecf9&hm=fc98e3fddb68739158cb31f5d94a4784995e1cbd0ac0311b826c7654e72c7faa"
        ],
        "bottoms": [
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416547791685161111/image7.png?ex=68c73e6f&is=68c5ecef&hm=56905ef5fe13446a08d4a183c29ccb5582c17c0bdd82d996b053adff3f93223a",
            "https://cdn.discordapp.com/attachments/1416507297726730310/1416548050200957000/image8.png?ex=68c73ead&is=68c5ed2d&hm=de86fe12f4585cde9c67d95050fecc0aab934aaa5a909471c3159a303eaa3b87"
        ]
    };

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

                {/* Tops Section */}
                <div style={{ marginBottom: "40px" }}>
                    <h3 style={{ marginBottom: "20px", color: "#333" }}>Tops</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '20px'
                    }}>
                        {clothingData.tops.map((clothing, index) => (
                            <div key={`top-${index}`} style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '10px',
                                backgroundColor: '#f9f9f9',
                                textAlign: 'center'
                            }}>
                                <img
                                    src={clothing}
                                    alt={`Top ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        marginBottom: '10px'
                                    }}
                                />
                                <p style={{
                                    margin: '0',
                                    fontSize: '14px',
                                    color: '#666'
                                }}>
                                    Top {index + 1}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottoms Section */}
                <div>
                    <h3 style={{ marginBottom: "20px", color: "#333" }}>Bottoms</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '20px'
                    }}>
                        {clothingData.bottoms.map((clothing, index) => (
                            <div key={`bottom-${index}`} style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '10px',
                                backgroundColor: '#f9f9f9',
                                textAlign: 'center'
                            }}>
                                <img
                                    src={clothing}
                                    alt={`Bottom ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        marginBottom: '10px'
                                    }}
                                />
                                <p style={{
                                    margin: '0',
                                    fontSize: '14px',
                                    color: '#666'
                                }}>
                                    Bottom {index + 1}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCloset;
