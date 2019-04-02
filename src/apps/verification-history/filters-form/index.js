import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import Button from 'src/components/button'
import CheckboxGroup from 'src/components/checkbox-group'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import { isEmpty } from 'lodash'
import { isFeatureEnabled } from 'src/lib/isFeatureEnabled'
import FilterIcon from './filter.svg'

import 'react-dates/lib/css/_datepicker.css'
import IconClose from 'src/assets/icon-close.svg'
import CSS from './filters-form.scss'

class VerificationsFiltersForm extends Component {
  constructor() {
    super()
    this.state = {
      focusedInput: null
    }
  }

  get VERIFICATION_STATUS_OPTIONS() {
    return [
      {
        label: this.props.intl.formatMessage({ id: 'statuses.verified' }),
        value: 'verified'
      },
      {
        label: this.props.intl.formatMessage({ id: 'statuses.manual-review' }),
        value: 'manual'
      },
      {
        label: this.props.intl.formatMessage({ id: 'statuses.unverified' }),
        value: 'unverified'
      },
      {
        label: this.props.intl.formatMessage({ id: 'statuses.fraudulent' }),
        value: 'fraudulent'
      }
    ]
  }

  onDatesChange = ({ startDate, endDate }) => {
    let params = {}
    if (startDate) {
      startDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      params['dateUpdated[start]'] = startDate
    }
    if (endDate) {
      endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
      params['dateUpdated[end]'] = endDate
    }

    if (!isEmpty(params)) {
      this.props.onChange(params)
    }
  }

  render() {
    return (
      <div className={CSS.form}>
        <h3 className={CSS.title}>
          <FilterIcon />
          <FormattedMessage id="filters" />
        </h3>
        <div className={CSS.datePicker}>
          <label>
            <strong>
              <FormattedMessage id="identities.filters.labels.date-filter" />
            </strong>
          </label>
          <DateRangePicker
            startDate={this.props['dateUpdated[start]']}
            startDateId="startDate"
            isOutsideRange={day => moment().diff(day) < 1000}
            endDate={this.props['dateUpdated[end]']}
            endDateId="endDate"
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.focusedInput}
            hideKeyboardShortcutsPanel={true}
            onFocusChange={focusedInput => {
              this.setState({ focusedInput })
            }}
          />
        </div>
        {isFeatureEnabled('STATUSES') && (
          <CheckboxGroup
            label={this.props.intl.formatMessage({
              id: 'identities.filters.labels.status-filter'
            })}
            name="status"
            values={this.props.status}
            items={this.VERIFICATION_STATUS_OPTIONS}
            onChange={status => {
              this.props.onChange({ status })
            }}
          />
        )}

        <Button className="no-borders" onClick={this.props.onClear}>
          <IconClose />
          <FormattedMessage id="clear-all" />
        </Button>
      </div>
    )
  }
}

export default injectIntl(VerificationsFiltersForm)
