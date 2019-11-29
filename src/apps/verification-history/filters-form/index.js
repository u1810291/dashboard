import { ReactComponent as IconClose } from 'assets/icon-close.svg';
import Button from 'components/button';
import Card from 'components/card';
import CheckboxGroup from 'components/checkbox-group';
import Items from 'components/items';
import { isEmpty } from 'lodash';
import { getIdentityStatusLabel, IdentityStatuses } from 'models/Identity.model';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { FormattedMessage, injectIntl } from 'react-intl';
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
        label: intl.formatMessage({ id: getIdentityStatusLabel(IdentityStatuses.verified) }),
        value: IdentityStatuses.verified,
      },
      {
        label: intl.formatMessage({ id: getIdentityStatusLabel(IdentityStatuses.reviewNeeded) }),
        value: IdentityStatuses.reviewNeeded,
      },
      {
        label: intl.formatMessage({ id: getIdentityStatusLabel(IdentityStatuses.rejected) }),
        value: IdentityStatuses.rejected,
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
