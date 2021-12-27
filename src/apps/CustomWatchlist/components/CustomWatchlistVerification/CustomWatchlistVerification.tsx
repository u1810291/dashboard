import { Box, Card, CardContent, Grid } from '@material-ui/core';
import { BoxBordered, CheckBarExpandable, Warning, WarningTypes, Alert } from 'apps/ui';
import { isNil } from 'lib/isNil';
import { useFormatMessage } from 'apps/intl';
import { VerificationDocument } from 'models/Document.model';
import { StepStatus, VerificationStepTypes } from 'models/Step.model';
import { CheckStepDetailsEntry } from 'apps/checks';
import React, { useMemo } from 'react';
import { CustomWatchlistSearchParamsKeysEnum, getCustomWatchlistStepExtra } from '../../models/CustomWatchlist.models';
import { useStyles } from './CustomWatchlistVerification.styles';

export function CustomWatchlistVerification({ data }: {
    data: VerificationDocument;
  }) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const step = useMemo(() => getCustomWatchlistStepExtra(data.steps.find((dataStep) => dataStep.id === VerificationStepTypes.CustomWatchlistsValidation)), [data]);

  if (!step) {
    return null;
  }

  if (step?.checkStatus === StepStatus.Checking) {
    return (
      <Box mt={2}>
        <Warning
          type={WarningTypes.Notify}
          label={formatMessage(`SecurityCheckStep.customWatchlist.${step.checkStatus}`)}
          filled
          isLabelColored
        />
      </Box>
    );
  }

  if (!step?.data && step?.checkStatus === StepStatus.Failure) {
    return (
      <Box mt={2}>
        <Alert title={formatMessage(`SecurityCheckStep.${step.error.code}`, { defaultMessage: formatMessage('SecurityCheckStep.system.internalError.message') })} />
      </Box>
    );
  }

  return (
    <BoxBordered p={1} pt={2} className={classes.bordered} width="300px">
      {step.data?.map((stepWatchlist) => (
        <CheckBarExpandable key={stepWatchlist.watchlist.id} step={step} isError={!!stepWatchlist.searchResult} name={stepWatchlist.watchlist.name} isOpenByDefault>
          <Card raised={false} className={classes.card}>
            <CardContent>
              {stepWatchlist.searchResult && step?.error && (
                <Box>
                  {formatMessage(`SecurityCheckStep.${step.error.code}`, { defaultMessage: formatMessage('Error.common') })}
                </Box>
              )}
              {stepWatchlist.searchParams && (
                <Box mt={0.5}>
                  <Grid container>
                    {Object.keys(CustomWatchlistSearchParamsKeysEnum).map((fieldName) => (!isNil(stepWatchlist.searchParams[CustomWatchlistSearchParamsKeysEnum[fieldName]])) && (
                      <Grid xs={6} item key={CustomWatchlistSearchParamsKeysEnum[fieldName]}>
                        <CheckStepDetailsEntry label={CustomWatchlistSearchParamsKeysEnum[fieldName]} value={stepWatchlist.searchParams[CustomWatchlistSearchParamsKeysEnum[fieldName]]} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        </CheckBarExpandable>
      ))}
    </BoxBordered>
  );
}
