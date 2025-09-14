import React, { useState } from "react";

import "../../utilities.css";

const Friends = () => {
    const [groupCode, setGroupCode] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const [createdGroupCode, setCreatedGroupCode] = useState("");

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
        <div style={{ padding: "40px 60px" }}>
            <h1 style={{ marginBottom: "10px" }}>Friends</h1>
            <p style={{ marginBottom: "15px" }}>Connect with friends and share your style.</p>
            
            <div style={{ marginTop: "30px", marginBottom: "20px" }}>
                <h2 style={{ marginBottom: "15px" }}>Create a Group</h2>
                <div style={{ marginBottom: "20px" }}>
                    <button
                        onClick={handleCreateGroup}
                        disabled={isCreatingGroup}
                        style={{
                            padding: "12px 24px",
                            backgroundColor: !isCreatingGroup ? "#28a745" : "#ccc",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "16px",
                            cursor: !isCreatingGroup ? "pointer" : "not-allowed",
                            transition: "background-color 0.2s"
                        }}
                    >
                        {isCreatingGroup ? "Creating..." : "Create Group"}
                    </button>
                </div>

                {createdGroupCode && (
                    <div style={{ 
                        marginBottom: "20px",
                        padding: "15px",
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #dee2e6",
                        borderRadius: "6px"
                    }}>
                        <h3 style={{ marginBottom: "10px", color: "#28a745" }}>Your Group Code</h3>
                        <div style={{ 
                            fontSize: "24px", 
                            fontWeight: "bold", 
                            color: "#007bff",
                            letterSpacing: "2px",
                            marginBottom: "10px"
                        }}>
                            {createdGroupCode}
                        </div>
                        <p style={{ fontSize: "14px", color: "#666", margin: "0" }}>
                            Share this code with your friends so they can join your group!
                        </p>
                    </div>
                )}

                <h2 style={{ marginBottom: "15px", marginTop: "30px" }}>Join a Group</h2>
                <div style={{ marginBottom: "10px" }}>
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
                        style={{
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            fontSize: "16px",
                            width: "200px",
                            textTransform: "uppercase",
                            marginRight: "10px"
                        }}
                    />
                    <button
                        onClick={handleJoinGroup}
                        disabled={isLoading || groupCode.length !== 4}
                        style={{
                            padding: "12px 24px",
                            backgroundColor: groupCode.length === 4 && !isLoading ? "#007bff" : "#ccc",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "16px",
                            cursor: groupCode.length === 4 && !isLoading ? "pointer" : "not-allowed",
                            transition: "background-color 0.2s"
                        }}
                    >
                        {isLoading ? "Joining..." : "Join Group"}
                    </button>
                </div>
                {message && (
                    <p style={{ 
                        color: message.includes("Successfully") || message.includes("created successfully") ? "green" : "red",
                        fontSize: "14px",
                        margin: "5px 0"
                    }}>
                        {message}
                    </p>
                )}
            </div>

            <div style={{ marginTop: "20px" }}>
                <p>No friends added yet. Start building your fashion community!</p>
            </div>
        </div>
    );
};

export default Friends;
