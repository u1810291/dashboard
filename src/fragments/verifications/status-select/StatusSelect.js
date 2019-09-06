import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import Dropdown from 'components/dropdown';
import Spinner from 'components/spinner';
import { ReactComponent as DownArrow } from 'components/select-field/downArrow.svg';

import CSS from './StatusSelect.module.scss';

export default class StatusSelect extends React.Component {
  static defaultProps = {
    isLoading: undefined,
  }

  static propTypes = {
    isLoading: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
  }

  selectStatus = (status) => () => {
    const { refs: { dropdown } } = this;
    dropdown.hide();
    if (this.props.onSelect) {
      this.props.onSelect(status);
    }
  };

  filterStatuses = (status) => ['rejected', 'verified', 'reviewNeeded']
    .filter((item) => item !== status);

  render() {
    const { status, isLoading } = this.props;

    return (
      <div className={CSS.container}>
        {/* eslint-disable-next-line react/no-string-refs */}
        <Dropdown className={classNames(CSS.statusDropdown, CSS[status])} ref="dropdown">
          <Dropdown.Trigger className={CSS.triggerBlock}>
            <div className={CSS.activeStatusLabel}>
              <span className={CSS.statusText}>
                <FormattedMessage id="statusSelect.status" />
              </span>
              <FormattedMessage id={`statuses.${status}`} />
            </div>
            <DownArrow className={CSS.downArrow} />
          </Dropdown.Trigger>
          <Dropdown.Content className={CSS.dropdownContent}>
            <ul className={CSS.dropdownList}>
              {this.filterStatuses(status).map((item) => (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <li
                  key={item}
                  className={classNames(CSS.dropdownItem, CSS[item])}
                  onClick={this.selectStatus(item)}
                  onKeyUp={() => {}}
                >
                  <FormattedMessage id={`statuses.${item}`} />
                </li>
              ))}
            </ul>
          </Dropdown.Content>
        </Dropdown>
        {isLoading && <Spinner className={CSS.spinner} />}
      </div>
    );
  }
}
