import React, { useState } from "react";

function Article({ article }) {
  const defaultArticleImage =
    "https://imgcdn.yicai.com/uppics/images/2021/01/302ae706a4b9f0f643eb2e924f43fda9.jpg";

  const [showComments, setShowComments] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState("");
  const BACKEND_LOCAL = "http://localhost:3002";
  const BACKEND_REAL = "https://ricefinalconnectapp-2ba2ec808d81.herokuapp.com";
  // const BACKEND_URL = BACKEND_LOCAL;
  const BACKEND_URL = BACKEND_REAL;

  const handlePostUpdate = (e) => {
    setNewPost(e.target.value);
  };

  const handleCommentUpdate = (e) => {
    setNewComment(e.target.value);
  };

  const submitUpdate = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/articles/${article.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text: newPost }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      alert("successfully update the article!");
      window.location.reload(false);
    } catch (error) {
      console.error("Phone update error:", error);
    }
  };
  const submitComment = async () => {
    // submit comment
    try {
      const response = await fetch(`${BACKEND_URL}/articles/${article.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text: newComment, commentId: -1 }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      alert("successfully send the comment!");
      window.location.reload(false);
    } catch (error) {
      console.error("Phone update error:", error);
    }
  };
  return (
    <div className="article">
      <p>Author: {article.author}</p>
      <img
        src={article.pic ? article.pic : defaultArticleImage}
        style={{ maxWidth: "500px", maxHeight: "500px" }}
        alt="article pic"
      />
      <p>{article?.text}</p>
      <p>Time: {article.date}</p>
      <div className="comments-section">
        <button onClick={() => setShowComments(!showComments)}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        {showComments && (
          <div className="comments-list">
            {article.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p>
                  <strong>{comment.author}</strong>: {comment.text}
                </p>
              </div>
            ))}
          </div>
        )}{" "}
      </div>
      <p>
        <input
          type="newPost"
          className="input-field"
          placeholder="You can edit your post here and then click the button to submit!"
          value={newPost}
          onChange={handlePostUpdate}
        />
        <button onClick={submitUpdate}>Edit Article</button>
      </p>
      <p>
        <input
          type="newComment"
          className="input-field"
          placeholder="Write some comments and then click the Leave Comment button!"
          value={newComment}
          onChange={handleCommentUpdate}
        />
        <button onClick={submitComment}>Leave Comment</button>
      </p>
    </div>
  );
}

export default Article;
