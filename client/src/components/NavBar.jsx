import React from "react";
import { Link, useLocation } from "react-router-dom";

import "../utilities.css";

const NavBar = () => {
    const location = useLocation();

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/my-closet", label: "My Closet" },
        { path: "/my-outfits", label: "My Outfits" },
        { path: "/friends", label: "Friends" }
    ];

    return (
        <nav style={{
            position: "fixed",
            top: 0,
            left: 0,
            
            right: 0,
            backgroundColor: "#fff",
            borderBottom: "1px solid #e0e0e0",
            padding: "0 20px",
            zIndex: 1000,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                maxWidth: "1200px",
                margin: "0 auto",
                height: "60px"
            }}>
                {/* Logo/Brand */}
                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#333"
                    }}
                >
                    SocialCloset
                </Link>

                {/* Navigation Links */}
                <div style={{ display: "flex", gap: "30px" }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                textDecoration: "none",
                                color: location.pathname === item.path ? "#007bff" : "#666",
                                fontWeight: location.pathname === item.path ? "600" : "400",
                                fontSize: "16px",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                transition: "all 0.2s ease"
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
