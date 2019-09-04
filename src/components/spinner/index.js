import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import CSS from './style.module.scss';

export default function Spinner({ className, size }) {
  return (
    <div className={classNames(CSS.spinner, `spinner-${size}`, className)} />
  );
}

Spinner.propTypes = {
  size: PropTypes.string,
};

Spinner.defaultProps = {
  size: 'small',
};
