import { Box, Button } from '@material-ui/core';
import { Modal } from 'apps/overlay';
import { MultiSelect } from 'apps/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './CountriesModal.styles';

export function CountriesModal({ supportedCountries, countries, onSubmit }) {
  const intl = useIntl();
  const classes = useStyles();
  const [value, setValue] = useState([]);

  useEffect(() => {
    setValue(supportedCountries);
  }, [supportedCountries]);

  const handleChange = useCallback((val) => {
    setValue(val);
  }, [setValue]);

  const handleSubmit = useCallback(() => {
    onSubmit(value);
  }, [onSubmit, value]);

  return (
    <Modal className={classes.countriesModal}>
      <main>
        <Box mb={2}>
          <h1>
            {intl.formatMessage({ id: 'flow.countries.modal.title' })}
            <p>
              {intl.formatMessage({ id: 'flow.countries.modal.description' })}
            </p>
          </h1>
        </Box>
        <MultiSelect
          range={value}
          options={countries}
          onChange={handleChange}
        />
      </main>
      <footer className="modal--footer-center">
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleSubmit}
          type="submit"
        >
          {intl.formatMessage({ id: 'teamTable.inviteSuccessModal.done' })}
        </Button>
      </footer>
    </Modal>
  );
}
