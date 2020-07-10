import PropTypes from 'prop-types';
import React from 'react';
import { TopMenuItem } from '../TopMenuItem/TopMenuItem';

export function Menu({ entries, ...props }) {
  return entries.map((item) => (
    <TopMenuItem key={item.id} {...item} {...props} />
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
