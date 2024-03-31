import React from "react";

export default function Pagination({ num, getProducts, setCurPage, curPage }) {
  let result = [];

  const handleOnCLick = (page) => {
    setCurPage(page);
    getProducts(page);
  };
  result.push(
    <li className="page-item" key={0}>
      <button
        className={`page-link ${curPage == 1 ? "disabled" : ""}`}
        onClick={() => handleOnCLick(curPage - 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14px"
          height="14px"
          viewBox="0 0 20 20"
        >
          <path fill="green" d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z" />
        </svg>
      </button>
    </li>
  );
  for (let i = 1; i <= num; i++) {
    result.push(
      <li className="page-item" key={i}>
        <button
          className={`page-link ${curPage == i ? "active" : ""}`}
          onClick={() => handleOnCLick(i)}
        >
          {i}
        </button>
      </li>
    );
  }
  result.push(
    <li className="page-item" key={num + 1}>
      <button
        className={`page-link ${curPage == num ? "disabled" : ""} `}
        onClick={() => handleOnCLick(curPage + 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14px"
          height="14px"
          viewBox="0 0 20 20"
        >
          <path fill="green" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z" />
        </svg>
      </button>
    </li>
  );
  return (
    <nav aria-label="Page navigation example" className="mt-5">
      <ul className="pagination">{result}</ul>
    </nav>
  );
}
