import React from "react";

function UserListItem({ user }) {
  const defaultProfilePic = "http://placekitten.com/152/152";

  return (
    <div className="user-list-item">
      <img src={defaultProfilePic} alt={user?.name} />
      <h3>{user?.name}</h3>
      <p>{user?.company?.catchPhrase}</p>
      <button>Unfollow</button>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserListItem key={user?.id} user={user} />
      ))}
      <div>
        <input type="text" placeholder="Add user by name..." />
        <button>Add to Followed List</button>
      </div>
    </div>
  );
}

export default UserList;
