import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import Button from 'components/button';
import Items from 'components/items';
import Text from 'components/text';
import { createOverlay, closeOverlay } from 'components/overlay';

import CircularProgress from '@material-ui/core/CircularProgress';
import { CountriesModal } from '../CountriesModal';
import { useStyles } from './Countries.styles';

export function Countries({
  countries,
  supportedCountries,
  onSubmit,
  isLoading,
}) {
  const intl = useIntl();
  const classes = useStyles();

  const onSubmitHandler = (value) => {
    closeOverlay();
    onSubmit({ supportedCountries: value.map((item) => item.value) });
  };

  const mapCountries = (item) => ({
    value: item.code,
    label: item.name,
  });

  const mapValues = (item) => {
    const country = countries.find(({ code }) => code === item);
    return {
      value: item,
      label: country && country.name,
    };
  };

  const openCountriesModal = () => createOverlay(
    <CountriesModal
      onSubmit={onSubmitHandler}
      supportedCountries={supportedCountries.map(mapValues)}
      countries={countries.map(mapCountries)}
    />,
  );

  return (
    <fieldset className="mgi-fieldset">
      <Text size={3} weight={4}>
        {intl.formatMessage({ id: 'flow.countries.title' })}
      </Text>
      <Items flow="row" gap={1} justifyContent="start">
        <p className={classNames('text-secondary', [classes.description])}>
          {intl.formatMessage({ id: 'flow.countries.description' })}
        </p>
        {!!supportedCountries.length && (
          <p>
            {intl.formatMessage({ id: 'flow.countries.verifying' })}
          </p>
        )}
        {isLoading ? (
          <CircularProgress color="secondary" />
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
                  .map(mapValues)
                  .map((country, index) => (
                    <button
                      type="button"
                      key={index} // eslint-disable-line react/no-array-index-key
                      className={classes.countryItem}
                    >
                      {country.label}
                    </button>
                  ))}
              </Items>
            )}
            <section>
              <Button className={classes.action} onClick={openCountriesModal}>
                { intl.formatMessage({ id: `flow.countries.${supportedCountries.length ? 'edit' : 'add'}` }) }
              </Button>
            </section>
          </Items>
        )}
      </Items>
    </fieldset>
  );
}
