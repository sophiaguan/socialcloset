import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";
import { UserContext } from "../App";

const Home = () => {
  const { userId, handleLogin } = useContext(UserContext);

  return (
    <div className="home-container">
      {userId ? (
        <div className="home-signed-in">
          <h1 className="home-welcome-back">
            Welcome back!
          </h1>

          <div className="home-closets-box">
            <h2 className="home-closets-title">
              Your Closets
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <Link
                to="/my-closet"
                className="home-closet-link"
              >
                <span className="home-closet-link-text">My Closet</span>
                <span className="home-closet-link-arrow">→</span>
              </Link>

              <Link
                to="/friends"
                className="home-closet-link"
              >
                <span className="home-closet-link-text">Group Closet</span>
                <span className="home-closet-link-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="home-signed-out">
          <h1 className="home-welcome-title">
            Welcome to SocialCloset
          </h1>

          <p className="home-welcome-subtitle">
            Your digital closet for organizing, planning, and sharing your style.
          </p>

          <div className="home-google-login-container">
            <GoogleLogin
              onSuccess={handleLogin}
              onError={(err) => console.log(err)}
              text="signin_with"
              shape="rectangular"
              size="large"
              width="400"
              className="google-login-button"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
