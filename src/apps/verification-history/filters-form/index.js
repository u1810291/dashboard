import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import Button from 'src/components/button'
import Items from 'src/components/items'
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
      <Items flow="row">
        <Items justifyContent="start" gap={1} align="center">
          <FilterIcon />
          <h3>
            <FormattedMessage id="filters" />
          </h3>
        </Items>

        <div className={CSS.datePicker}>
          <Items flow="row" gap={1}>
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
          </Items>
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

        <section>
          <Button
            buttonStyle="no-borders invisible"
            onClick={this.props.onClear}
          >
            <Items justifyContent="start" align="center" gap={1}>
              <IconClose />
              <FormattedMessage id="clear-all" />
            </Items>
          </Button>
        </section>
      </Items>
    )
  }
}

export default injectIntl(VerificationsFiltersForm)
