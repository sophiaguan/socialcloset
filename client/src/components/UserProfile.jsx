import React, { useState, useContext } from "react";
import { googleLogout } from "@react-oauth/google";

import { UserContext } from "./App";

const UserProfile = () => {
    const { userId, userInfo, handleLogout } = useContext(UserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (!userId || !userInfo) {
        return null;
    }

    const { name, email } = userInfo;
    const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

    const handleLogoutClick = () => {
        googleLogout();
        handleLogout();
        setIsDropdownOpen(false);
    };

    const handleSettingsClick = () => {
        // TODO: Navigate to settings page
        alert("Settings page coming soon!");
        setIsDropdownOpen(false);
    };

    return (
        <div style={{ position: "relative" }}>
            {/* Profile Avatar */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s ease"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
            >
                {initials}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <>
                    {/* Backdrop to close dropdown */}
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 999
                        }}
                        onClick={() => setIsDropdownOpen(false)}
                    />

                    {/* Dropdown Content */}
                    <div
                        style={{
                            position: "absolute",
                            top: "45px",
                            right: "0",
                            backgroundColor: "white",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            minWidth: "200px",
                            zIndex: 1000,
                            padding: "12px 0"
                        }}
                    >
                        {/* User Info */}
                        <div style={{ padding: "8px 16px", borderBottom: "1px solid #f0f0f0" }}>
                            <div style={{ fontWeight: "600", fontSize: "14px", color: "#333" }}>
                                {name}
                            </div>
                            <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
                                {email}
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div style={{ padding: "4px 0" }}>
                            <button
                                onClick={handleSettingsClick}
                                style={{
                                    width: "100%",
                                    padding: "8px 16px",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "left",
                                    fontSize: "14px",
                                    color: "#333",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "#f8f9fa"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                            >
                                Settings
                            </button>

                            <button
                                onClick={handleLogoutClick}
                                style={{
                                    width: "100%",
                                    padding: "8px 16px",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "left",
                                    fontSize: "14px",
                                    color: "#dc3545",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "#f8f9fa"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserProfile;
