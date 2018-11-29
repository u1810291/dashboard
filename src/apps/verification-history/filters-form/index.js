import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { DebounceInput } from 'src/components/inputs'
import Button from 'src/components/button'
import CheckboxGroup from 'src/components/checkbox-group'
import Dropdown from 'src/components/dropdown'
import FiltersIcon from 'src/assets/icon-filters.svg'
import IconClose from 'src/assets/icon-close.svg'
import CSS from './filters-form.module.scss'

export default
@injectIntl
class VerificationsFiltersForm extends Component {
  get VERIFICATION_TYPES_OPTIONS() {
    return [
      {
        label: this.props.intl.formatMessage({ id: 'verification.type.face' }),
        value: 'face-verification'
      },
      {
        label: this.props.intl.formatMessage({
          id: 'verification.type.national'
        }),
        value: 'national-id'
      },
      {
        label: this.props.intl.formatMessage({
          id: 'verification.type.driving-license'
        }),
        value: 'driving-license'
      },
      {
        label: this.props.intl.formatMessage({
          id: 'verification.type.passport'
        }),
        value: 'passport'
      },
      {
        label: this.props.intl.formatMessage({
          id: 'verification.type.residency'
        }),
        value: 'residency'
      }
    ]
  }

  get VERIFICATION_STATES_OPTIONS() {
    return [
      {
        label: this.props.intl.formatMessage({ id: 'statuses.verified' }),
        value: 'verified'
      },
      {
        label: this.props.intl.formatMessage({ id: 'statuses.manual-review' }),
        value: 'manual'
      }
    ]
  }

  render() {
    return (
      <div className={CSS.form}>
        <DebounceInput
          name="search"
          placeholder={this.props.intl.formatMessage({id: 'identities.filters.placeholder.search'})}
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
                id: 'identities.filters.labels.type-filter'
              })}
              values={this.props.types}
              items={this.VERIFICATION_TYPES_OPTIONS}
              onChange={types => {
                this.props.onChange({ types })
              }}
            />

            <CheckboxGroup
              label={this.props.intl.formatMessage({
                id: 'identities.filters.labels.state-filter'
              })}
              name="status"
              values={this.props.states}
              items={this.VERIFICATION_STATES_OPTIONS}
              onChange={states => {
                this.props.onChange({ states })
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
