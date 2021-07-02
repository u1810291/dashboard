import { Typography } from '@material-ui/core';
import { CopyToClipboard } from 'apps/ui';
import { QATags } from 'models/QA.model';
import React from 'react';
import { useStyles } from './VerificationNumber.styles';

export interface VerificationNumberProps{
  number: string,
  summary: string,
}

export function VerificationNumber({ number, summary }: VerificationNumberProps) {
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
