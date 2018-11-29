import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Dropdown from 'src/components/dropdown'
import CSS from './ApplicationBox.css'

export default function ApplicationBox({ children, menu }) {
  return (
    <div className={CSS.box}>
      {menu}
      <div className={classNames(CSS.contentWrapper, 'router--scroll-to-top')}>
        <div className={CSS.contentSubWrapper}>{children}</div>
      </div>
    </div>
  )
}

ApplicationBox.propTypes = {
  children: PropTypes.node
}

export function Sidebar(props) {
  return <div className={classNames(CSS.sidebar, props.className)}>{props.children}</div>
}

export function Content(props) {
  return <div className={classNames(CSS.content, props.className)}>{props.children}</div>
}

export function Menu({ children }) {
  return <div className={CSS.menu}>{children}</div>
}

export function MenuItemLink({ children, to, label, icon, external = false }) {
  const Wrapper = props => {
    if (props.to) {
      if (props.external) {
        return (
          <a {...props} href={props.to} target="_blank" rel="noopener noreferrer">
            {props.children}
          </a>
        )
      }
      else {
        return <NavLink {...props} exact activeClassName="active" />
      }
    }
    else {
      return <span {...props} />
    }
  }
  return (
    <Wrapper className={classNames(CSS.menuItem)} to={to} external={external}>
      {icon && <span className={CSS.menuItemIcon}>{icon}</span>}
      {label && <span className={CSS.menuItemLabel}>{label}</span>}
      {children}
    </Wrapper>
  )
}

export function MenuItemButton({ children, onClick, label, icon }) {
  return (
    <span className={classNames(CSS.menuItem)} onClick={onClick}>
      {icon && <span className={CSS.menuItemIcon}>{icon}</span>}
      {label && <span className={CSS.menuItemLabel}>{label}</span>}
      {children}
    </span>
  )
}

export function MenuItemSpacer() {
  return <span className={CSS.menuItemSpacer} />
}

export class MenuItemCollection extends React.Component {
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
            <span
              className={classNames(CSS.menuItem, 'mgi-menu-item-collection')}
              ref="label"
            >
              {icon && <span className={CSS.menuItemIcon}>{icon}</span>}
              {label && <span className={CSS.menuItemLabel}>{label}</span>}
            </span>
          </Dropdown.Trigger>
          <Dropdown.Content>
            {children}
          </Dropdown.Content>
        </Dropdown>
      </React.Fragment>
    )
  }
}
