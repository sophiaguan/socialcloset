import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

const BackButton = ({ destination = "/", label = "Back" }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(destination);
    };

    return (
        <button
            className="back-button"
            onClick={handleBackClick}
        >
            <span className="back-button-icon">←</span>
            <span className="back-button-text">{label}</span>
        </button>
    );
};

export default BackButton;
