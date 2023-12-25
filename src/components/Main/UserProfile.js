import React, { useState, useEffect } from "react";

function UserProfile({ user }) {
  const defaultProfilePic = "http://placekitten.com/153/153";

  // First, check localStorage for the saved status.
  const savedStatus = localStorage.getItem("userStatus");

  // Set the initial state value based on the order of local->json->hardcoded
  const initialStatus = savedStatus 
    || user?.company?.catchPhrase 
    || "I am a new user!";
  
  const [status, setStatus] = useState(initialStatus);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    // Whenever the status changes, update localStorage.
    localStorage.setItem("userStatus", status);
  }, [status]);

  function handleUpdateStatus() {
    setStatus(newStatus);
    setNewStatus("");
  }

  return (
    <div>
      <img src={defaultProfilePic} alt={user?.name} />
      <p>Status: {status}</p>
      <label htmlFor="status-input">Update Status: </label>
      <textarea
        id="status-input"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        placeholder="Type your new status"
      ></textarea>
      <button onClick={handleUpdateStatus}>Update Status</button>
    </div>
  );
}

export default UserProfile;
