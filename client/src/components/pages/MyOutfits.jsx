import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import "./MyOutfits.css";

const MyOutfits = () => {
    const { userId } = useContext(UserContext);

    // State for clothing data
    const [clothingData, setClothingData] = useState({
        heads: [],
        tops: [],
        bottoms: [],
        shoes: []
    });

    // State for dropdown selection
    const [selectedCloset, setSelectedCloset] = useState("");

    // State for loading
    const [isLoading, setIsLoading] = useState(false);

    // State for user groups
    const [userGroups, setUserGroups] = useState([]);

    // State for carousel navigation
    const [currentHatIndex, setCurrentHatIndex] = useState(0);
    const [currentTopIndex, setCurrentTopIndex] = useState(0);
    const [currentBottomIndex, setCurrentBottomIndex] = useState(0);
    const [currentShoeIndex, setCurrentShoeIndex] = useState(0);

    // State for saved outfits
    const [savedOutfits, setSavedOutfits] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchUserGroups();
    }, []);

    // Fetch user's groups
    const fetchUserGroups = async () => {
        if (!userId) return;

        try {
            const response = await fetch("/api/usergroups");
            const data = await response.json();

            if (response.ok) {
                setUserGroups(data.groups || []);
            } else {
                console.error("Failed to fetch user groups:", data.error);
            }
        } catch (error) {
            console.error("Error fetching user groups:", error);
        }
    };

    // Fetch clothing data when user selects "My Closet"
    const fetchClothingData = async () => {
        if (!userId) return;

        setIsLoading(true);
        try {
            const response = await fetch("/api/clothing-images");
            const data = await response.json();

            if (response.ok) {
                setClothingData(data);
                // Reset carousel indices when new data is loaded
                setCurrentHatIndex(0);
                setCurrentTopIndex(0);
                setCurrentBottomIndex(0);
                setCurrentShoeIndex(0);
            } else {
                console.error("Failed to fetch clothing data:", data.error);
            }
        } catch (error) {
            console.error("Error fetching clothing data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle dropdown change
    const handleClosetChange = (e) => {
        const value = e.target.value;
        setSelectedCloset(value);

        if (value === "my-closet") {
            fetchClothingData();
        } else if (value.startsWith("group-")) {
            // Group selection - functionality not implemented yet
            console.log("Group selected:", value);
            // Clear clothing data for now
            setClothingData({
                heads: [],
                tops: [],
                bottoms: [],
                shoes: []
            });
        } else {
            // Clear clothing data when "Select Closet" is chosen
            setClothingData({
                heads: [],
                tops: [],
                bottoms: [],
                shoes: []
            });
        }
    };

    // Carousel navigation functions
    const nextHat = () => {
        if (clothingData.heads.length > 0) {
            setCurrentHatIndex((prev) => (prev + 1) % clothingData.heads.length);
        }
    };

    const prevHat = () => {
        if (clothingData.heads.length > 0) {
            setCurrentHatIndex((prev) => (prev - 1 + clothingData.heads.length) % clothingData.heads.length);
        }
    };

    const nextTop = () => {
        if (clothingData.tops.length > 0) {
            setCurrentTopIndex((prev) => (prev + 1) % clothingData.tops.length);
        }
    };

    const prevTop = () => {
        if (clothingData.tops.length > 0) {
            setCurrentTopIndex((prev) => (prev - 1 + clothingData.tops.length) % clothingData.tops.length);
        }
    };

    const nextBottom = () => {
        if (clothingData.bottoms.length > 0) {
            setCurrentBottomIndex((prev) => (prev + 1) % clothingData.bottoms.length);
        }
    };

    const prevBottom = () => {
        if (clothingData.bottoms.length > 0) {
            setCurrentBottomIndex((prev) => (prev - 1 + clothingData.bottoms.length) % clothingData.bottoms.length);
        }
    };

    const nextShoe = () => {
        if (clothingData.shoes.length > 0) {
            setCurrentShoeIndex((prev) => (prev + 1) % clothingData.shoes.length);
        }
    };

    const prevShoe = () => {
        if (clothingData.shoes.length > 0) {
            setCurrentShoeIndex((prev) => (prev - 1 + clothingData.shoes.length) % clothingData.shoes.length);
        }
    };

    const randomOutfit = () => {
        if (clothingData.heads.length > 0) {
            const randomHatIndex = Math.floor(Math.random() * clothingData.heads.length);
            setCurrentHatIndex(randomHatIndex);
        }
        if (clothingData.tops.length > 0) {
            const randomTopIndex = Math.floor(Math.random() * clothingData.tops.length);
            setCurrentTopIndex(randomTopIndex);
        }
        if (clothingData.bottoms.length > 0) {
            const randomBottomIndex = Math.floor(Math.random() * clothingData.bottoms.length);
            setCurrentBottomIndex(randomBottomIndex);
        }
        if (clothingData.shoes.length > 0) {
            const randomShoeIndex = Math.floor(Math.random() * clothingData.shoes.length);
            setCurrentShoeIndex(randomShoeIndex);
        }
    };

    const saveOutfit = () => {
        // Check if this combination already exists
        const outfitExists = savedOutfits.some(outfit =>
            outfit.hatIndex === currentHatIndex &&
            outfit.topIndex === currentTopIndex &&
            outfit.bottomIndex === currentBottomIndex &&
            outfit.shoeIndex === currentShoeIndex
        );

        if (outfitExists) {
            alert("This outfit combination is already saved!");
            return;
        }

        const newOutfit = {
            id: Date.now(), // Simple unique ID
            hatImage: clothingData.heads[currentHatIndex] || null,
            topImage: clothingData.tops[currentTopIndex] || null,
            bottomImage: clothingData.bottoms[currentBottomIndex] || null,
            shoeImage: clothingData.shoes[currentShoeIndex] || null,
            hatIndex: currentHatIndex,
            topIndex: currentTopIndex,
            bottomIndex: currentBottomIndex,
            shoeIndex: currentShoeIndex
        };

        setSavedOutfits(prev => [...prev, newOutfit]);
    };

    return (
        <div className="my-outfits-container">
            <div className="outfits-header">
                <h1 className="outfits-title">My Outfits</h1>
                <p className="outfits-subtitle">Mix and match your clothes to create perfect outfits</p>
            </div>

            <div className="outfits-main-content">
                <div className="outfit-combination-section">
                    <div className="combination-instructions">
                        <h2>Create Your Outfit</h2>
                        <p>Swipe through tops and bottoms to find your perfect combination!</p>
                        <div className="outfit-dropdown-container">
                            <select
                                className="outfit-dropdown"
                                value={selectedCloset}
                                onChange={handleClosetChange}
                            >
                                <option value="">Select Closet</option>
                                <option value="my-closet">My Closet</option>
                                {userGroups.map((group) => (
                                    <option key={group.id} value={`group-${group.code}`}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {selectedCloset === "my-closet" && (
                        <div className="outfit-images-stack">
                            {/* Hats Image */}
                            {clothingData.heads.length > 0 && (
                                <div className="image-with-controls">
                                    <button className="carousel-nav-btn prev-btn" onClick={prevHat}>
                                        ←
                                    </button>
                                    <img
                                        src={clothingData.heads[currentHatIndex]}
                                        alt={`Hat ${currentHatIndex + 1}`}
                                        className="outfit-image"
                                    />
                                    <button className="carousel-nav-btn next-btn" onClick={nextHat}>
                                        →
                                    </button>
                                </div>
                            )}

                            {/* Tops Image */}
                            {clothingData.tops.length > 0 && (
                                <div className="image-with-controls">
                                    <button className="carousel-nav-btn prev-btn" onClick={prevTop}>
                                        ←
                                    </button>
                                    <img
                                        src={clothingData.tops[currentTopIndex]}
                                        alt={`Top ${currentTopIndex + 1}`}
                                        className="outfit-image"
                                    />
                                    <button className="carousel-nav-btn next-btn" onClick={nextTop}>
                                        →
                                    </button>
                                </div>
                            )}

                            {/* Bottoms Image */}
                            {clothingData.bottoms.length > 0 && (
                                <div className="image-with-controls">
                                    <button className="carousel-nav-btn prev-btn" onClick={prevBottom}>
                                        ←
                                    </button>
                                    <img
                                        src={clothingData.bottoms[currentBottomIndex]}
                                        alt={`Bottom ${currentBottomIndex + 1}`}
                                        className="outfit-image"
                                    />
                                    <button className="carousel-nav-btn next-btn" onClick={nextBottom}>
                                        →
                                    </button>
                                </div>
                            )}

                            {/* Shoes Image */}
                            {clothingData.shoes.length > 0 && (
                                <div className="image-with-controls">
                                    <button className="carousel-nav-btn prev-btn" onClick={prevShoe}>
                                        ←
                                    </button>
                                    <img
                                        src={clothingData.shoes[currentShoeIndex]}
                                        alt={`Shoe ${currentShoeIndex + 1}`}
                                        className="outfit-image"
                                    />
                                    <button className="carousel-nav-btn next-btn" onClick={nextShoe}>
                                        →
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {selectedCloset === "" && (
                        <div className="no-closet-selected">
                            <p>Please select a closet to start creating outfits!</p>
                        </div>
                    )}

                    {isLoading && (
                        <div className="loading-message">
                            <p>Loading your closet...</p>
                        </div>
                    )}

                    <div className="outfit-actions">
                        <button className="save-outfit-btn" onClick={saveOutfit}>
                            Save This Outfit
                        </button>
                        <button className="random-outfit-btn" onClick={randomOutfit}>
                            Random Outfit
                        </button>
                    </div>
                </div>

                <div className="saved-outfits-section">
                    <h2>Your Saved Outfits</h2>
                    <div className="saved-outfits-content">
                        {savedOutfits.length === 0 ? (
                            <div className="no-outfits-message">
                                <p>No outfits saved yet. Create your first outfit!</p>
                            </div>
                        ) : (
                            <div className="saved-outfits-grid">
                                {savedOutfits.map((outfit) => (
                                    <div key={outfit.id} className="saved-outfit-item">
                                        <div className="outfit-images">
                                            {outfit.hatImage && (
                                                <img
                                                    src={outfit.hatImage}
                                                    alt="Saved hat"
                                                    className="saved-outfit-image"
                                                />
                                            )}
                                            {outfit.topImage && (
                                                <img
                                                    src={outfit.topImage}
                                                    alt="Saved top"
                                                    className="saved-outfit-image"
                                                />
                                            )}
                                            {outfit.bottomImage && (
                                                <img
                                                    src={outfit.bottomImage}
                                                    alt="Saved bottom"
                                                    className="saved-outfit-image"
                                                />
                                            )}
                                            {outfit.shoeImage && (
                                                <img
                                                    src={outfit.shoeImage}
                                                    alt="Saved shoe"
                                                    className="saved-outfit-image"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOutfits;
