import { useIntl } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { CopyToClipboard } from 'apps/ui';
import { useStyles } from './VerificationDateAndNumber.styles';
import { DateFormat, utcToLocalFormat } from '../../../../lib/date';
import { QATags } from '../../../../models/QA.model';

export function VerificationDateAndNumber({ date, number }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <Box mb={2}>
        <Typography className={classes.data} variant="subtitle2" gutterBottom data-qa={QATags.Verification.Date}>
          {utcToLocalFormat(date, DateFormat.DateTime)}
        </Typography>
        <Typography className={classes.title} variant="body1">
          {intl.formatMessage({ id: 'identity.summary.date' })}
        </Typography>
      </Box>
      <Box>
        <Typography className={classes.data} variant="subtitle2" gutterBottom>
          <CopyToClipboard withText text={number} qa={QATags.Verification.Number.Copy}>
            <span data-qa={QATags.Verification.Number.Value}>
              {number}
            </span>
          </CopyToClipboard>
        </Typography>
        <Typography className={classes.title} variant="body1">
          {intl.formatMessage({ id: 'identity.summary.number' })}
        </Typography>
      </Box>
    </>
  );
}
