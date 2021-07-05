import { Box, FormControlLabel, Grid, Switch, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { GovCheckTypesForStep } from '../../models/GovCheck.model';

export function GovCheckConfig({ list, onChange }) {
  const intl = useIntl();

  const handleSwitch = useCallback((item) => (event) => {
    let value;
    if (item.stepTypeAlias) {
      value = event.target.checked ? item.stepTypeAlias : GovCheckTypesForStep[item.id].none;
    }
    onChange(item.id, value || event.target.checked);
  }, [onChange]);

  const handleSwitchOption = useCallback((item) => (event) => {
    onChange(item.id, event.target.checked ? item.option?.stepTypeAlias : item.stepTypeAlias);
  }, [onChange]);

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
                    checked={!!item.value}
                    onChange={handleSwitch(item)}
                    color="primary"
                  />
                )}
                label={intl.formatMessage({ id: `GovCheck.check.${item.id}` })}
              />

              {item.option && (
                <Box ml={4}>
                  <FormControlLabel
                    control={(
                      <Switch
                        checked={!!item.option.value}
                        onChange={handleSwitchOption(item)}
                        color="primary"
                      />
                    )}
                    label={(
                      <Box>
                        <Box>
                          {intl.formatMessage({ id: `GovCheck.check.${item.id}.${item.option.id}` })}
                        </Box>
                        {item.option.description && (
                          <Box fontSize={12}>
                            {intl.formatMessage({ id: `GovCheck.check.${item.id}.${item.option.id}.description` })}
                          </Box>
                        )}
                      </Box>
                    )}
                  />
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
