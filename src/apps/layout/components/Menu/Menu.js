import PropTypes from 'prop-types';
import React from 'react';
import { TopMenuItem } from '../TopMenuItem/TopMenuItem';

export function Menu({ entries }) {
  return entries.map((item) => (
    <TopMenuItem key={item.id} {...item} />
  ));
}

Menu.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
      className: PropTypes.string,
      show: PropTypes.bool,
      handler: PropTypes.func,
      icon: PropTypes.ReactComponent,
    }),
  ).isRequired,
};
