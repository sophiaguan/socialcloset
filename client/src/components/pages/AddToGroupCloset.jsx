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

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Get group name and code from navigation state or use default
    const groupName = location.state?.groupName || "My Group";
    const groupCode = location.state?.groupCode || "TEST";

    // Get selected clothes from navigation state
    useEffect(() => {
        if (location.state && location.state.selectedClothes) {
            setSelectedClothes(location.state.selectedClothes);
        } else {
            alert("Error");
            navigate(`/group/${encodeURIComponent(groupName)}/shared-clothes`, {
                state: { groupCode: groupCode }
            });
        }
    }, [location.state]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`/api/add-items/${groupCode}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    items: selectedClothes.map(item => item.url)
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to share items. Please try again.");
            }

            alert(`Successfully shared ${selectedClothes.length} item(s) to ${groupName}!`);

            navigate(`/group/${encodeURIComponent(groupName)}/shared-clothes`, {
                state: { groupCode: groupCode }
            });

        } catch (error) {
            console.error("Error submitting shared clothes:", error);
            alert(error.message);
        }
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
                    >
                        {'Share to Closet'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddToGroupCloset;
