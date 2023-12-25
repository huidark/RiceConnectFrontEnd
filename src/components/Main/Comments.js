import React, { useState } from "react";

function Comments() {
  const [showComments, setShowComments] = useState(false);

  const hardcodedComments = [
    { author: "Mack Joyner", text: "This is a great article!" },
    {
      author: "Hailey Xia",
      text: "Thanks for sharing!",
    },
  ];

  return (
    <div className="comments-section">
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && (
        <div className="comments-list">
          {hardcodedComments.map((comment, index) => (
            <div key={index} className="comment">
              <p>
                <strong>{comment.author}</strong>: {comment.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;
