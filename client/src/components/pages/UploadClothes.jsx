import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../../utilities.css";
import "./UploadClothes.css";
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
            <div className="upload-clothes-container">
                <BackButton destination="/my-closet" label="Back to My Closet" />
                <div className="no-image-container">
                    <h1 className="no-image-title">No Image Selected</h1>
                    <p className="no-image-message">Please go back to My Closet and upload an image first.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="upload-clothes-container">
            <BackButton destination="/my-closet" label="Back to My Closet" />

            <div className="upload-clothes-header">
                <h1 className="upload-clothes-title">Upload Your Clothes</h1>
                <p className="upload-clothes-subtitle">Add details about your clothing item.</p>
            </div>

            <div className="upload-clothes-content">
                {/* Image Preview */}
                <div className="image-preview-section">
                    <h3 className="image-preview-title">Image Preview</h3>
                    <div className="image-preview-container">
                        <img
                            src={imageData.url}
                            alt={imageData.name}
                            className="image-preview"
                        />
                    </div>
                </div>

                {/* Form */}
                <div className="form-section">
                    <h3 className="form-title">Clothing Details</h3>

                    <div className="form-group">
                        <label htmlFor="clothingType" className="form-label">
                            Type:
                        </label>
                        <select
                            id="clothingType"
                            value={clothingType}
                            onChange={(e) => setClothingType(e.target.value)}
                            className="form-select"
                        >
                            <option value="tops">Top</option>
                            <option value="bottoms">Bottom</option>
                            <option value="heads">Headwear</option>
                            <option value="shoes">Shoes</option>
                        </select>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="submit-button"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageEdit;