import React from 'react';
import { PremiumAmlWatchlistsStepDetails } from 'apps/identity/components/PremiumAmlWatchlistsStepDetails/PremiumAmlWatchlistsStepDetails';
import { CheckBarExpandable, ChecksByDocument } from 'apps/ui';
import { CheckStepDetails } from 'apps/checks';
import { VerificationDocument } from 'models/Document.model';
import { Grid } from '@material-ui/core';

export function AmlVerificationProduct({ data }: {
  data: VerificationDocument[],
}) {
  return (
    <Grid container spacing={2}>
      {data?.map(({ premiumAmlWatchlistsStep, watchlistsStep, type, country, photos }, index) => (
        <Grid key={type || index} item xs={12} lg={6} xl={4}>
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
  );
}
