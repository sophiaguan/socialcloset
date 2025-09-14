import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../utilities.css";
import "./AddToGroupCloset.css";
import BackButton from "../BackButton";
import { UserContext } from "../App";

const AddToGroupCloset = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = useContext(UserContext);
    const [selectedClothes, setSelectedClothes] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Get group name and code from navigation state or use default
    const groupName = location.state?.groupName || "My Group";
    const groupCode = location.state?.groupCode || "TEST";

    // Get selected clothes from navigation state or use default data
    useEffect(() => {
        if (location.state && location.state.selectedClothes) {
            setSelectedClothes(location.state.selectedClothes);
        } else {
            // Fallback to hardcoded data if no state passed
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

            const allClothes = [
                ...clothingData.tops.map((url, index) => ({ url, type: "top", id: `top-${index}` })),
                ...clothingData.bottoms.map((url, index) => ({ url, type: "bottom", id: `bottom-${index}` }))
            ];

            setSelectedClothes(allClothes.slice(0, 3)); // Show first 3 items as example
        }
    }, [location.state]);

    const handleSubmit = () => {
        setIsSubmitting(true);

        // Use the group code from navigation state

        // Get existing shared clothes for this group and user
        const localStorageKey = `sharedClothes_${userId}_${groupCode}`;
        const existingClothes = JSON.parse(localStorage.getItem(localStorageKey) || '[]');

        // Check for duplicates and filter them out
        const existingUrls = existingClothes.map(item => item.url);
        const duplicateItems = selectedClothes.filter(item => existingUrls.includes(item.url));
        const newItems = selectedClothes.filter(item => !existingUrls.includes(item.url));

        if (duplicateItems.length > 0) {
            alert(`Some items were already shared to this group and have been skipped:\n${duplicateItems.map(item => `- ${item.type}`).join('\n')}`);
        }

        if (newItems.length === 0) {
            alert("All selected items have already been shared to this group!");
            setIsSubmitting(false);
            return;
        }

        // Add new clothes with unique IDs
        const newClothes = newItems.map((item, index) => ({
            ...item,
            id: `${item.id}_${Date.now()}_${index}`, // Make unique
            sharedAt: new Date().toISOString()
        }));

        // Combine existing and new clothes
        const updatedClothes = [...existingClothes, ...newClothes];

        // Save to localStorage using user ID and group code
        console.log("Saving clothes to localStorage with key:", localStorageKey);
        console.log("Clothes being saved:", updatedClothes);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedClothes));

        // Simulate API call
        setTimeout(() => {
            alert(`Successfully shared ${newItems.length} item(s) to ${groupName}!`);
            setIsSubmitting(false);
            // Navigate to All Shared Clothes page for this group
            navigate(`/group/${encodeURIComponent(groupName)}/shared-clothes`, {
                state: { groupCode: groupCode }
            });
        }, 1000);
    };

    const removeItem = (itemId) => {
        setSelectedClothes(prev => prev.filter(item => item.id !== itemId));
    };

    return (
        <div className="add-to-group-container">
            <div className="add-to-group-header">
                <BackButton destination="/share-clothes" label="Back to Share Clothes" />

                <h1 className="add-to-group-title">Add to Group Closet</h1>
                <p className="add-to-group-subtitle">Review your selected items before adding them to the group.</p>
            </div>

            {/* Selected Items List */}
            <div className="selected-items-section">
                <div className="items-header">
                    <h2 className="items-title">Selected Items ({selectedClothes.length})</h2>
                </div>

                <div className="items-list">
                    {selectedClothes.map((item, index) => (
                        <div key={item.id} className="item-card">
                            <div className="item-image">
                                <img src={item.url} alt={`${item.type} item`} />
                            </div>

                            <div className="item-details">
                                <h3 className="item-type">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</h3>
                                <p className="item-description">Clothing item #{index + 1}</p>
                            </div>

                            <div className="item-actions">
                                <button
                                    className="remove-btn"
                                    onClick={() => removeItem(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedClothes.length === 0 && (
                    <div className="empty-state">
                        <p>No items selected. Go back to select some clothes to share.</p>
                    </div>
                )}
            </div>

            {/* Submit Section */}
            {selectedClothes.length > 0 && (
                <div className="submit-section">
                    <div className="submit-summary">
                        <span className="item-count">{selectedClothes.length} item{selectedClothes.length !== 1 ? 's' : ''} ready to share</span>
                    </div>

                    <button
                        className="submit-btn"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sharing to Closet...' : 'Share to Closet'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddToGroupCloset;
