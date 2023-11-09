import React, { useState } from "react";
import "../styles/SearchBar.css";
import {FaSearch} from "react-icons/fa";

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
    <div className="input-wrapper">
      <input
        placeholder="Type to search..."
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <FaSearch id="search-icon" onClick={onSearch}/>
    </div>
  );
};

export default SearchBar;
