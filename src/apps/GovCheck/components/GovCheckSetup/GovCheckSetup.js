import { Box, Divider, FormControl, Grid, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { configurationFlowUpdate } from '../../../../state/merchant/merchant.actions';
import { selectVerificationPattern } from '../../../../state/merchant/merchant.selectors';
import { GovCheckConfiguration, govCheckParse } from '../../models/GovCheck.model';
import { GovCheckConfig } from '../GovCheckConfig/GovCheckConfig';
import { GovCheckCountries } from '../GovCheckCountries/GovCheckCountries';

export function GovCheckSetup() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const pattern = useSelector(selectVerificationPattern);
  const [selectedCountry, setSelectedCountry] = useState(GovCheckConfiguration[0].country);
  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    const found = GovCheckConfiguration.find((item) => item.country === selectedCountry);
    if (found) {
      setCheckList(govCheckParse(found.checks, pattern));
    }
  }, [selectedCountry, pattern]);

  const handleChangeCountry = useCallback((value) => {
    setSelectedCountry(value);
  }, []);

  const handleChangeCheck = useCallback(async (id, value) => {
    await dispatch(configurationFlowUpdate({
      verificationPatterns: {
        [id]: value,
      },
    }));
  }, [dispatch]);

  return (
    <Box p={2}>
      <FormControl component="fieldset">
        <Typography variant="h4" gutterBottom>
          {intl.formatMessage({ id: 'GovCheck.title' })}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {intl.formatMessage({ id: 'GovCheck.subtitle' }, {
            email: <a href="mailto:support@mati.io">support@mati.io</a>,
          })}
        </Typography>

        <Box mt={2}>
          <Grid container spacing={2} direction="row" wrap="nowrap" alignItems="stretch">
            <Grid item xs={5}>
              <GovCheckCountries value={selectedCountry} onChange={handleChangeCountry} />
            </Grid>
            <Grid item>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item xs={7}>
              <GovCheckConfig list={checkList} onChange={handleChangeCheck} />
            </Grid>
          </Grid>
        </Box>
      </FormControl>
    </Box>
  );
}
