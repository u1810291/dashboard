import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import StatusLabel from 'src/fragments/status-label'
import Dropdown from 'src/components/dropdown'
import CSS from './StatusSelect.scss'

export default class StatusSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.status || ''
    }
  }

  selectStatus = (status) => () => {
    this.setState({ status })
    this.refs.dropdown.hide();
    if (this.props.onSelect) {
      this.props.onSelect(status)
    }
  }

  render() {
    return (
      <div>
        <Dropdown className={CSS.menuItemDropdown} ref="dropdown">
          <div className={classNames(CSS.activeStatusLabel, this.state.status)}>
            <StatusLabel status={this.state.status}/>
          </div>
          <Dropdown.Trigger>
          <span>
            (change)
          </span>
          </Dropdown.Trigger>
          <Dropdown.Content className={CSS.dropdownContent}>
            <ul>
              <li className={CSS.dropdownItem} onClick={this.selectStatus('verified')}>
                <StatusLabel status="verified"/>
              </li>
              <li className={CSS.dropdownItem} onClick={this.selectStatus('unverified')}>
                <StatusLabel status="unverified"/>
              </li>
              <li className={CSS.dropdownItem} onClick={this.selectStatus('manual-review')}>
                <StatusLabel status="manual-review"/>
              </li>
            </ul>
          </Dropdown.Content>
        </Dropdown>
      </div>
    )
  }
}

StatusSelect.propTypes = {
  status: PropTypes.string,
  onSelect: PropTypes.func
}
