import React, { useMemo } from 'react';
import { useFormatMessage } from 'apps/intl';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { CheckStepDetailsEntry } from 'apps/checks';
import { FiDollarSign } from 'react-icons/fi';
import { Warning, WarningTypes, Alert, CheckBarExpandable, BoxBordered } from 'apps/ui';
import { getStepExtra, IStep, StepStatus, VerificationStepTypes } from 'models/Step.model';
import { useStyles } from './BasicWatchlistVerification.styles';
import { BasicWatchlistStepType } from '../../models/Aml.model';

export function BasicWatchlistVerification({ steps }: {
  steps: IStep[];
 }) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const step = useMemo<BasicWatchlistStepType>(() => getStepExtra(steps.find((dataStep) => dataStep.id === VerificationStepTypes.BasicWatchlistsValidation)), [steps]);

  if (!step) {
    return null;
  }

  if (step?.checkStatus === StepStatus.Checking) {
    return (
      <Box mt={2}>
        <Warning
          type={WarningTypes.Notify}
          label={formatMessage(`SecurityCheckStep.basicWatchlist.${step.checkStatus}`)}
          filled
          isLabelColored
        />
      </Box>
    );
  }

  if (!step?.data && step?.checkStatus === StepStatus.Failure) {
    return (
      <Box mt={2}>
        <Alert title={formatMessage(`SecurityCheckStep.${step.error.code}.message`, { defaultMessage: formatMessage('SecurityCheckStep.system.internalError.message') })} />
      </Box>
    );
  }

  const hasErrors = step?.error && step.data.some((stepWatchlist) => !!stepWatchlist.searchResult);
  return (
    <Box>
      <Box mb={2}>
        <Warning
          type={hasErrors ? WarningTypes.Error : WarningTypes.Success}
          title={hasErrors ? (
            formatMessage(`SecurityCheckStep.${step.error.code}.message`, { defaultMessage: formatMessage('SecurityCheckStep.system.internalError.message') })
          ) : (
            formatMessage('BasicWatchlist.verification.noerror.title')
          )}
          label={hasErrors && formatMessage('BasicWatchlist.verification.error.description')}
          icon={FiDollarSign}
        />
      </Box>
      <BoxBordered p={1} pt={2} pb={1} className={classes.bordered}>
        {step.data?.map((stepWatchlist) => (
          <CheckBarExpandable key={stepWatchlist.watchlist.id} step={step} isError={!!stepWatchlist.searchResult} isNoBadge name={stepWatchlist.watchlist.name} isOpenByDefault>
            <Card raised={false} className={classes.card}>
              <CardContent>
                {stepWatchlist?.searchResult ? (
                  <Box>
                    {formatMessage('Watchlist.verification.step.watchlist.matchFound', { messageValues: { watchlistName: stepWatchlist.watchlist.name } })}
                  </Box>
                ) : (
                  <Box>
                    {formatMessage('Watchlist.verification.step.watchlist.noMatchFound', { messageValues: { watchlistName: stepWatchlist.watchlist.name } })}
                  </Box>
                )}
                {stepWatchlist.searchParams && (
                <Box mt={0.5}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" className={classes.title}>{formatMessage('Watchlist.verification.step.subtitle.searchParams')}</Typography>
                    </Grid>
                    {stepWatchlist?.searchResult && (
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" className={classes.title}>{formatMessage('Watchlist.verification.step.subtitle.searchResult')}</Typography>
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
    </Box>
  );
}
