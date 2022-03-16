import Typography from '@material-ui/core/Typography';
import { useFormatMessage } from 'apps/intl';
import { DateFormat, utcToLocalFormat } from 'lib/date';
import { QATags } from 'models/QA.model';
import React from 'react';
import { useStyles } from './VerificationDate.styles';

export function VerificationDate({ date }: {
  date: string;
}) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.data} variant="subtitle2" gutterBottom data-qa={QATags.Verification.Date}>
        {utcToLocalFormat(date, DateFormat.DateTime)}
      </Typography>
      <Typography className={classes.title} variant="body1">
        {formatMessage('identity.summary.date')}
      </Typography>
    </>
  );
}
