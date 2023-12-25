import React from "react";

function SearchBar({ onSearch }) {
  return (
    <div className="search-bar">
        <h3>Search:</h3>
      <input
        type="text"
        placeholder="Search by text or author"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
