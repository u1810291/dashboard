import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import CSS from './ApplicationMenu.module.scss';

export default function MenuItemLink({
  children,
  to,
  label,
  icon,
  external = false,
  noActive = false,
}) {
  // eslint-disable-next-line no-shadow
  const Wrapper = ({ external, noActive, ...props }) => {
    if (props.to) {
      if (external) {
        return (
          <a
            {...props} // eslint-disable-line react/jsx-props-no-spreading
            href={props.to}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.children}
          </a>
        );
      } else {
        return (
          <NavLink
            activeClassName="active"
            exact
            {...props} // eslint-disable-line react/jsx-props-no-spreading
          />
        );
      }
    } else {
      return <span {...props} />; // eslint-disable-line react/jsx-props-no-spreading
    }
  };

  return (
    <Wrapper
      className={classNames(CSS.menuItem, { 'no-active': noActive })}
      to={to}
      external={external}
    >
      {icon && <span className={CSS.menuItemIcon}>{icon}</span>}
      {label && <span className={CSS.menuItemLabel}>{label}</span>}
      {children}
    </Wrapper>
  );
}

MenuItemLink.propTypes = {
  external: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string,
  noActive: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

MenuItemLink.defaultProps = {
  external: false,
  icon: '',
  label: '',
  noActive: false,
};
