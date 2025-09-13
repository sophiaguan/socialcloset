import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom";

import "../../utilities.css";
import "./Home.css";
import { UserContext } from "../App";

const Home = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <>
      {userId ? (
        <button
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )}
      <h1>SocialCloset</h1>

      <div style={{ marginBottom: "30px" }}>
        <Link
          to="/my-closet"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "16px",
            display: "inline-block"
          }}
        >
          My Closet
        </Link>
      </div>
    </>
  );
};

export default Home;
