import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'src/components/button/index'
import { createOverlay, closeOverlay } from 'src/components/overlay'
import CountriesModal from '../countries-modal'
import Spinner from 'src/components/spinner'
import CSS from './Countries.scss'

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

  onSubmit = (value) => {
    closeOverlay()
    this.props.onSubmit({ supportedCountries: value.map((item) => item.value) })
  }

  mapCountries = (item) => ({
    value: item.code,
    label: item.name
  })

  mapValues = (item) => {
    const country = this.props.countries.find((country) => country.code === item)
    return {
      value: item,
      label: country && country.name
    }
  }

  render() {
    const { supportedCountries, isLoading } = this.props;
    return (
      <fieldset className="mgi-fieldset">
        <legend>
          <h3>
            <FormattedMessage id="flow.countries.title"/>
          </h3>
        </legend>
        <p className="text-secondary">
          <FormattedMessage id="flow.countries.description"/>
        </p>
        {!!supportedCountries.length && (
          <p>
            <FormattedMessage id="flow.countries.verifying"/>
          </p>
        )}
        {isLoading ? <Spinner/> : (
          <div>
            <div className={CSS.countryItemsList}>
              {
                supportedCountries.map(this.mapValues).map((country, index) =>
                  <button key={index} className={CSS.countryItem}>
                    {country.label}
                  </button>
                )
              }
            </div>
            <Button
              buttonStyle="primary"
              className={CSS.Button}
              onClick={this.openCountriesModal}
            >
              {supportedCountries.length ?
                <FormattedMessage id="flow.countries.edit"/> :
                <FormattedMessage id="flow.countries.add"/>
              }
            </Button>
          </div>
        )}
      </fieldset>
    )
  }
}
