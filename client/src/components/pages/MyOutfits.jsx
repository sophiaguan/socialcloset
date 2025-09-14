import React from "react";

import "../../utilities.css";

const MyOutfits = () => {
    return (
        <div style={{ padding: "40px 60px" }}>
            <h1 style={{ marginBottom: "10px" }}>My Outfits</h1>
            <p style={{ marginBottom: "15px" }}>Create and manage your outfit combinations.</p>
            <div style={{ marginTop: "20px" }}>
                <p>No outfits created yet. Start by adding clothes to your closet!</p>
            </div>
        </div>
    );
};

export default MyOutfits;
