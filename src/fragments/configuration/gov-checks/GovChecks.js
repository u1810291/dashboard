import React from 'react';
import { useIntl } from 'react-intl';
import {
  Box,
  FormControl,
  Typography,
} from '@material-ui/core';
import { Items } from 'components';
import { GovChecksModel } from 'state/merchant/merchant.model';
// import { configurationUpdate } from 'state/merchant/merchant.actions';
import { GovChecksEntry } from './GovCheckEntry';

export function GovChecks() {
  const intl = useIntl();

  return (
    <FormControl component="fieldset">
      <Items flow="row">
        <Typography variant="h5">
          {intl.formatMessage({ id: 'Product.configuration.govChecks.title' })}
        </Typography>
        <Box>
          {intl.formatMessage({ id: 'Product.configuration.govChecks.subtitle.1' })}
        </Box>
        <Box>
          {intl.formatMessage({ id: 'Product.configuration.govChecks.subtitle.2' })}
        </Box>
        <Box flexDirection="row">
          { GovChecksModel.map((entry, idx) => {
            const country = entry.country || idx;
            return (
              <GovChecksEntry country={country} key={country} />
            );
          }) }
        </Box>
      </Items>
    </FormControl>
  );
}
