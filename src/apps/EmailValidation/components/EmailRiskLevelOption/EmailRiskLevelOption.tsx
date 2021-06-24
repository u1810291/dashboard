import { Box, FormControlLabel, Grid, Radio, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { BoxBordered } from '../../../ui';
import { useStyles } from '../EmailValidationConfiguration/EmailValidationConfiguration.styles';

interface EmailRiskLevelOptionProps {
  isDisabled: boolean;
  title: string;
  subtitle: string;
  value: string;
  children?: ReactNode;
}

export function EmailRiskLevelOption({ isDisabled, title, subtitle, value, children }: EmailRiskLevelOptionProps) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Grid item className={classes.fullWidth}>
      <BoxBordered>
        <FormControlLabel
          control={<Radio color="default" disabled={isDisabled} />}
          value={value}
          label={(
            <Typography variant="h5">
              {intl.formatMessage({ id: title })}
            </Typography>
          )}
        />
        <Box pl={3} className={classes.boxBlack}>
          <Box mb={1}>
            {children}
          </Box>
          <Typography component="div" variant="body2">
            {intl.formatMessage({ id: subtitle })}
          </Typography>
        </Box>
      </BoxBordered>
    </Grid>
  );
}
