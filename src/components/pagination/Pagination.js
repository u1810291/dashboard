import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';

import CSS from './Pagination.module.scss';

export default function Pagination({
  pageClassName,
  prevNextClassName,
  activeClassName,
  ...props
}) {
  return (
    <ReactPaginate
      pageClassName={classNames(CSS.page, pageClassName)}
      breakClassName={classNames(CSS.page, pageClassName)}
      previousClassName={classNames(
        CSS.page,
        CSS.prevNextPage,
        pageClassName,
        prevNextClassName,
      )}
      nextClassName={classNames(
        CSS.page,
        CSS.prevNextPage,
        pageClassName,
        prevNextClassName,
      )}
      activeClassName={classNames(CSS.activePage, activeClassName)}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    />
  );
}

Pagination.propTypes = {
  activeClassName: PropTypes.string,
  pageClassName: PropTypes.string,
  prevNextClassName: PropTypes.string,
};

Pagination.defaultProps = {
  activeClassName: '',
  pageClassName: '',
  prevNextClassName: '',
};
