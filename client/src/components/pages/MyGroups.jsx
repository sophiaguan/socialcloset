import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../../utilities.css";
import "./MyGroups.css";

const GroupCloset = () => {
    const navigate = useNavigate();
    const [groupCode, setGroupCode] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const [createdGroupCode, setCreatedGroupCode] = useState("");
    const [userGroups, setUserGroups] = useState([]);
    const [isLoadingGroups, setIsLoadingGroups] = useState(false);
    const [editingGroupId, setEditingGroupId] = useState(null);
    const [editingGroupName, setEditingGroupName] = useState("");

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch user's groups on component mount and after group operations
    const fetchUserGroups = async () => {
        setIsLoadingGroups(true);
        try {
            const response = await fetch("/api/usergroups");
            const data = await response.json();

            if (response.ok) {
                setUserGroups(data.groups);
            } else {
                console.error("Failed to fetch groups:", data.error);
            }
        } catch (error) {
            console.error("Error fetching groups:", error);
        } finally {
            setIsLoadingGroups(false);
        }
    };

    useEffect(() => {
        fetchUserGroups();
    }, []);

    // Handle starting edit mode
    const handleStartEdit = (groupId, currentName) => {
        setEditingGroupId(groupId);
        setEditingGroupName(currentName);
    };

    // Handle canceling edit mode
    const handleCancelEdit = () => {
        setEditingGroupId(null);
        setEditingGroupName("");
    };

    // Handle saving edited group name
    const handleSaveEdit = async (groupId) => {
        if (!editingGroupName.trim()) {
            alert("Group name cannot be empty!");
            return;
        }

        try {
            const response = await fetch("/api/editgroupname", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    groupId: groupId,
                    newName: editingGroupName.trim()
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Update the group name in the local state
                setUserGroups(prevGroups =>
                    prevGroups.map(group =>
                        group.id === groupId
                            ? { ...group, name: editingGroupName.trim() }
                            : group
                    )
                );
                setEditingGroupId(null);
                setEditingGroupName("");
                setMessage("Group name updated successfully!");
            } else {
                alert(data.error || "Failed to update group name");
            }
        } catch (error) {
            console.error("Error updating group name:", error);
            alert("Failed to update group name. Please try again.");
        }
    };

    const handleJoinGroup = async () => {
        if (!groupCode || groupCode.length !== 4) {
            setMessage("Please enter a valid 4-letter group code.");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/joingroup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code: groupCode.toUpperCase() }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`Successfully joined group "${data.groupName}"!`);
                setGroupCode("");
                // Refresh the groups list
                fetchUserGroups();
            } else {
                setMessage(data.error || "Failed to join group.");
            }
        } catch (error) {
            console.error("Error joining group:", error);
            setMessage("Failed to join group. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateGroup = async () => {
        setIsCreatingGroup(true);
        setMessage("");

        try {
            const response = await fetch("/api/creategroup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: "My Group" }),
            });

            const data = await response.json();

            if (response.ok) {
                setCreatedGroupCode(data.groupId);
                setMessage(`Group created successfully! Share this code with your friends: ${data.groupId}`);
                // Refresh the groups list
                fetchUserGroups();
            } else {
                setMessage(data.error || "Failed to create group.");
            }
        } catch (error) {
            console.error("Error creating group:", error);
            setMessage("Failed to create group. Please try again.");
        } finally {
            setIsCreatingGroup(false);
        }
    };

    return (
        <div className="my-groups-container">
            <div className="my-groups-header">
                <h1 className="my-groups-title">Group Closet</h1>
                <p className="my-groups-subtitle">Connect with friends and share your style.</p>
            </div>

            <div className="group-actions-container">
                <div className="create-group-section">
                    <h2 className="create-group-title">Create a Group</h2>
                    <div className="create-group-form">
                        <button
                            onClick={handleCreateGroup}
                            disabled={isCreatingGroup}
                            className="create-group-btn"
                        >
                            {isCreatingGroup ? "Creating..." : "Create Group"}
                        </button>
                    </div>

                    {createdGroupCode && (
                        <div className="create-group-success">
                            <h3 style={{ marginBottom: "10px", color: "#059669" }}>Your Group Code</h3>
                            <div style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "#667eea",
                                letterSpacing: "2px",
                                marginBottom: "10px"
                            }}>
                                {createdGroupCode}
                            </div>
                            <p style={{ fontSize: "14px", color: "#6b7280", margin: "0" }}>
                                Share this code with your friends so they can join your group!
                            </p>
                        </div>
                    )}
                </div>

                <div className="join-group-section">
                    <h2 className="join-group-title">Join a Group</h2>
                    <div className="join-group-form">
                        <input
                            type="text"
                            placeholder="Enter 4-letter group code"
                            value={groupCode}
                            onChange={(e) => {
                                const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
                                if (value.length <= 4) {
                                    setGroupCode(value);
                                }
                            }}
                            maxLength={4}
                            className="join-group-input"
                            style={{ textTransform: "uppercase" }}
                        />
                        <button
                            onClick={handleJoinGroup}
                            disabled={isLoading || groupCode.length !== 4}
                            className="join-group-btn"
                        >
                            {isLoading ? "Joining..." : "Join Group"}
                        </button>
                    </div>
                    {message && (
                        <div className="join-group-message">
                            {message}
                        </div>
                    )}
                </div>
            </div>

            <div className="user-groups-section">
                <h2 className="user-groups-title">Your Groups</h2>

                {isLoadingGroups ? (
                    <div className="loading-state">
                        <p>Loading your groups...</p>
                    </div>
                ) : userGroups.length > 0 ? (
                    <div className="user-groups-list">
                        {userGroups.map((group) => (
                            <div
                                key={group.id}
                                onClick={() => editingGroupId !== group.id && navigate(`/group/${encodeURIComponent(group.name)}`, { state: { groupCode: group.code } })}
                                className={`group-card ${editingGroupId === group.id ? 'editing' : ''}`}
                            >
                                <div className="group-header">
                                    {editingGroupId === group.id ? (
                                        <div className="group-name-section">
                                            <input
                                                type="text"
                                                value={editingGroupName}
                                                onChange={(e) => setEditingGroupName(e.target.value)}
                                                className="group-name-input"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleSaveEdit(group.id);
                                                    } else if (e.key === 'Escape') {
                                                        handleCancelEdit();
                                                    }
                                                }}
                                                autoFocus
                                            />
                                            <button
                                                onClick={() => handleSaveEdit(group.id)}
                                                className="group-save-btn"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="group-cancel-btn"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="group-name-section">
                                            <h3 className="group-name">{group.name}</h3>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStartEdit(group.id, group.name);
                                                }}
                                                className="group-edit-btn"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    )}
                                    <div className="group-code">
                                        {group.code}
                                    </div>
                                </div>

                                <div className="group-members">
                                    <h4 className="group-members-title">
                                        Members ({group.members.length})
                                    </h4>
                                    <div className="group-members-list">
                                        {group.members.map((member, index) => (
                                            <span key={index} className="group-member">
                                                {member.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>
                            You're not part of any groups yet. Create a group or join one using a code above!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupCloset;
