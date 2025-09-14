import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../utilities.css";
import "./ShareClothes.css";
import BackButton from "../BackButton";
import { UserContext } from "../App";

const ShareClothes = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = useContext(UserContext);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [alreadySharedUrls, setAlreadySharedUrls] = useState(new Set());
    const [clothingData, setClothingData] = useState({ tops: [], bottoms: [], heads: [], shoes: [] });

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Get group name and code from navigation state or use default
    const groupName = location.state?.groupName || "My Group";
    const groupCode = location.state?.groupCode || "TEST";

    // Debug logging
    console.log("ShareClothes - groupName:", groupName);
    console.log("ShareClothes - groupCode:", groupCode);

    useEffect(() => {
        const fetchClothingData = async () => {
            try {
                const response = await fetch("/api/clothing-images");
                const data = await response.json();
                setClothingData({
                    tops: data.tops || [],
                    bottoms: data.bottoms || [],
                    heads: data.heads || [],
                    shoes: data.shoes || [],
                });
            } catch (error) {
                console.error("Failed to fetch clothing data:", error);
            }
        };

        fetchClothingData();
    }, []);

    useEffect(() => {
        if (!userId) return;
        const fetchSharedItems = async () => {
            try {
            const res = await fetch(`/api/shared-items/${groupCode}/${userId}`);
            const data = await res.json();
            print("ADCFADFSD")
            print(data)

            setAlreadySharedUrls(new Set(data.sharedItems));
            // You can store them in state to show in UI
            } catch (error) {
                console.error("Failed to fetch shared items:", error);
            }
        };
        fetchSharedItems();
    }, []);

    // Combine all clothes into a single array for grid display
    const allClothes = [
        ...clothingData.tops.map((url, index) => ({ url, type: "top", id: `top-${index}` })),
        ...clothingData.bottoms.map((url, index) => ({ url, type: "bottom", id: `bottom-${index}` })),
        ...clothingData.heads.map((url, index) => ({ url, type: "head", id: `head-${index}` })),
        ...clothingData.shoes.map((url, index) => ({ url, type: "shoe", id: `shoe-${index}` }))
    ];

    // Handle item selection
    const toggleItemSelection = (itemId) => {
        const item = allClothes.find(clothing => clothing.id === itemId);
        if (item && alreadySharedUrls.has(item.url)) {
            return; // Don't allow selection of already shared items
        }

        const newSelectedItems = new Set(selectedItems);
        if (newSelectedItems.has(itemId)) {
            newSelectedItems.delete(itemId);
        } else {
            newSelectedItems.add(itemId);
        }
        setSelectedItems(newSelectedItems);
    };

    // Handle adding selected items to shared closet
    const handleAddToSharedCloset = async () => {
        if (selectedItems.size === 0) {
            alert("Please select at least one item to add to your shared closet.");
            return;
        }

        // Get selected clothing items
        const selectedClothes = allClothes.filter(item => selectedItems.has(item.id));

        // Navigate to AddToGroupCloset page with selected items, group name, and group code
        navigate("/add-to-group-closet", {
            state: {
                selectedClothes: selectedClothes,
                groupName: groupName,
                groupCode: groupCode
            }
        });

    };

    return (
        <div className="share-clothes-container">
            <div className="share-clothes-header">
                <BackButton destination="/friends" label="Back to Group Closet" />

                <div className="share-clothes-title-section">
                    <div className="share-clothes-title-content">
                        <h1 className="share-clothes-title">Share Your Clothes</h1>
                        <p className="share-clothes-subtitle">Select items from your wardrobe to share with your group.</p>
                    </div>

                    <div className="share-clothes-actions">
                        <div className="closet-icon-container">
                            <button
                                className="closet-icon-btn"
                                onClick={handleAddToSharedCloset}
                                disabled={selectedItems.size === 0}
                            >
                                <div className="closet-icon">👔</div>
                                {selectedItems.size > 0 && (
                                    <div className="item-count-popup">
                                        {selectedItems.size}
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="share-clothes-gallery">
                {allClothes.map((clothing) => {
                    const isAlreadyShared = alreadySharedUrls.has(clothing.url);
                    const isSelected = selectedItems.has(clothing.id);

                    return (
                        <div
                            key={clothing.id}
                            className={`share-clothes-card ${isSelected ? 'selected' : ''} ${isAlreadyShared ? 'already-shared' : ''}`}
                            onClick={() => !isAlreadyShared && toggleItemSelection(clothing.id)}
                        >
                            <div className="share-clothes-checkbox">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => !isAlreadyShared && toggleItemSelection(clothing.id)}
                                    onClick={(e) => e.stopPropagation()}
                                    disabled={isAlreadyShared}
                                />
                            </div>
                            {isAlreadyShared && (
                                <div className="already-shared-label">
                                    Already Shared
                                </div>
                            )}
                            <img
                                src={clothing.url}
                                alt={`${clothing.type} item`}
                            />
                            <div className="share-clothes-card-content">
                                <span className="share-clothes-label">
                                    {clothing.type}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ShareClothes;
