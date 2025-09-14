import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../utilities.css";
import "./MyCloset.css";
import ImageCarousel from "../ImageCarousel";

    const MyCloset = () => {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [clothingData, setClothingData] = useState({
        tops: [],
        bottoms: [],
        heads: [],
        shoes: []
      });


    useEffect(() => {
      const fetchClothes = async () => {
        try {
          const res = await fetch("/api/clothing-images");
          console.log("connie connie")
          const data = await res.json();
          console.log(data)
          setClothingData(data);
        } catch (err) {
          console.error("Failed to fetch clothing images", err);
        }
      };
    
      fetchClothes();
    }, []);
    

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
    console.log("CONNIEdjkfsdj", clothingData)

    return (
        <div className="my-closet-container">
            <div className="my-closet-header">
                <h1 className="my-closet-title">My Closet</h1>
                <p className="my-closet-subtitle">Manage your wardrobe and upload new clothes to your collection.</p>
            </div>

            {/* Action Cards */}
            <div className="my-closet-actions">
                <button
                    onClick={handleUploadClothes}
                    className="my-closet-action-btn upload"
                >
                    <div className="my-closet-btn-icon">📤</div>
                    <h3 className="my-closet-btn-title">Upload Clothes</h3>
                    <p className="my-closet-btn-desc">Add new items to your wardrobe collection</p>
                </button>

                <button
                    onClick={() => {
                        navigate("/all-clothes");
                    }}
                    className="my-closet-action-btn all-clothes"
                >
                    <div className="my-closet-btn-icon">👕</div>
                    <h3 className="my-closet-btn-title">All Clothes</h3>
                    <p className="my-closet-btn-desc">Browse your complete wardrobe gallery</p>
                </button>

                <button
                    onClick={() => {
                        // Scroll to "Your Clothes" section
                        const yourClothesSection = document.querySelector('[data-section="your-clothes"]');
                        if (yourClothesSection) {
                            yourClothesSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="my-closet-action-btn browse"
                >
                    <div className="my-closet-btn-icon">🔍</div>
                    <h3 className="my-closet-btn-title">Browse Collections</h3>
                    <p className="my-closet-btn-desc">Explore your organized clothing sections</p>
                </button>

                <button
                    onClick={() => {
                        navigate("/my-outfits");
                    }}
                    className="my-closet-action-btn outfits"
                >
                    <div className="my-closet-btn-icon">✨</div>
                    <h3 className="my-closet-btn-title">Find Outfits</h3>
                    <p className="my-closet-btn-desc">Discover and create amazing outfit combinations</p>
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

            <div className="my-closet-clothes-section" data-section="your-clothes">
                <h2 className="my-closet-clothes-title">Your Clothes</h2>

                {/* Tops Carousel */}
                <ImageCarousel
                    images={clothingData.tops}
                    title="Tops"
                    type="Top"
                />

                {/* Bottoms Carousel */}
                <ImageCarousel
                    images={clothingData.bottoms}
                    title="Bottoms"
                    type="Bottom"
                />

                {/* Heads Carousel */}
                <ImageCarousel
                    images={clothingData.heads}
                    title="Heads"
                    type="Head"
                />

                {/* Shoes Carousel */}
                <ImageCarousel
                    images={clothingData.shoes}
                    title="Shoes"
                    type="Shoe"
                />
            </div>
        </div>
    );
};

export default MyCloset;