import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { ExampleCard } from '../ExampleCard/ExampleCard';
import { ExampleCardList } from '../ExampleCard/ExampleCard.model';

export function NoVerifications() {
  const intl = useIntl();

  return (
    <Container>
      <Box py={3}>
        <Grid item xs={9}>
          <Box pb={2}>
            <Typography variant="h4">
              {intl.formatMessage({ id: 'verificationDemo.nullCounter' })}
            </Typography>
          </Box>
          <Paper>
            <Box p={4} align="center">
              <Typography variant="h3">{intl.formatMessage({ id: 'verificationDemo.title' })}</Typography>
              <Box mt={4}>
                <Typography variant="h4">{intl.formatMessage({ id: 'verificationDemo.subtitle' })}</Typography>
              </Box>
              <Box mt={8}>
                <Grid container spacing={3} direction="row" justify="center">
                  {ExampleCardList.map((item) => (
                    <Grid item key={item.id}>
                      <ExampleCard card={item} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Box>
    </Container>
  );
}
