import React, { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onSearch = () => {
    console.log(input);
  };

  return (
    <div>
      <input
        type="search"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
