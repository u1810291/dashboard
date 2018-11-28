import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { withFormik, Field, Form } from 'formik'
import { setI18nContext } from 'src/components/i18n-context'
import { Input } from 'src/components/inputs'
import Button from 'src/components/button'
import CheckboxGroup from 'src/components/checkbox-group'
import Dropdown from './dropdown'
import FiltersIcon from 'src/assets/icon-filters.svg'
import IconClose from 'src/assets/icon-close.svg'
import CSS from './filters-form.module.scss'

const formikSettings = {
  handleSubmit() {}
}

export default
@setI18nContext('identities.filters')
@withFormik(formikSettings)
@injectIntl
class VerificationsFiltersForm extends Component {
  defaultQueryParams = {
    search: '',
    types: [],
    states: []
  }

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
      <Form className={CSS.form}>
        <Field
          name="search"
          className={CSS.searchField}
          hideLabel={true}
          component={Input}
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
      </Form>
    )
  }
}
