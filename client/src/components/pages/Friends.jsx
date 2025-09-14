import React, { useState, useEffect } from "react";
import "../../utilities.css";

const Friends = () => {
  const [groupCode, setGroupCode] = useState("");
  const [groupName, setGroupName] = useState(""); // New state for custom group name
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [createdGroupCode, setCreatedGroupCode] = useState("");
  const [userGroups, setUserGroups] = useState([]);
  const [isLoadingGroups, setIsLoadingGroups] = useState(false);

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
    if (!groupName.trim()) {
      setMessage("Please enter a group name.");
      return;
    }

    setIsCreatingGroup(true);
    setMessage("");

    try {
      const response = await fetch("/api/creategroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: groupName.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setCreatedGroupCode(data.groupId);
        setMessage(`Group "${groupName}" created successfully! Share this code with your friends: ${data.groupId}`);
        setGroupName(""); // Clear the group name input
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
    <div style={{ padding: "40px 60px" }}>
      <h1 style={{ marginBottom: "10px" }}>Friends</h1>
      <p style={{ marginBottom: "15px" }}>Connect with friends and share your style.</p>

      <div style={{ marginTop: "30px", marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "15px" }}>Create a Group</h2>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            maxLength={50}
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
              width: "300px",
              marginRight: "10px",
              marginBottom: "10px"
            }}
          />
          <br />
          <button
            onClick={handleCreateGroup}
            disabled={isCreatingGroup || !groupName.trim()}
            style={{
              padding: "12px 24px",
              backgroundColor: !isCreatingGroup && groupName.trim() ? "#28a745" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: !isCreatingGroup && groupName.trim() ? "pointer" : "not-allowed",
              transition: "background-color 0.2s"
            }}
          >
            {isCreatingGroup ? "Creating..." : "Create Group"}
          </button>
        </div>

        {createdGroupCode && (
          <div
            style={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              border: "1px solid #dee2e6",
              borderRadius: "6px"
            }}
          >
            <h3 style={{ marginBottom: "10px", color: "#28a745" }}>Your Group Code</h3>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#007bff",
                letterSpacing: "2px",
                marginBottom: "10px"
              }}
            >
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
          <p
            style={{
              color: message.includes("Successfully") || message.includes("created successfully") ? "green" : "red",
              fontSize: "14px",
              margin: "5px 0"
            }}
          >
            {message}
          </p>
        )}
      </div>

      {/* User's Groups Section */}
      <div style={{ marginTop: "40px" }}>
        <h2 style={{ marginBottom: "15px" }}>Your Groups</h2>
        {isLoadingGroups ? (
          <p>Loading your groups...</p>
        ) : userGroups.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {userGroups.map((group) => (
              <div
                key={group.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px",
                  backgroundColor: "#f9f9f9"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px"
                  }}
                >
                  <h3 style={{ margin: "0", color: "#333" }}>{group.name}</h3>
                  <div
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      letterSpacing: "1px"
                    }}
                  >
                    {group.code}
                  </div>
                </div>
                <div>
                  <h4
                    style={{
                      margin: "0 0 10px 0",
                      color: "#666",
                      fontSize: "14px"
                    }}
                  >
                    Members ({group.users?.length || 0})
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {group.users?.map((user, index) => (
                      <div
                        key={user._id || index}
                        style={{
                          backgroundColor: "#e9ecef",
                          padding: "6px 12px",
                          borderRadius: "16px",
                          fontSize: "14px",
                          color: "#495057",
                          border: "1px solid #dee2e6"
                        }}
                      >
                        {user.name || user.username || 'Unknown User'}
                      </div>
                    )) || []}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              backgroundColor: "#f8f9fa",
              border: "1px solid #dee2e6",
              borderRadius: "8px"
            }}
          >
            <p style={{ margin: "0", color: "#666" }}>
              You're not part of any groups yet. Create a group or join one using a code above!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;