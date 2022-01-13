import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { BoxBordered, CheckBarExpandable, Warning, WarningTypes, Alert } from 'apps/ui';
import { useFormatMessage } from 'apps/intl';
import { VerificationDocument } from 'models/Document.model';
import { StepStatus, VerificationStepTypes } from 'models/Step.model';
import { CheckStepDetailsEntry } from 'apps/checks';
import React, { useMemo } from 'react';
import { getCustomWatchlistStepExtra } from '../../models/CustomWatchlist.models';
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
    <BoxBordered p={1} pt={2} pb={1} className={classes.bordered} width="350px">
      {step.data?.map((stepWatchlist) => (
        <CheckBarExpandable key={stepWatchlist.watchlist.id} step={step} isError={!!stepWatchlist.searchResult} isNoBadge name={stepWatchlist.watchlist.name} isOpenByDefault>
          <Card raised={false} className={classes.card}>
            <CardContent>
              {stepWatchlist?.searchResult ? (
                <Box>
                  {formatMessage('CustomWatchlist.verification.step.watchlist.matchFound', { messageValues: { watchlistName: stepWatchlist.watchlist.name } })}
                </Box>
              ) : (
                <Box>
                  {formatMessage('CustomWatchlist.verification.step.watchlist.noMatchFound', { messageValues: { watchlistName: stepWatchlist.watchlist.name } })}
                </Box>
              )}
              {stepWatchlist.searchParams && (
                <Box mt={0.5}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" className={classes.title}>{formatMessage('CustomWatchlist.verification.step.subtitle.searchParams')}</Typography>
                    </Grid>
                    {stepWatchlist?.searchResult && (
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" className={classes.title}>{formatMessage('CustomWatchlist.verification.step.subtitle.searchResult')}</Typography>
                      </Grid>
                    )}
                  </Grid>
                  <Grid container direction={stepWatchlist?.searchResult ? 'column' : 'row'}>
                    {Object.entries(stepWatchlist.searchParams).map((value) => (
                      <Grid xs={stepWatchlist?.searchResult ? 12 : 6} container item spacing={stepWatchlist?.searchResult && 1} key={value[0]}>
                        <Grid xs={6} item>
                          <CheckStepDetailsEntry label={value[0]} value={value[1]} />
                        </Grid>
                        {stepWatchlist?.searchResult && (
                          <Grid xs={6} item>
                            {stepWatchlist.searchResult[value[0]] ? <CheckStepDetailsEntry label={value[0]} value={stepWatchlist.searchResult[value[0]]} /> : '-'}
                          </Grid>
                        )}
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
