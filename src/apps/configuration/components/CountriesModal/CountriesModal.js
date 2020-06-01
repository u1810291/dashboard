import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import Button from 'components/button';
import Items from 'components/items';
import Modal from 'components/modal';
import { MultiSelect } from 'components/multi-select/MultiSelect';
import { useStyles } from './CountriesModal.styles';

export function CountriesModal({
  supportedCountries,
  countries,
  onSubmit,
}) {
  const intl = useIntl();
  const classes = useStyles();
  const [value, setValue] = useState(supportedCountries);

  useEffect(() => {
    setValue(supportedCountries);
  }, [supportedCountries]);

  return (
    <Modal className={classes.countriesModal}>
      <main>
        <Items flow="row">
          <h1>
            {intl.formatMessage({ id: 'flow.countries.modal.title' })}
            <p>
              {intl.formatMessage({ id: 'flow.countries.modal.description' })}
            </p>
          </h1>
          <MultiSelect
            range={value}
            options={countries}
            onChange={(val) => setValue(val)}
            selectClassName={() => {}}
            valuesClassName=""
          />
        </Items>
      </main>
      <footer className="modal--footer-center">
        <Button
          type="submit"
          buttonStyle="primary"
          onClick={() => onSubmit(value)}
        >
          {intl.formatMessage({ id: 'teamTable.inviteSuccessModal.done' })}
        </Button>
      </footer>
    </Modal>
  );
}
