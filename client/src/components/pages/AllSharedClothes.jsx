import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../utilities.css";
import "./AllSharedClothes.css";
import BackButton from "../BackButton";
import { UserContext } from "../App";

const AllSharedClothes = () => {
    const { groupName } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = useContext(UserContext);
    const [sharedClothes, setSharedClothes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [groupCode, setGroupCode] = useState("");

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Decode the group name from URL
    const decodedGroupName = decodeURIComponent(groupName || "Group");

    useEffect(() => {
        // First try to get group code from navigation state
        if (location.state?.groupCode && userId) {
            setGroupCode(location.state.groupCode);

            // Load shared clothes using the user ID and group code from navigation state
            const localStorageKey = `sharedClothes_${userId}_${location.state.groupCode}`;
            console.log("Loading clothes from localStorage with key:", localStorageKey);
            const storedClothes = localStorage.getItem(localStorageKey);
            console.log("Retrieved clothes:", storedClothes);
            if (storedClothes) {
                setSharedClothes(JSON.parse(storedClothes));
            } else {
                setSharedClothes([]);
            }
            setIsLoading(false);
            return;
        }

        // Fallback: fetch the group code from the API using the group name
        const fetchGroupCode = async () => {
            try {
                const response = await fetch("/api/usergroups");
                const data = await response.json();

                if (response.ok && data.groups) {
                    // Find the group with matching name and get its code
                    const matchingGroup = data.groups.find(group =>
                        group.name === decodedGroupName
                    );

                    if (matchingGroup && userId) {
                        setGroupCode(matchingGroup.code);

                        // Load shared clothes using the user ID and group code
                        const localStorageKey = `sharedClothes_${userId}_${matchingGroup.code}`;
                        const storedClothes = localStorage.getItem(localStorageKey);
                        if (storedClothes) {
                            setSharedClothes(JSON.parse(storedClothes));
                        } else {
                            setSharedClothes([]);
                        }
                    } else {
                        setSharedClothes([]);
                    }
                } else {
                    setSharedClothes([]);
                }
            } catch (error) {
                console.error("Error fetching group code:", error);
                setSharedClothes([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGroupCode();
    }, [decodedGroupName, location.state, userId]);

    return (
        <div className="all-shared-container">
            <div className="all-shared-header">
                <BackButton destination={`/group/${encodeURIComponent(decodedGroupName)}`} label={`Back to ${decodedGroupName}`} />

                <h1 className="all-shared-title">All Shared Clothes</h1>
                <p className="all-shared-subtitle">Browse all clothes shared by members of {decodedGroupName}.</p>
            </div>

            {isLoading ? (
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading shared clothes...</p>
                </div>
            ) : sharedClothes.length > 0 ? (
                <>
                    {/* Summary Section */}
                    <div className="shared-summary">
                        <h2 className="summary-title">Collection Summary</h2>
                        <div className="summary-stats">
                            <div className="stat-card">
                                <span className="stat-number">{sharedClothes.filter(item => item.type === 'top').length}</span>
                                <span className="stat-label">Tops</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-number">{sharedClothes.filter(item => item.type === 'bottom').length}</span>
                                <span className="stat-label">Bottoms</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-number">{sharedClothes.length}</span>
                                <span className="stat-label">Total Items</span>
                            </div>
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="shared-gallery">
                        {sharedClothes.map((clothing) => (
                            <div key={clothing.id} className="shared-card">
                                <img
                                    src={clothing.url}
                                    alt={`${clothing.type} item`}
                                />
                                <div className="shared-card-content">
                                    <span className="shared-label">
                                        {clothing.type}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">👔</div>
                    <h2>No Shared Clothes Yet</h2>
                    <p>This group hasn't shared any clothes yet. Be the first to share some items!</p>
                    <button
                        className="share-first-btn"
                        onClick={() => navigate("/share-clothes", { state: { groupName: decodedGroupName, groupCode: groupCode } })}
                    >
                        Share Your First Item
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllSharedClothes;
