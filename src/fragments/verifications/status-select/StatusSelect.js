import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import Dropdown from 'components/dropdown'
import Spinner from 'components/spinner'
import { ReactComponent as DownArrow } from 'components/select-field/downArrow.svg'

import CSS from './StatusSelect.module.scss'

export default class StatusSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status || 'manualReview',
    };
  }

  selectStatus = status => () => {
    this.setState({ status });
    this.refs.dropdown.hide();
    if (this.props.onSelect) {
      this.setState({ status: 'pending' });
      this.props.onSelect(status);
    }
  };

  filterStatuses(status) {
    return ['rejected', 'accepted', 'manualReview'].filter(item => item !== status);
  }

  render() {
    const { status } = this.state;

    return (
      <div className={CSS.container}>
        <Dropdown className={classNames(CSS.statusDropdown, CSS[status])} ref="dropdown">
          <Dropdown.Trigger className={CSS.triggerBlock}>
            <div className={CSS.activeStatusLabel}>
               <span className={CSS.statusText}>
                  <FormattedMessage id="statusSelect.status"/>
               </span>
              <FormattedMessage id={`statuses.${status}`}/>
            </div>
            <DownArrow className={CSS.downArrow} />
          </Dropdown.Trigger>
          <Dropdown.Content className={CSS.dropdownContent}>
            <ul className={CSS.dropdownList}>
              {this.filterStatuses(status).map(item => (
                <li
                  key={item}
                  className={classNames(CSS.dropdownItem, CSS[item])}
                  onClick={this.selectStatus(item)}
                >
                  <FormattedMessage id={`statuses.${item}`}/>
                </li>
              ))}
            </ul>
          </Dropdown.Content>
        </Dropdown>
        {this.props.isLoading && <Spinner className={CSS.spinner}/>}
      </div>
    );
  }
}

StatusSelect.propTypes = {
  status: PropTypes.string,
  onSelect: PropTypes.func,
};
