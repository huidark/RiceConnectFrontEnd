import React from "react";
import UserForm from "./UserForm";

function Register() {
  const handleRegistration = async (user) => {
    user.id = 120;
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    console.log("User name is " + user.username);
    const payload = {
      username: user.username,
      email: user.email,
      dob: user.dateOfBirth,
      phone: user.phone,
      zipcode: user.address.zipcode,
      password: user.password,
    };
    const BACKEND_LOCAL = "http://localhost:3002";
    const BACKEND_REAL =
      "https://ricefinalconnectapp-2ba2ec808d81.herokuapp.com";
    // const BACKEND_URL = BACKEND_LOCAL;
    const BACKEND_URL = BACKEND_REAL;

    try {
      // Make a POST request to the backend endpoint
      const response = await fetch(`${BACKEND_URL}/register`, {
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
      console.log("Registration successful + ", data);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <UserForm onSubmit={handleRegistration} />
    </div>
  );
}

export default Register;
