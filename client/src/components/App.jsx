import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";

import jwt_decode from "jwt-decode";

import "../utilities.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";
import NavBar from "./NavBar";
import ScrollToTop from "./ScrollToTop";

export const UserContext = createContext(null);

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUserInfo({
          name: user.name,
          email: user.email
        });
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setUserInfo({
        name: decodedCredential.name,
        email: decodedCredential.email
      });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    setUserInfo(null);
    post("/api/logout");
  };

  const authContextValue = {
    userId,
    userInfo,
    handleLogin,
    handleLogout,
  };

  return (
    <UserContext.Provider value={authContextValue}>
      <NavBar />
      <div style={{ marginTop: "70px" }}>
        <Outlet />
      </div>
      <ScrollToTop />
    </UserContext.Provider>
  );
};

export default App;
