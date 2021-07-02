import { Typography } from '@material-ui/core';
import { DateFormat, utcToLocalFormat } from 'lib/date';
import { QATags } from 'models/QA.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './VerificationDate.styles';

export interface VerificationDateProps {
  date: string,
}

export function VerificationDate({ date }: VerificationDateProps) {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.data} variant="subtitle2" gutterBottom data-qa={QATags.Verification.Date}>
        {utcToLocalFormat(date, DateFormat.DateTime)}
      </Typography>
      <Typography className={classes.title} variant="body1">
        {intl.formatMessage({ id: 'identity.summary.date' })}
      </Typography>
    </>
  );
}
