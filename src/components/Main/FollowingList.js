import React, { useState, useEffect } from "react";

function FollowingList({ followedList, addFollowedUser, unfollowUser }) {
  const [usernameInput, setUsernameInput] = useState("");

  return (
    <div>
      <h3>Following</h3>
      {followedList.map((user) => (
        <div key={user.id}>
          <img src="http://placekitten.com/80/80" alt="Profile" />
          <span>User Name: {user.username}</span>
          <button onClick={() => unfollowUser(user.following.username)}>Unfollow</button>
        </div>
      ))}
      <input
        type="text"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
        placeholder="Enter username"
      />
      <button onClick={() => addFollowedUser(usernameInput)}>
        Add to Followed
      </button>
    </div>
  );
}

export default FollowingList;
