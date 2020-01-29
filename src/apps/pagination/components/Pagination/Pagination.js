import classNames from 'classnames';
import React, { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { ITEMS_PER_PAGE } from '../../models/Pagination.model';
import CSS from './Pagination.module.scss';

export function Pagination({ total = 0, offset = 0, onChange }) {
  const pageCount = Math.ceil(total / ITEMS_PER_PAGE);
  const current = Math.floor(offset / ITEMS_PER_PAGE) || 0;

  const handlePageChange = useCallback((page) => {
    if (onChange) {
      onChange(page.selected * ITEMS_PER_PAGE);
    }
  }, [onChange]);

  return (
    <ReactPaginate
      pageClassName={CSS.page}
      breakClassName={CSS.page}
      previousClassName={classNames(CSS.page, CSS.prevNextPage)}
      nextClassName={classNames(CSS.page, CSS.prevNextPage)}
      activeClassName={classNames(CSS.activePage)}
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      forcePage={current}
      onPageChange={handlePageChange}
    />
  );
}
