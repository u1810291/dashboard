import { Box } from '@material-ui/core';
import { useFormattedValue } from 'lib/string';
import React from 'react';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import { useStyles } from './CheckStepDetails.styles';

export function CheckStepDetailsEntry({ label, value, isMarkedAsFailed = false }) {
  const classes = useStyles();
  const intl = useIntl();
  const formatted = useFormattedValue(label, value);

  return (
    <Box key={label} className={classes.item}>
      <Box mb={0.4} className={classnames(classes.value, { [classes.failed]: isMarkedAsFailed })}>{formatted}</Box>
      <Box className={classes.label}>
        {intl.formatMessage({
          id: `identity.field.${label}`,
          defaultMessage: label,
        })}
      </Box>
    </Box>
  );
}
