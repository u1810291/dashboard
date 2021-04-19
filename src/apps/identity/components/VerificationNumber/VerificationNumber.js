import { Typography } from '@material-ui/core';
import { CopyToClipboard } from 'apps/ui';
import { QATags } from 'models/QA.model';
import React from 'react';
import { useStyles } from './VerificationNumber.styles';

export function VerificationNumber({ number, summary }) {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.data} variant="subtitle2" gutterBottom>
        <CopyToClipboard withText text={number} qa={QATags.Verification.Number.Copy}>
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
