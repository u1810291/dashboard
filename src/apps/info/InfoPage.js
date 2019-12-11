import { Container, Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { FAQ } from 'fragments/info/faq';
import { Feedback } from 'fragments/info/feedback';
import React from 'react';
import { useIntl } from 'react-intl';

export function InfoPage() {
  const intl = useIntl();

  return (
    <Container maxWidth="xl">
      <Box mt={4}>
        <Typography variant="h2">
          {intl.formatMessage({ id: 'dashboard.menu.faq' })}
        </Typography>
      </Box>
      <Box mt={2} mb={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <FAQ />
          </Grid>
          <Grid item xs={12} md={5}>
            <Feedback />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
