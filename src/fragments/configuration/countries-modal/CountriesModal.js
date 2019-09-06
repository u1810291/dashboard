import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/button';
import Items from 'components/items';
import Modal from 'components/modal';
import MultiSelect from 'components/multi-select';

import CSS from './CountriesModal.module.scss';

export default function CountriesModal({
  supportedCountries,
  countries,
  onSubmit,
}) {
  const [value, setValue] = useState(supportedCountries);

  useEffect(() => {
    setValue(supportedCountries);
  }, [supportedCountries]);

  return (
    <Modal className={CSS.countriesModal}>
      <main>
        <Items flow="row">
          <h1>
            <FormattedMessage id="flow.countries.modal.title" />
            <p>
              <FormattedMessage id="flow.countries.modal.description" />
            </p>
          </h1>
          <MultiSelect
            value={value}
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
          <FormattedMessage id="teamTable.inviteSuccessModal.done" />
        </Button>
      </footer>
    </Modal>
  );
}

CountriesModal.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSubmit: PropTypes.func.isRequired,
  supportedCountries: PropTypes.arrayOf(PropTypes.string).isRequired,
};
