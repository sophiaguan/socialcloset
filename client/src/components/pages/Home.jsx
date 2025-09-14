import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";
import { UserContext } from "../App";

const Home = () => {
  const { userId, handleLogin } = useContext(UserContext);

  return (
    <>
      {userId ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 60px)",
          padding: "60px 40px"
        }}>
          <h1 style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "40px",
            textAlign: "center"
          }}>
            Welcome back!
          </h1>

          <div style={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            minWidth: "400px",
            maxWidth: "500px"
          }}>
            <h2 style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#333",
              marginBottom: "30px",
              textAlign: "center"
            }}>
              Your Closets
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <Link
                to="/my-closet"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 20px",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: "#333",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#e9ecef";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#f8f9fa";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "500" }}>My Closet</span>
                <span style={{ fontSize: "18px", color: "#007bff" }}>→</span>
              </Link>

              <Link
                to="/friends"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px 20px",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: "#333",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#e9ecef";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#f8f9fa";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "500" }}>Group Closet</span>
                <span style={{ fontSize: "18px", color: "#007bff" }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 60px)", // Full height minus navbar
          textAlign: "center",
          padding: "60px 40px"
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
