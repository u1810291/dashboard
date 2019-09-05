import PropTypes from 'prop-types';
import React from 'react';

import Dropdown from 'components/dropdown';
import CSS from './ApplicationMenu.module.scss';

export default class MenuItemCollection extends React.Component {
  static defaultProps = {
    icon: '',
    label: '',
  }

  static propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { icon, label, children } = this.props;
    return (
      <>
        <Dropdown className={CSS.menuItemDropdown}>
          <Dropdown.Trigger>
            {/* eslint-disable-next-line react/no-string-refs */}
            <span className={CSS.menuItem} ref="label">
              {icon && <span className={CSS.menuItemIcon}>{icon}</span>}
              {label && <span className={CSS.menuItemLabel}>{label}</span>}
            </span>
          </Dropdown.Trigger>
          <Dropdown.Content>{children}</Dropdown.Content>
        </Dropdown>
      </>
    );
  }
}
