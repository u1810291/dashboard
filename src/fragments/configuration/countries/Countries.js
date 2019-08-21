import React from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import Button from 'components/button'
import Items from 'components/items'
import { createOverlay, closeOverlay } from 'components/overlay'
import CountriesModal from '../countries-modal'
import Spinner from 'components/spinner'
import CSS from './Countries.module.scss'
import Text from '../../../components/text';

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
        <Text size={3} weight={4}>
          <FormattedMessage id="flow.countries.title" />
        </Text>
        <Items flow="row" gap={1} justifyContent="start">
          <p className={classNames('text-secondary', [CSS.description])} >
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
                <Items
                  flow="row"
                  templateColumns="repeat(3, 1fr)"
                  align="stretch"
                  gap={1}
                >
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
                <Button className={CSS.action} onClick={this.openCountriesModal}>
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
