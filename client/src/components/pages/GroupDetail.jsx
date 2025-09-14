import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../utilities.css";
import "./GroupDetail.css";
import BackButton from "../BackButton";

const GroupDetail = () => {
    const { groupName } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [groupCode, setGroupCode] = useState("");

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Decode the group name from URL
    const decodedGroupName = decodeURIComponent(groupName || "Group");

    // Get group code from navigation state or fetch it
    React.useEffect(() => {
        // First try to get group code from navigation state
        if (location.state?.groupCode) {
            setGroupCode(location.state.groupCode);
            return;
        }

        // Fallback: fetch group code from API
        const fetchGroupCode = async () => {
            try {
                const response = await fetch("/api/usergroups");
                const data = await response.json();

                if (response.ok && data.groups) {
                    const matchingGroup = data.groups.find(group =>
                        group.name === decodedGroupName
                    );

                    if (matchingGroup) {
                        setGroupCode(matchingGroup.code);
                    }
                }
            } catch (error) {
                console.error("Error fetching group code:", error);
            }
        };

        fetchGroupCode();
    }, [decodedGroupName, location.state]);

    return (
        <div className="group-detail-container">
            <div className="group-detail-header">
                <BackButton destination="/friends" label="Back to Group Closet" />

                <h1 className="group-detail-title">{decodedGroupName}</h1>
                <p className="group-detail-subtitle">Manage your group's shared closet and outfits.</p>
            </div>

            {/* Action Buttons */}
            <div className="group-detail-actions">
                <button
                    className="group-action-btn share-clothes-btn"
                    onClick={() => navigate("/share-clothes", { state: { groupName: decodedGroupName, groupCode: groupCode } })}
                >
                    <div className="action-icon">👕</div>
                    <div className="action-content">
                        <h3>Share Clothes</h3>
                        <p>Add items from your closet to share with the group</p>
                    </div>
                </button>

                <button
                    className="group-action-btn make-outfits-btn"
                    onClick={() => navigate("/my-outfits")}
                >
                    <div className="action-icon">👗</div>
                    <div className="action-content">
                        <h3>Make Outfits</h3>
                        <p>Create and share outfit combinations with the group</p>
                    </div>
                </button>

                <button
                    className="group-action-btn all-shared-btn"
                    onClick={() => navigate(`/group/${encodeURIComponent(decodedGroupName)}/shared-clothes`, { state: { groupCode: groupCode } })}
                >
                    <div className="action-icon">👔</div>
                    <div className="action-content">
                        <h3>All Shared Clothes</h3>
                        <p>Browse all clothes shared by group members</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default GroupDetail;
