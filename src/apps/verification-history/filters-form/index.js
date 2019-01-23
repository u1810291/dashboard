import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { DebounceInput } from 'src/components/inputs'
import Button from 'src/components/button'
import CheckboxGroup from 'src/components/checkbox-group'
import Dropdown from 'src/components/dropdown'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import { isEmpty } from 'lodash'

import 'react-dates/lib/css/_datepicker.css'
import FiltersIcon from 'src/assets/icon-filters.svg'
import IconClose from 'src/assets/icon-close.svg'
import CSS from './filters-form.module.scss'

export default
@injectIntl
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
        <DebounceInput
          name="search"
          placeholder={this.props.intl.formatMessage({
            id: 'identities.filters.placeholder.search'
          })}
          maxLength={30}
          value={this.props.search}
          className={CSS.searchField}
          hideLabel={true}
          onChange={e => {
            this.props.onChange({ search: e.target.value })
          }}
        />
        <Dropdown className={CSS.filtersControl}>
          <Dropdown.Trigger>
            <Button>
              <FiltersIcon />
              <FormattedMessage id="filters" />
            </Button>
          </Dropdown.Trigger>

          <Dropdown.Content>
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

            <DateRangePicker
              startDate={this.props['dateUpdated[start]']}
              startDateId="startDate"
              isOutsideRange={day => moment().diff(day) < 1000}
              endDate={this.props['dateUpdated[end]']}
              endDateId="endDate"
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => {
                this.setState({ focusedInput })
              }}
            />

            <Button className="no-borders" onClick={this.props.onClear}>
              <IconClose />
              <FormattedMessage id="clear-all" />
            </Button>
          </Dropdown.Content>
        </Dropdown>
      </div>
    )
  }
}
