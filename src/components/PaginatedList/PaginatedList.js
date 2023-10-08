import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./paginatedlist.css";

function reduceStrSize(str, size = 2) {
  const halfsize = Math.round(size / 2);
  if (str.length <= size) return str;
  else return str.slice(0, halfsize) + "..." + str.slice(-halfsize);
}

const PaginatedList = ({ dataList, itemsPerPage, onClickAction }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(dataList.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = dataList.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div>
        {paginatedData.map((item, index) => (
          <div key={index}>
            <a href="#" className="link" onClick={() => onClickAction(item)}>
              {reduceStrSize(item, 20)}
            </a>
          </div>
        ))}
      </div>
      <div>
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default PaginatedList;
