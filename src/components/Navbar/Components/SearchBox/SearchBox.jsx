import React, { useState } from "react";
import style from "./SearchBox.module.css";
import { useNavigate } from "react-router-dom";
export default function SearchBox() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleClear = () => {
    setSearch("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/products", { state: { search } });
  };
  return (
    <div>
      <form
        className={`d-flex gap-2 ${style.searchBox}`}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleChange}
          className={style.searchInput}
          placeholder="Search about product..."
        />
        <button type="submit" className="btn btn-outline-success py-0 px-1">
          Search
        </button>
        {search && (
          <button
            className={`btn p-0 m-0 ${style.clear}`}
            onClick={handleClear}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="red"
                d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
              />
            </svg>
          </button>
        )}
      </form>
    </div>
  );
}
