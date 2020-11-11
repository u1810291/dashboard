import { useIntl } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './VerificationDateAndNumber.styles';
import { CopyToClipboard } from '../../../../components/clipboard';
import { DateFormat, utcToLocalFormat } from '../../../../lib/date';

export function VerificationDateAndNumber({ date, number }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <Box mb={2}>
        <Typography className={classes.data} variant="subtitle2" gutterBottom>
          {utcToLocalFormat(date, DateFormat.DateTime)}
        </Typography>
        <Typography className={classes.title} variant="body1">
          {intl.formatMessage({ id: 'identity.summary.date' })}
        </Typography>
      </Box>
      <Box>
        <Typography className={classes.data} variant="subtitle2" gutterBottom>
          <CopyToClipboard withText text={number}>
            {number}
          </CopyToClipboard>
        </Typography>
        <Typography className={classes.title} variant="body1">
          {intl.formatMessage({ id: 'identity.summary.number' })}
        </Typography>
      </Box>
    </>
  );
}
