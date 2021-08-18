import { Box, Grid, Typography } from '@material-ui/core';
import { ButtonBase } from 'apps/ui';
import classnames from 'classnames';
import React, { useCallback, useState } from 'react';
import { flags } from 'assets/flags';
import { useIntl } from 'react-intl';
import { GovCheckCountryTypes } from '../../models/GovCheck.model';

export function GovCheckCountries({ value, onChange }) {
  const intl = useIntl();
  const [countries] = useState(GovCheckCountryTypes);

  const handleSelect = useCallback((id) => {
    onChange(id);
  }, [onChange]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {intl.formatMessage({ id: 'GovCheck.countries' })}
      </Typography>
      <Box mt={1}>
        <Grid container spacing={1} direction="column">
          {Object.values(countries).map((item) => (
            <Grid item key={item}>
              <ButtonBase
                startIcon={flags[item]}
                // TODO: remove using active class
                className={classnames({ active: item === value })}
                onClick={() => handleSelect(item)}
                fullWidth
              >
                {intl.formatMessage({ id: `GovCheck.country.${item}` })}
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
