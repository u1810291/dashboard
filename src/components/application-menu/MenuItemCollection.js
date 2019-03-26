import React from 'react'
import Dropdown from 'src/components/dropdown'
import CSS from './ApplicationMenu.scss'

export default class MenuItemCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { icon, label, children } = this.props
    return (
      <React.Fragment>
        <Dropdown className={CSS.menuItemDropdown}>
          <Dropdown.Trigger>
            <span className={CSS.menuItem} ref="label">
              {icon && <span className={CSS.menuItemIcon}>{icon}</span>}
              {label && <span className={CSS.menuItemLabel}>{label}</span>}
            </span>
          </Dropdown.Trigger>
          <Dropdown.Content>{children}</Dropdown.Content>
        </Dropdown>
      </React.Fragment>
    )
  }
}
