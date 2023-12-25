import React from "react";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import "./Landing.css";
import { Link } from "react-router-dom";
const BACKEND_LOCAL = "http://localhost:3002";
const BACKEND_REAL = "https://ricefinalconnectapp-2ba2ec808d81.herokuapp.com";
// const BACKEND_URL = BACKEND_LOCAL;
//sth
const BACKEND_URL = BACKEND_REAL;

function Landing() {
  return (
    <div className="landing-container">
      <div className="registration-section">
        <Register />
      </div>
      <div className="login-section">
        <Login />
        <div>
          <Link to={`${BACKEND_URL}/auth/google`}>Or, Login with Google</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
