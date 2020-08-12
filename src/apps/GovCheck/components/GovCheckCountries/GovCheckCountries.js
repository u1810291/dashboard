import { Box, Grid, Typography } from '@material-ui/core';
import { ButtonBase } from 'apps/ui';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { flags } from '../../assets/flags';
import { GovCheckCountryList } from '../../models/GovCheck.model';

export function GovCheckCountries({ value, onChange }) {
  const intl = useIntl();
  const [countries] = useState(GovCheckCountryList);

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
                className={clsx({ active: item === value })}
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
