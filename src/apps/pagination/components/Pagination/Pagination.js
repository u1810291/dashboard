import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import ReactPaginate from 'react-paginate';
import { ITEMS_PER_PAGE } from '../../models/Pagination.model';
import { useStyles } from './Pagination.styles';

export function Pagination({ total = 0, offset = 0, onChange }) {
  const intl = useIntl();
  const classes = useStyles();
  const pageCount = Math.ceil(total / ITEMS_PER_PAGE);
  const current = Math.floor(offset / ITEMS_PER_PAGE) || 0;

  const handlePageChange = useCallback((page) => {
    if (onChange) {
      onChange(page.selected * ITEMS_PER_PAGE);
    }
  }, [onChange]);

  return (
    <ReactPaginate
      nextLabel={intl.formatMessage({ id: 'Pagination.next' })}
      previousLabel={intl.formatMessage({ id: 'Pagination.prev' })}
      pageClassName={classes.page}
      breakClassName={classes.page}
      previousClassName={clsx(classes.page, classes.prevNextPage)}
      nextClassName={clsx(classes.page, classes.prevNextPage)}
      activeClassName={clsx(classes.activePage)}
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      forcePage={current}
      onPageChange={handlePageChange}
    />
  );
}
