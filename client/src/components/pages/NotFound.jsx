import React from "react";
import BackButton from "../BackButton";

const NotFound = () => {
  return (
    <div style={{ padding: "40px 60px" }}>
      <BackButton destination="/" label="Back to Home" />

      <h1 style={{ marginTop: "20px", marginBottom: "10px" }}>404 Not Found</h1>
      <p>The page you requested couldn't be found.</p>
    </div>
  );
};

export default NotFound;
