import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie library

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const BACKEND_LOCAL = "http://localhost:3002";
  const BACKEND_REAL = "https://ricefinalconnectapp-2ba2ec808d81.herokuapp.com";
  // const BACKEND_URL = BACKEND_LOCAL;
  const BACKEND_URL = BACKEND_REAL;

  const handleLogin = async () => {
    const payload = { username: username, password: password };

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login successful", data);

      if (data.result === "success") {
        // localStorage.setItem(
        //   "loggedInUser",
        //   JSON.stringify({ username: data.username })
        // );
        // since we need to use google auth, now we are using cookies\
        Cookies.set("username", username, { expires: 7 });
        // TODO: Change to the main
        navigate("/profile");
      } else {
        alert("Invalid login credentials. Please try again");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login request failed. Please try again");
    }
  };
  return (
    <div>
      <h1>Log in</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}
export default Login;
