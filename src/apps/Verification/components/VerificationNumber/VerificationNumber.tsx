import React from 'react';
import Typography from '@material-ui/core/Typography';
import { CopyToClipboard } from 'apps/ui';
import { QATags } from 'models/QA.model';
import { useStyles } from './VerificationNumber.styles';

export function VerificationNumber({ number, summary }: {
  number: string;
  summary: string;
}) {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.data} variant="subtitle2" gutterBottom>
        <CopyToClipboard text={number} qa={QATags.Verification.Number.Copy}>
          <span data-qa={QATags.Verification.Number.Value}>
            {number}
          </span>
        </CopyToClipboard>
      </Typography>
      <Typography className={classes.title} variant="body1">
        {summary}
      </Typography>
    </>
  );
}
