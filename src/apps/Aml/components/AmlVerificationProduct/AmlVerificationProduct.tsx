import React, { useMemo } from 'react';
import { PremiumAmlWatchlistsStepDetails } from 'apps/identity/components/PremiumAmlWatchlistsStepDetails/PremiumAmlWatchlistsStepDetails';
import { CheckBarExpandable, ChecksByDocument } from 'apps/ui';
import { CheckStepDetails } from 'apps/checks';
import { getDocumentsWithoutCustomDocument, VerificationDocument } from 'models/Document.model';
import { Grid } from '@material-ui/core';
import { useStyles } from './AmlVerificationProduct.styles';

export function AmlVerificationProduct({ data }: {
  data: VerificationDocument[];
}) {
  const classes = useStyles();

  const filteredData = useMemo(() => getDocumentsWithoutCustomDocument(data), [data]);

  return (
    <Grid container spacing={2}>
      {filteredData?.map(({ premiumAmlWatchlistsStep, watchlistsStep, type, country, photos }, index) => (
        <Grid key={type || index} item xs={12} xl={4} className={classes.wrapper}>
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
