import { TopMenuItem } from 'apps/navigation/TopMenuItem';
import PropTypes from 'prop-types';
import React from 'react';

export function Menu({ entries }) {
  return entries.map((props) => (
    <TopMenuItem
      key={props.id || `${props.to}-${props.label}`}
      {...props}
    />
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
