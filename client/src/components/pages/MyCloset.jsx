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
        <div style={{ padding: "40px 60px" }}>
            <h1 style={{ marginBottom: "10px" }}>My Closet</h1>
            <p style={{ marginBottom: "15px" }}>Manage your wardrobe and upload new clothes to your collection.</p>

            {/* Four Circle Buttons */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                marginTop: "30px",
                flexWrap: "wrap"
            }}>
                <button
                    onClick={handleUploadClothes}
                    style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#0056b3";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 6px 16px rgba(0, 123, 255, 0.4)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#007bff";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 4px 12px rgba(0, 123, 255, 0.3)";
                    }}
                >
                    Upload Clothes
                </button>

                <button
                    onClick={() => {
                        navigate("/all-clothes");
                    }}
                    style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#1e7e34";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 6px 16px rgba(40, 167, 69, 0.4)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#28a745";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 4px 12px rgba(40, 167, 69, 0.3)";
                    }}
                >
                    All Clothes
                </button>

                <button
                    onClick={() => {
                        // Scroll to "Your Clothes" section
                        const yourClothesSection = document.querySelector('[data-section="your-clothes"]');
                        if (yourClothesSection) {
                            yourClothesSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    style={{
                        backgroundColor: "#ffc107",
                        color: "#212529",
                        border: "none",
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 12px rgba(255, 193, 7, 0.3)"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#e0a800";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 6px 16px rgba(255, 193, 7, 0.4)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#ffc107";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 4px 12px rgba(255, 193, 7, 0.3)";
                    }}
                >
                    Browse Collections
                </button>

                <button
                    onClick={() => {
                        navigate("/my-outfits");
                    }}
                    style={{
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 12px rgba(220, 53, 69, 0.3)"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#c82333";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 6px 16px rgba(220, 53, 69, 0.4)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#dc3545";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 4px 12px rgba(220, 53, 69, 0.3)";
                    }}
                >
                    Find Outfits
                </button>
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            <div style={{ marginTop: "30px" }} data-section="your-clothes">
                <h2 style={{ marginBottom: "15px" }}>Your Clothes</h2>

                {/* Tops Section */}
                <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ marginBottom: "10px", color: "#333" }}>Tops</h3>
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
                    <h3 style={{ marginBottom: "10px", color: "#333" }}>Bottoms</h3>
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
