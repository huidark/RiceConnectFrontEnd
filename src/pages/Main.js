import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import UserProfile from "../components/Main/UserProfile";
import Article from "../components/Main/Article";
import NewArticleForm from "../components/Main/NewArticleForm";
import SearchBar from "../components/Main/SearchBar";
import FollowingList from "../components/Main/FollowingList";

function Main() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [followedList, setFollowedList] = useState([]);
  const [followerExists, setFollowerExists] = useState(true);
  const [usernameInput, setUsernameInput] = useState("");
  const [articleText, setArticleText] = useState("");
  const [file, setFile] = useState(null);

  const BACKEND_LOCAL = "http://localhost:3002";
  const BACKEND_REAL = "https://ricefinalconnectapp-2ba2ec808d81.herokuapp.com";
  // const BACKEND_URL = BACKEND_LOCAL;
  const BACKEND_URL = BACKEND_REAL;
  useEffect(() => {
    getUser();
    getArticles();
  }, []);

  const getUser = async () => {
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
      setUser({
        username: data.username,
      });
    } catch (error) {
      console.error("fetch error");
    }

    // get the following people
    try {
      const response = await fetch(`${BACKEND_URL}/following`, {
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
      setFollowedList(data.following);
    } catch (error) {
      console.error("fetch error");
    }
  };

  const getArticles = async () => {
    try {
      // get all the articles from author and following
      const response = await fetch(`${BACKEND_URL}/articles`, {
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
      // Todo: setUserArticles here
      setUserArticles(data.articles);
    } catch (error) {
      console.error("fetch error");
    }
  };

  const filteredArticles = userArticles.filter(
    (article) =>
      article.text.includes(searchTerm) || article.author.includes(searchTerm)
  );

  async function addFollowedUser(username) {
    try {
      const response = await fetch(`${BACKEND_URL}/following/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      getUser();
      alert("follower added successfully!");
      getArticles();
    } catch (error) {
      console.error("Email update error:", error);
    }
  }
  async function unfollowUser(username) {
    try {
      const response = await fetch(`${BACKEND_URL}/following/${username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      alert("delete follower successfully!");
      getUser();
      getArticles();
    } catch (error) {
      console.error("Email update error:", error);
    }
  }

  // function unfollowUser(userId) {
  //   setFollowedList((prevList) => prevList.filter((id) => id !== userId));
  //   setFollowedUsersArticles((prevArticles) =>
  //     prevArticles.filter((article) => article.userId !== userId)
  //   );
  // }

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("text", articleText);
    if (file) {
      formData.append("image", file);
    }
    try {
      const response = await fetch(`${BACKEND_URL}/article`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      getArticles();
    } catch (error) {
      console.error("fetch error");
    }
    setArticleText("");
  };

  return (
    <div>
      <div className="main-container">
        <NavBar />
        <div className="main-content">
          <h1>Welcome, {user?.username}</h1>
          <UserProfile user={user} />
          <SearchBar onSearch={setSearchTerm} />
          <h3>New post:</h3>
          <div className="new-article-form">
            <textarea
              value={articleText}
              placeholder="Write something to post! You can use the ChooseFile button to add pic to the post(otherwise we will select a default pic for you!)"
              onChange={(e) => setArticleText(e.target.value)}
            ></textarea>
            <button onClick={handlePost}>Post</button>
            <button
              onClick={() => {
                setArticleText("");
                setFile(null);
                console.log("cancel be clicked");
              }}
            >
              Cancel
            </button>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          {filteredArticles.map((article) => (
            <Article article={article} />
          ))}
          <p style={{ textAlign: "center", fontWeight: "bold" }}>Page 1</p>
        </div>
        <div className="following-list">
          <div>
            <h3>Following</h3>
            {followedList.map((followeruser) => (
              <div key={followeruser.id}>
                <img src="http://placekitten.com/80/80" alt="Profile" />
                <span>User Name: {followeruser.username}</span>
                <button onClick={() => unfollowUser(followeruser.username)}>
                  Unfollow
                </button>
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
          <div>
            {followerExists ? (
              <p></p>
            ) : (
              <p style={{ color: "red" }}>
                User already in the list or doesn't exist. Please try again with
                the JSON users.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
