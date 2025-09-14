import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../../utilities.css";
import BackButton from "../BackButton";

const ImageEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [imageData, setImageData] = useState(null);
    const [clothingType, setClothingType] = useState("tops");

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (location.state?.imageData) {
            setImageData(location.state.imageData);
            const defaultName = location.state.imageData.name.split('.')[0];
        }
    }, [location.state]);

    const handleSubmit = async () => {
        if (!imageData) {
            alert("Please provide an image.");
            return;
        }

        try {
            const formData = new FormData();
            if (!imageData.file) {
                console.error("No file found in imageData:", imageData);
                alert("No file to upload. Please re-upload the image.");
                return;
            }
            formData.append('image', imageData.file);
            formData.append('clothingType', clothingType);

            console.log("Submitting:", {
                clothingType,
                fileName: imageData.file.name
            });

            const response = await fetch('/api/upload-clothing', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                const errorText = await response.text();  // Read the raw error text
                console.error("Server responded with error:", errorText);
                alert(`Upload failed: ${errorText || 'Unknown error'}`);
                return;
            }

            // const result = await response.json();

            let result;
            try {
                result = await response.json();
            } catch (jsonError) {
                console.error("Error parsing JSON:", jsonError);
                const errorText = await response.text();  // Fallback to getting raw text if JSON parsing fails
                console.error("Raw response body:", errorText);
                alert("Something went wrong with the response. Please try again.");
                return;
            }

            if (response.ok) {
                alert(`Success! Image processed and saved!`);
                console.log("Upload successful:", result);
                navigate("/my-closet");
            } else {
                alert(`Error: ${result.error}`);
                console.error("Upload failed:", result);
            }
        } catch (error) {
            console.error("Error submitting:", error);
            alert("Failed to submit. Please try again.");
        }
    };

    if (!imageData) {
        return (
            <div style={{ padding: "40px 60px" }}>
                <BackButton destination="/my-closet" label="Back to My Closet" />
                <h1 style={{ marginTop: "20px", marginBottom: "10px" }}>No Image Selected</h1>
                <p>Please go back to My Closet and upload an image first.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "40px 60px" }}>
            <BackButton destination="/my-closet" label="Back to My Closet" />

            <h1 style={{ marginTop: "20px", marginBottom: "10px" }}>Upload Your Clothes</h1>
            <p style={{ marginBottom: "20px" }}>Add details about your clothing item.</p>

            <div style={{
                display: 'flex',
                gap: '40px',
                marginTop: '20px',
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

                    {/* <div style={{ marginBottom: '20px' }}>
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
                    </div> */}

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

                            <option value="tops">Top</option>
                            <option value="bottoms">Bottom</option>
                            <option value="heads">Headwear</option>
                            <option value="shoes">Shoes</option>
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
