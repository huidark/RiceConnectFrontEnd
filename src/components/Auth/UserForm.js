import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserForm({ user: initialUser = {}, onSubmit }) {
  const navigate = useNavigate();

  // Setting up the user state in the JSON format
  const [user, setUser] = useState({
    id: "",
    name: initialUser.name || "",
    username: initialUser.username || "",
    email: initialUser.email || "",
    dateOfBirth: initialUser.dateOfBirth || "",
    address: {
      zipcode: initialUser.address?.zipcode || "",
    },
    phone: initialUser.phone || "",
    website: initialUser.website || "",
    ...initialUser,
  });
  const [JSONusers, setJSONUsers] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setJSONUsers(data);
      });
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "zipcode") {
      setUser({
        ...user,
        address: {
          ...user.address,
          [event.target.name]: event.target.value,
        },
      });
    } else {
      setUser({ ...user, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const birthDate = new Date(user.dateOfBirth);
    const today = new Date();
    const age =
      today.getFullYear() -
      birthDate.getFullYear() -
      (today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
        ? 1
        : 0);

    const registeredUser = JSONusers.find(
      (user) => user.username === user.username
    );
    if (!registeredUser) {
      alert("This username has been registered before. Please try another one");
      return;
    }

    if (age < 18) {
      alert("You must be 18 or older to register.");
      return;
    }
    // Validate account name
    const accountNamePattern = /^[a-zA-Z][a-zA-Z0-9]*$/;
    if (!accountNamePattern.test(user.username)) {
      alert(
        "Account name must start with a letter and can only contain letters and numbers."
      );
      return;
    }

    // Validate email (simple validation)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(user.email)) {
      alert("Invalid email address.");
      return;
    }

    // Validate phone number (simple validation)
    const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!phonePattern.test(user.phone)) {
      alert("Phone number should be in the format XXX-XXX-XXXX.");
      return;
    }

    // Validate passwords match
    if (user.password !== user.passwordConfirmation) {
      alert("Passwords do not match.");
      return;
    }
    if (user.name == "") {
      user.name = "New User";
    }
    onSubmit(user);
    alert("You have successfully registered! Please Log in.");
  };

  return (
    <form onSubmit={handleSubmit}>
      {}
      <p>Display Name</p>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Display Name(optional)"
      />
      <p>Account Name</p>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleChange}
        placeholder="Account Name (Start with letter)"
        required
      />
      <p>Email</p>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email Address"
        required
      />
      <p>Phone</p>

      <input
        type="tel"
        name="phone"
        value={user.phone}
        pattern="^[0-9]{3}-[0-9]{3}-[0-9]{4}$"
        onChange={handleChange}
        placeholder="Phone Number: 111-111-1111"
        required
      />
      <p>Date of Birth</p>
      <input
        type="date"
        name="dateOfBirth"
        value={user.dateOfBirth}
        placeholder="Date of birth!"
        onChange={handleChange}
        required
      />

      <p>Zip</p>

      <input
        type="text"
        name="zipcode"
        value={user.address.zipcode}
        pattern="^[0-9]{5}$"
        onChange={handleChange}
        placeholder="Zipcode should be 5 digits"
        required
      />
      <p>Password</p>

      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="password"
        name="passwordConfirmation"
        value={user.passwordConfirmation}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
