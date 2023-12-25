import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import UpdateProfile from "../components/Profile/UpdateProfile";
import Cookies from "js-cookie";

function Profile() {
  const [headline, setHeadline] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [dob, setDob] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const BACKEND_LOCAL = "http://localhost:3002";
  const BACKEND_REAL = "https://ricefinalconnectapp-2ba2ec808d81.herokuapp.com";
  // const BACKEND_URL = BACKEND_LOCAL;
  const BACKEND_URL = BACKEND_REAL;

  const getCookieValue = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null;
  };

  const navigate = useNavigate();
  let usernameFromCookie = decodeURIComponent(
    document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    )
  );
  useEffect(() => {
    // Define a function to handle the decoding with a delay
    const decodeUsername = () => {
      setTimeout(() => {
        usernameFromCookie = decodeURIComponent(
          document.cookie.replace(
            /(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          )
        );
        // console.log("1");
        // console.log(usernameFromCookie);
        // console.log("last try: " + Cookies.get("username"));
        // console.log("last try2: " + JSON.stringify(Cookies.get()));
        // if (!usernameFromCookie) {
        //   console.log("2");
        //   alert("Please log in first!");
        //   navigate("/");
        // }

        handleFetchHeadline();
      }, 500); // 500 milliseconds delay
    };
    decodeUsername();
  }, [avatar, navigate]);

  const handleFetchHeadline = async () => {
    // headline
    try {
      const response = await fetch(`${BACKEND_URL}/headline`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setHeadline(data.headline);
      setName(data.username);
    } catch (error) {
      console.error("fetch error");
    }
    // email
    try {
      const response = await fetch(`${BACKEND_URL}/email`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setEmail(data.email);
    } catch (error) {
      console.error("fetch error");
    }
    //zipcode
    try {
      const response = await fetch(`${BACKEND_URL}/zipcode`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setZipcode(data.zipcode);
    } catch (error) {
      console.error("fetch error");
    }

    //dob
    try {
      const response = await fetch(`${BACKEND_URL}/dob`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDob(data.dob);
    } catch (error) {
      console.error("fetch error");
    }

    //avatar
    try {
      const response = await fetch(`${BACKEND_URL}/avatar`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAvatar(data.avatar);
    } catch (error) {
      console.error("fetch error");
    }

    //phone
    try {
      const response = await fetch(`${BACKEND_URL}/phone`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPhone(data.phone);
    } catch (error) {
      console.error("fetch error");
    }
  };

  // upload the avatar
  function handleImageChange(e) {
    const file = e.target.files[0]; // Get the selected file from the input

    if (file) {
      const formData = new FormData(); // Create a FormData object to send the file
      formData.append("image", file);

      fetch(`${BACKEND_URL}/avatar`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          alert("Successfully upload the avatar");
          handleFetchHeadline();
          console.log("Image uploaded successfully:", data);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  }

  const handleEmailUpdate = async (newEmail) => {
    try {
      const response = await fetch(`${BACKEND_URL}/email`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: newEmail }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setEmail(data.email);
      alert("Email updated successfully!");
    } catch (error) {
      console.error("Email update error:", error);
    }
  };

  const handlePhoneUpdate = async (newPhone) => {
    try {
      const response = await fetch(`${BACKEND_URL}/phone`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ phone: newPhone }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPhone(data.phone);
      alert("Phone number updated successfully!");
    } catch (error) {
      console.error("Phone update error:", error);
    }
  };

  const handleZipcodeUpdate = async (newZipcode) => {
    try {
      const response = await fetch(`${BACKEND_URL}/zipcode`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ zipcode: newZipcode }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setZipcode(data.zipcode);
      alert("Zipcode updated successfully!");
    } catch (error) {
      console.error("Zipcode update error:", error);
    }
  };
  const handleLinkClick = (isLinked) => {
    if (isLinked === "true") {
      // Perform unlinking action here
      // For now, just show a success message
      alert("Successfully unlink with Google");
    } else {
      // Perform linking action here
      // For now, just show a success message
      alert("Successfully link with Google");
    }
  };
  return (
    <div className="profile-container">
      <NavBar />
      <div className="user-info">
        <img
          src={avatar}
          alt={usernameFromCookie}
          style={{ maxWidth: "150px", maxHeight: "150px" }}
        />
        <p>Update your avatar:</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
        />

        <h3>User's Name: </h3>
        <h3>{name}</h3>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Zipcode: {zipcode}</p>
        <p>Headline: {headline}</p>
        <p>Date of Birth: {dob}</p>
        {/* <p>Avatar URL: {avatar}</p> */}
        <p>Password: *******</p>
        {dob === "No dob found from Google Auth" ? (
          <p>
            <a href="#" onClick={() => handleLinkClick("true")}>
              {"Unlink with Google"}
            </a>
          </p>
        ) : (
          <p>
            <a href="#" onClick={() => handleLinkClick("false")}>
              {"link with Google"}
            </a>
          </p>
        )}
      </div>
      <div className="user-form">
        <h3>Update the profile</h3>
        <UpdateProfile
          onEmailUpdate={handleEmailUpdate}
          onPhoneUpdate={handlePhoneUpdate}
          onZipcodeUpdate={handleZipcodeUpdate}
        />
      </div>
    </div>
  );
}

export default Profile;
