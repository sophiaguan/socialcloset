import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";
import { UserContext } from "../App";

const Home = () => {
  const { userId, handleLogin } = useContext(UserContext);

  return (
    <>
      {userId ? (
        <div style={{ marginTop: "80px" }}>
          <h1>Welcome back!</h1>
          <p>Manage your wardrobe.</p>
        </div>
      ) : (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 60px)", // Full height minus navbar
          textAlign: "center",
          padding: "40px 20px"
        }}>
          <h1 style={{
            fontSize: "4rem",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "20px",
            lineHeight: "1.2"
          }}>
            Welcome to SocialCloset
          </h1>

          <p style={{
            fontSize: "1.5rem",
            color: "#666",
            marginBottom: "60px",
            maxWidth: "600px",
            lineHeight: "1.4"
          }}>
            Your digital closet for organizing, planning, and sharing your style.
          </p>

          <div style={{ position: "relative" }}>
            <GoogleLogin
              onSuccess={handleLogin}
              onError={(err) => console.log(err)}
              text="signin_with"
              shape="rectangular"
              size="large"
              width="400"
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                padding: "20px 40px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
                transition: "all 0.3s ease"
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
