import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import "../utilities.css";
import "./NavBar.css";
import { UserContext } from "./App";
import UserProfile from "./UserProfile";

const NavBar = () => {
    const location = useLocation();
    const { userId } = useContext(UserContext);

    const navItems = [
        { path: "/my-closet", label: "My Closet" },
        { path: "/my-outfits", label: "My Outfits" },
        { path: "/friends", label: "Friends" }
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo/Brand and Navigation Links */}
                <div className="navbar-left">
                    <Link
                        to="/"
                        className="navbar-brand"
                    >
                        SocialCloset
                    </Link>

                    {userId && (
                        <div className="navbar-nav">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right side - Profile (only show when logged in) */}
                {userId && (
                    <div className="navbar-right">
                        <UserProfile />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
