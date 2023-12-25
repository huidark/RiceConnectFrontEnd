import React, { useState } from "react";

function UpdateProfile({ onEmailUpdate, onPhoneUpdate, onZipcodeUpdate }) {
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newZipcode, setNewZipcode] = useState("");

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleZipcodeChange = (e) => {
    setNewZipcode(e.target.value);
  };

  const submitEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(newEmail)) {
      alert("Invalid email address. It should be xxx@xxx.xxx");
      return;
    }
    onEmailUpdate(newEmail);
  };

  const submitPhone = () => {
    const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (!phonePattern.test(newPhone)) {
      alert("Phone number should be in the format XXX-XXX-XXXX.");
      return;
    }
    onPhoneUpdate(newPhone);
  };

  const submitZipcode = () => {
    const zipcodePattern = /^[0-9]{5}$/;
    if (!zipcodePattern.test(newZipcode)) {
      alert("Invalid zipcode. Should be 5 digits number");
      return;
    }
    onZipcodeUpdate(newZipcode);
  };

  return (
    <div className="update-profile-form">
      <div>
        <label>Email:</label>
        <input
          type="email"
          className="input-field"
          value={newEmail}
          onChange={handleEmailChange}
        />
        <button onClick={submitEmail}>Update Email</button>
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="tel"
          className="input-field"
          value={newPhone}
          onChange={handlePhoneChange}
        />
        <button onClick={submitPhone}>Update Phone</button>
      </div>
      <div>
        <label>Zipcode:</label>
        <input
          type="text"
          className="input-field"
          value={newZipcode}
          onChange={handleZipcodeChange}
        />
        <button onClick={submitZipcode}>Update Zipcode</button>
      </div>
    </div>
  );
}

export default UpdateProfile;
