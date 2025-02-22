import { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import './styles.scss';

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  initialPage: PropTypes.number,
  onPageChange: PropTypes.func
};

export default function Pagination({ totalItems, pageSize = 10, initialPage = 1, onPageChange }) {
  const totalPages = getFlooredToatalPages(totalItems, pageSize);
  const [currentPage, setCurrentPage] = useState(initialPage);

  function onNextpageClick() {
    const nextPage = getNextPage(currentPage, totalPages);
    setCurrentPage(nextPage);
  }

  function onPreviousPageClick() {
    const prevPage = getPreviousePage(currentPage);
    setCurrentPage(prevPage);
  }

  function onInitialPageClick() {
   const initialPage1 = getInitialPage(initialPage);
    setCurrentPage(initialPage1);
  }

  function onFinalPageClick() {
     const finalPage = getFinalPage(currentPage, totalPages);
     setCurrentPage(finalPage);
  }

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  return (
    <div className="mvl-paginator">
      <div className="mvl-paginator__actions">
        <button
          className="pagination_button"
          disabled={isFirstPage(currentPage)}
          onClick={onPreviousPageClick}>
          <BiChevronLeft /> Previous
        </button>

        <button
          className="pagination_button"
          onClick={onInitialPageClick}>
            {initialPage}
        </button>

        <span className="mvl-paginator__text">...</span>

        <button
          className="pagination_button"
          onClick={onPreviousPageClick}>
            {currentPage-1}
        </button>
      
        <button
          className="pagination_button"
          >
            {currentPage}
        </button>

        <button
          className="pagination_button"
          onClick={onNextpageClick}>
            {currentPage+1}
        </button>


        <span className="mvl-paginator__text">...</span>

        <button
          className="pagination_button"
          onClick={onFinalPageClick}>
            {totalPages}
        </button>

        <button
          className="buttons"
          disabled={isLastPage(currentPage, totalPages)}
          onClick={onNextpageClick}>
          Next
          <BiChevronRight />
        </button>
      </div>
    </div>
  );
}

function isFirstPage(currentPage) {
  return currentPage === 1;
}

function isLastPage(currentPage, maxPage) {
  return currentPage === maxPage;
}

function getPreviousePage(currentPage) {
  return currentPage > 1 ? currentPage - 1 : currentPage;
}

function getNextPage(currentPage, maxPage) {
  return currentPage < maxPage ? currentPage + 1 : maxPage;
}

function getInitialPage(currentPage, initialPage) {
  return currentPage > 1 ? initialPage : initialPage;
}

function getFinalPage(currentPage, maxPage){
  return currentPage < maxPage ? maxPage : maxPage;
}


function getFlooredToatalPages(totalItems, pageSize) {
  return Math.floor(getToatalPages(totalItems, pageSize));
}

function getToatalPages(totalItems, pageSize) {
  return totalItems / pageSize;
}
