import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "../../utilities.css";

const ImageEdit = () => {
    const location = useLocation();
    const [imageData, setImageData] = useState(null);
    const [imageName, setImageName] = useState("");
    const [clothingType, setClothingType] = useState("top");

    useEffect(() => {
        if (location.state?.imageData) {
            setImageData(location.state.imageData);
            // Set default name based on original filename
            const defaultName = location.state.imageData.name.split('.')[0];
            setImageName(defaultName);
        }
    }, [location.state]);

    const handleSubmit = async () => {
        if (!imageData || !imageName.trim()) {
            alert("Please provide both an image and a name for the clothing item.");
            return;
        }

        try {
            // Create FormData to send file and metadata
            const formData = new FormData();
            formData.append('image', imageData.file);
            formData.append('imageName', imageName);
            formData.append('clothingType', clothingType);

            console.log("Submitting:", {
                imageName,
                clothingType,
                fileName: imageData.file.name
            });

            const response = await fetch('/api/upload-clothing', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                alert(`✅ Success! Image processed and saved as: ${result.processedImage}`);
                console.log("Upload successful:", result);
            } else {
                alert(`❌ Error: ${result.error}`);
                console.error("Upload failed:", result);
            }
        } catch (error) {
            console.error("Error submitting:", error);
            alert("❌ Failed to submit. Please try again.");
        }
    };

    if (!imageData) {
        return (
            <div>
                <nav style={{ marginBottom: "20px" }}>
                    <Link to="/my-closet" style={{ textDecoration: "none", color: "#007bff" }}>
                        ← Back to My Closet
                    </Link>
                </nav>
                <h1>No Image Selected</h1>
                <p>Please go back to My Closet and upload an image first.</p>
            </div>
        );
    }

    return (
        <div>
            <nav style={{ marginBottom: "20px" }}>
                <Link to="/my-closet" style={{ textDecoration: "none", color: "#007bff" }}>
                    ← Back to My Closet
                </Link>
            </nav>

            <h1>Edit Your Clothes</h1>
            <p>Add details about your clothing item.</p>

            <div style={{
                display: 'flex',
                gap: '40px',
                marginTop: '30px',
                flexWrap: 'wrap'
            }}>
                {/* Image Preview */}
                <div style={{ flex: '0 0 300px' }}>
                    <h3>Image Preview</h3>
                    <img
                        src={imageData.url}
                        alt={imageData.name}
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            height: '300px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>

                {/* Form */}
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <h3>Clothing Details</h3>

                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="imageName" style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold'
                        }}>
                            Name:
                        </label>
                        <input
                            id="imageName"
                            type="text"
                            value={imageName}
                            onChange={(e) => setImageName(e.target.value)}
                            placeholder="Enter a name for this clothing item"
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label htmlFor="clothingType" style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold'
                        }}>
                            Type:
                        </label>
                        <select
                            id="clothingType"
                            value={clothingType}
                            onChange={(e) => setClothingType(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                fontSize: '16px',
                                backgroundColor: 'white',
                                boxSizing: 'border-box'
                            }}
                        >
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                        </select>
                    </div>

                    <button
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: "6px",
                            fontSize: "16px",
                            cursor: "pointer",
                            width: "100%"
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageEdit;
