import { Box, FormControlLabel, Grid, Switch, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

export function GovCheckConfig({ list, onChange }) {
  const intl = useIntl();

  const handleSwitch = useCallback((id, event) => {
    const result = list.map((item) => {
      if (item.id !== id) {
        return item;
      }
      return {
        ...item,
        value: event.target.checked,
      };
    });
    onChange(result);
  }, [list, onChange]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {intl.formatMessage({ id: 'GovCheck.checks' })}
      </Typography>

      <Box mt={1}>
        <Grid container spacing={1} direction="column">
          {list.map((item) => (
            <Grid item key={item.id}>
              <FormControlLabel
                control={(
                  <Switch
                    checked={item.value}
                    onChange={(e) => handleSwitch(item.id, e)}
                    color="primary"
                  />
                )}
                label={intl.formatMessage({ id: `GovCheck.check.${item.id}` })}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
