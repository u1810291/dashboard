import React from 'react';
import { useIntl } from 'react-intl';
import { Grid } from '@material-ui/core';
import { PageContent } from 'apps/layout';
import { FAQ } from '../FAQ/FAQ';
import { Feedback } from '../Feedback/Feedback';

export function InfoPage() {
  const intl = useIntl();

  return (
    <PageContent title={intl.formatMessage({ id: 'dashboard.menu.faq' })}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <FAQ />
        </Grid>
        <Grid item xs={12} md={5}>
          <Feedback />
        </Grid>
      </Grid>
    </PageContent>
  );
}
