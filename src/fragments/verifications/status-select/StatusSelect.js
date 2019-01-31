import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import StatusLabel from 'src/fragments/verifications/status-label'
import Dropdown from 'src/components/dropdown'
import CSS from './StatusSelect.scss'

export default class StatusSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.status || ''
    }
  }

  selectStatus = status => () => {
    this.setState({ status })
    this.refs.dropdown.hide()
    if (this.props.onSelect) {
      this.props.onSelect(status)
    }
  }

  render() {
    return (
      <div className={CSS.container}>
        <span className={CSS.statusText}>
          <FormattedMessage id="statusSelect.status" />
        </span>
        <Dropdown className={CSS.menuItemDropdown} ref="dropdown">
          <div className={classNames(CSS.activeStatusLabel, this.state.status)}>
            <StatusLabel status={this.state.status} coloredText={true} />
          </div>
          <Dropdown.Trigger>
            <span className={CSS.changeText}>
              (<FormattedMessage id="statusSelect.change" />)
            </span>
          </Dropdown.Trigger>
          <Dropdown.Content className={CSS.dropdownContent}>
            <ul className={CSS.dropdownList}>
              <li
                className={CSS.dropdownItem}
                onClick={this.selectStatus('verified')}
              >
                <StatusLabel status="verified" />
              </li>
              <li
                className={CSS.dropdownItem}
                onClick={this.selectStatus('unverified')}
              >
                <StatusLabel status="unverified" />
              </li>
              <li
                className={CSS.dropdownItem}
                onClick={this.selectStatus('manual')}
              >
                <StatusLabel status="manual" />
              </li>
              <li
                className={CSS.dropdownItem}
                onClick={this.selectStatus('fraudulent')}
              >
                <StatusLabel status="fraudulent" />
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
