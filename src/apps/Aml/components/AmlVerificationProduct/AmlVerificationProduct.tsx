import React, { useMemo } from 'react';
import { PremiumAmlWatchlistsStepDetails } from 'apps/identity/components/PremiumAmlWatchlistsStepDetails/PremiumAmlWatchlistsStepDetails';
import { CheckBarExpandable, ChecksByDocument } from 'apps/ui';
import { CheckStepDetails } from 'apps/checks';
import { getDocumentsWithoutCustomDocument } from 'models/Document.model';
import { VerificationResponse } from 'models/VerificationOld.model';
import { Grid } from '@material-ui/core';
import { useStyles } from './AmlVerificationProduct.styles';
import { BasicWatchlistVerification } from '../BasicWatchlistVerification/BasicWatchlistVerification';

export function AmlVerificationProduct({ data }: {
  data: VerificationResponse;
}) {
  const classes = useStyles();

  const filteredData = useMemo(() => getDocumentsWithoutCustomDocument(data?.documents), [data]);

  return (
    <Grid container spacing={2}>
      <Grid container item spacing={2}>
        {filteredData?.map(({ premiumAmlWatchlistsStep, watchlistsStep, type, country, photos }, index) => (
          <Grid key={`${type}-${index}`} item xs={12} xl={4} className={classes.wrapper}>
            <ChecksByDocument docType={type} country={country} photos={photos}>
              {premiumAmlWatchlistsStep && (
                <CheckBarExpandable step={premiumAmlWatchlistsStep}>
                  <PremiumAmlWatchlistsStepDetails step={premiumAmlWatchlistsStep} />
                </CheckBarExpandable>
              )}
              {watchlistsStep && (
                <CheckBarExpandable step={watchlistsStep} key={watchlistsStep?.id}>
                  <CheckStepDetails step={watchlistsStep} />
                </CheckBarExpandable>
              )}
            </ChecksByDocument>
          </Grid>
        ))}
      </Grid>
      <Grid item>
        <BasicWatchlistVerification steps={data.steps} />
      </Grid>
    </Grid>
  );
}
