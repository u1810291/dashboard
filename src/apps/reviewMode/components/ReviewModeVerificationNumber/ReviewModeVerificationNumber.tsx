import { Typography, Box } from '@material-ui/core';
import { AppTheme } from 'apps/theme/app.theme';
import { CopyToClipboard } from 'apps/ui';
import { QATags } from 'models/QA.model';
import React from 'react';
import { useStyles } from './ReviewModeVerificationNumber.styles';

export function ReviewModeVerificationNumber({
  number,
  summary,
}: {
  number: string;
  summary: string;
}) {
  const classes = useStyles();

  return (
    <>
      <Box mt={2} mb={1}>
        <Typography className={classes.title} variant="body1">
          {summary}
        </Typography>
      </Box>
      <Box
        border={1}
        px={1}
        py={1.4}
        borderRadius={AppTheme.shape.borderRadius}
        borderColor={AppTheme.palette.foreground.main}
      >
        <Typography className={classes.data} variant="subtitle2">
          <CopyToClipboard text={number} qa={QATags.Verification.Number.Copy}>
            <span data-qa={QATags.Verification.Number.Value}>
              {number}
            </span>
          </CopyToClipboard>
        </Typography>
      </Box>
    </>
  );
}
