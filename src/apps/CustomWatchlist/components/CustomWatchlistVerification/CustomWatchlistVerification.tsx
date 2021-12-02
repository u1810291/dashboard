import { Box, Card, CardContent, Grid } from '@material-ui/core';
import { CustomWatchlistSearchParamsKeysEnum, getCustomWatchlistStepExtra } from 'apps/CustomWatchlist/models/CustomWatchlist.models';
import { BoxBordered, CheckBarExpandable } from 'apps/ui';
import { isNil } from 'lib/isNil';
import { VerificationDocument } from 'models/Document.model';
import { VerificationStepTypes } from 'models/Step.model';
import { CheckStepDetailsEntry } from 'apps/checks/components/CheckStepDetails/CheckStepDetailsEntry';
import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './CustomWatchlistVerification.styles';

export function CustomWatchlistVerification({ data }: {
  data: VerificationDocument;
}) {
  const classes = useStyles();
  const intl = useIntl();
  const step = useMemo(() => getCustomWatchlistStepExtra(data.steps.find((dataStep) => dataStep.id === VerificationStepTypes.CustomWatchlistsValidation)), [data]);

  if (!step) {
    return null;
  }

  return (
    <BoxBordered p={1} pt={2} className={classes.bordered} width="300px">
      {step.data?.map((stepWatchlist) => (
        <CheckBarExpandable key={stepWatchlist.watchlist.id} step={step} name={stepWatchlist.watchlist.name} isOpenByDefault>
          <Card raised={false} className={classes.card}>
            <CardContent>
              {step.error && (
                <Box>
                  {intl.formatMessage({
                    // TODO: @richvoronov get all error codes
                    id: `SecurityCheckStep.${step.error.code}`,
                    defaultMessage: intl.formatMessage({ id: 'Error.common' }),
                  })}
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
