import { Box, Grid, InputLabel, Switch, TextField } from '@material-ui/core';
import { ExtendedDescription } from 'apps/ui';
import { GDPRRangeTypes } from 'models/GDPR.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './FlowSettingsSwitches.styles';

export function FlowSettingsSwitches({ policyInterval, policyIntervalError, gdprChecked, digitalSignatureChecked, onValidatePolicyInterval, onChangePolicyInterval, onGDPRSwitcher, onDigitalSignatureSwitcher }: {
  policyInterval?: string;
  policyIntervalError: string;
  gdprChecked: boolean;
  digitalSignatureChecked: boolean;
  onValidatePolicyInterval: (e: any) => void;
  onChangePolicyInterval: (e: any) => void;
  onGDPRSwitcher: (e: any) => void;
  onDigitalSignatureSwitcher: (e: any) => void;
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Box>
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: 'FlowBuilder.settings.title.gdpr' })}
          text={intl.formatMessage({ id: 'Product.configuration.gdpr.subtitle' })}
          postfix={<Switch color="primary" checked={gdprChecked} onChange={onGDPRSwitcher} />}
        />
      </Box>
      {gdprChecked && (
        <Grid container alignItems="center" justify="space-between">
          <InputLabel className={classes.inputLabel}>
            {intl.formatMessage({ id: 'FlowBuilder.settings.gdpr.input.title' })}
          </InputLabel>
          <TextField
            className={classes.input}
            variant="outlined"
            value={policyInterval || ''}
            onChange={onChangePolicyInterval}
            onBlur={onValidatePolicyInterval}
            placeholder={`${GDPRRangeTypes.From}-${GDPRRangeTypes.To}`}
            error={!!policyIntervalError}
            helperText={!!policyIntervalError && intl.formatMessage({ id: `FlowBuilder.settings.gdpr.input.error.${policyIntervalError}` })}
          />
        </Grid>
      )}
      <Box>
        <ExtendedDescription
          title={intl.formatMessage({ id: 'FlowBuilder.settings.title.timestamp' })}
          text={intl.formatMessage({ id: 'FlowBuilder.settings.description.timestamp' })}
          postfix={<Switch color="primary" checked={digitalSignatureChecked} onChange={onDigitalSignatureSwitcher} />}
        />
      </Box>
    </Box>
  );
}
