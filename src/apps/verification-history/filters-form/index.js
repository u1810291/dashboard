import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';
import { DateRangePicker } from 'react-dates';

import Button from 'components/button';
import Items from 'components/items';
import Card from 'components/card';
import CheckboxGroup from 'components/checkbox-group';
import isFeatureEnabled from 'lib/isFeatureEnabled';
import { ReactComponent as IconClose } from 'assets/icon-close.svg';

import { ReactComponent as FilterIcon } from './filter.svg';

import CSS from './filters-form.module.scss';

class VerificationsFiltersForm extends Component {
  static defaultProps = {
    'dateCreated[end]': undefined,
    'dateCreated[start]': undefined,
    status: undefined,
  }

  static propTypes = {
    'dateCreated[end]': PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({}),
    ]),
    'dateCreated[start]': PropTypes.oneOfType(
      [PropTypes.string,
        PropTypes.shape({})],
    ),
    onChange: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  }

  constructor() {
    super();
    this.state = {
      focusedInput: null,
    };
  }

  get VERIFICATION_STATUS_OPTIONS() {
    const { intl } = this.props;
    return [
      {
        label: intl.formatMessage({ id: 'statuses.verified' }),
        value: 'verified',
      },
      {
        label: intl.formatMessage({ id: 'statuses.reviewNeeded' }),
        value: 'reviewNeeded',
      },
      {
        label: intl.formatMessage({ id: 'statuses.rejected' }),
        value: 'rejected',
      },
    ];
  }

  onDatesChange = ({ startDate, endDate }) => {
    const params = {};
    if (startDate) {
      startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      params['dateCreated[start]'] = startDate;
    }
    if (endDate) {
      endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
      params['dateCreated[end]'] = endDate;
    }

    if (!isEmpty(params)) {
      this.props.onChange(params);
    }
  }

  render() {
    const {
      'dateCreated[end]': endDate,
      'dateCreated[start]': startDate,
      intl,
      onChange,
      onClear,
      status,
    } = this.props;
    const { focusedInput } = this.state;
    return (
      <Card>
        <Items flow="row">
          <Items justifyContent="start" gap={1} align="center">
            <FilterIcon />
            <h3>
              <FormattedMessage id="filters" />
            </h3>
          </Items>

          <div className={CSS.datePicker}>
            <Items flow="row" gap={1}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <strong>
                  <FormattedMessage id="identities.filters.labels.date-filter" />
                </strong>
                <DateRangePicker
                  startDate={startDate}
                  startDateId="startDate"
                  isOutsideRange={(day) => moment().diff(day) < 1000}
                  endDate={endDate}
                  endDateId="endDate"
                  onDatesChange={this.onDatesChange}
                  focusedInput={focusedInput}
                  hideKeyboardShortcutsPanel
                  onFocusChange={(input) => {
                    this.setState({ focusedInput: input });
                  }}
                  appendToBody
                  numberOfMonths={1}
                />
              </label>
            </Items>
          </div>
          {isFeatureEnabled('STATUSES') && (
            <CheckboxGroup
              label={intl.formatMessage({
                id: 'identities.filters.labels.status-filter',
              })}
              name="status"
              values={status}
              items={this.VERIFICATION_STATUS_OPTIONS}
              onChange={(value) => {
                onChange({ status: value });
              }}
            />
          )}

          <section>
            <Button
              buttonStyle="no-borders invisible"
              onClick={onClear}
            >
              <Items justifyContent="start" align="center" gap={1}>
                <IconClose />
                <FormattedMessage id="clear-all" />
              </Items>
            </Button>
          </section>
        </Items>
      </Card>
    );
  }
}

export default injectIntl(VerificationsFiltersForm);
