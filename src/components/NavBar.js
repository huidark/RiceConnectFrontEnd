import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const BACKEND_LOCAL = "http://localhost:3002";
  const BACKEND_REAL = "https://ricefinalconnectapp-2ba2ec808d81.herokuapp.com";
  // const BACKEND_URL = BACKEND_LOCAL;
  const BACKEND_URL = BACKEND_REAL;

  const handleLogout = () => {
    fetch(`${BACKEND_URL}/logout`, {
      method: "PUT",
      credentials: "include", // Include credentials to send cookies
    })
      .then((response) => {
        if (response.ok) {
          document.cookie =
            "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          navigate("/landing");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div className="navBar">
      <Link to="/main">Main</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default NavBar;
