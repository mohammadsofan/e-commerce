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
        Previous
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
        Next
      </button>
    </li>
  );
  return (
    <nav aria-label="Page navigation example" className="mt-5">
      <ul className="pagination">{result}</ul>
    </nav>
  );
}
