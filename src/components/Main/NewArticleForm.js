import React, { useState } from "react";

function NewArticleForm({ onPost }) {
  const [articleText, setArticleText] = useState("");
  const [file, setFile] = useState(null);

  const handlePost = () => {
    const formData = new FormData();
    formData.append("text", articleText);
    if (file) {
      formData.append("image", file);
    }
    onPost(formData);
    setArticleText("");
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="new-article-form">
      <textarea
        value={articleText}
        placeholder="Write something to post!"
        onChange={(e) => setArticleText(e.target.value)}
      ></textarea>
      <button onClick={handlePost}>Post</button>
      <button
        onClick={() => {
          setArticleText("");
          setFile(null);
        }}
      >
        Cancel
      </button>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default NewArticleForm;
