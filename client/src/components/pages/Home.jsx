import React, { useContext } from "react";

import "../../utilities.css";
import "./Home.css";
import { UserContext } from "../App";

const Home = () => {
  const { userId } = useContext(UserContext);
  return (
    <>
      {userId ? (
        <div style={{ marginTop: "40px" }}>
          <h1>Welcome back!</h1>
          <p>Manage your wardrobe.</p>
        </div>
      ) : (
        <div style={{ marginTop: "40px" }}>
          <h1>Welcome to SocialCloset</h1>
          <p>Your personal fashion companion for organizing and sharing your style.</p>
          <h2>Get Started</h2>
          <p>Sign in with Google to start organizing your closet and sharing your style with friends.</p>
        </div>
      )}
    </>
  );
};

export default Home;
