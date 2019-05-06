import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'components/button'
import Items from 'components/items'
import { createOverlay, closeOverlay } from 'components/overlay'
import CountriesModal from '../countries-modal'
import Spinner from 'components/spinner'
import CSS from './Countries.module.scss'

export default class Countries extends React.Component {
  openCountriesModal = () => {
    createOverlay(
      <CountriesModal
        onSubmit={this.onSubmit}
        supportedCountries={this.props.supportedCountries.map(this.mapValues)}
        countries={this.props.countries.map(this.mapCountries)}
      />
    )
  }

  onSubmit = value => {
    closeOverlay()
    this.props.onSubmit({ supportedCountries: value.map(item => item.value) })
  }

  mapCountries = item => ({
    value: item.code,
    label: item.name
  })

  mapValues = item => {
    const country = this.props.countries.find(country => country.code === item)
    return {
      value: item,
      label: country && country.name
    }
  }

  render() {
    const { supportedCountries, isLoading } = this.props
    return (
      <fieldset className="mgi-fieldset">
        <legend>
          <h3>
            <FormattedMessage id="flow.countries.title" />
          </h3>
        </legend>
        <Items flow="row" gap={1} justifyContent="start">
          <p className="text-secondary">
            <FormattedMessage id="flow.countries.description" />
          </p>
          {!!supportedCountries.length && (
            <p>
              <FormattedMessage id="flow.countries.verifying" />
            </p>
          )}
          {isLoading ? (
            <Spinner />
          ) : (
            <Items flow="row" justifyContent="start">
              {supportedCountries.length > 0 && (
                <Items flow="column" gap={1}>
                  {supportedCountries
                    .map(this.mapValues)
                    .map((country, index) => (
                      <button key={index} className={CSS.countryItem}>
                        {country.label}
                      </button>
                    ))}
                </Items>
              )}
              <section>
                <Button buttonStyle="primary" onClick={this.openCountriesModal}>
                  {supportedCountries.length ? (
                    <FormattedMessage id="flow.countries.edit" />
                  ) : (
                    <FormattedMessage id="flow.countries.add" />
                  )}
                </Button>
              </section>
            </Items>
          )}
        </Items>
      </fieldset>
    )
  }
}
