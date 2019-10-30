import { Box, Paper, Typography, Grid } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { FeedbackData } from './Feedback.model';

export function Feedback() {
  const intl = useIntl();

  return (
    <Paper>
      <Box p={2}>
        <Box mb={4}>
          <Typography variant="h2">
            {intl.formatMessage({ id: 'Feedback.title' })}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {FeedbackData.map(({ id, logo }) => (
            <Grid item key={id}>
              <Box display="flex">
                <Box
                  flex="0 0 auto"
                  mr={2}
                  width={60}
                  height={60}
                  borderRadius="6rem"
                  overflow="hidden"
                >
                  <img src={logo} alt={id} />
                </Box>
                <Box>
                  <Box fontStyle="italic" color="grey.700">
                    <Typography variant="body1" paragraph>
                      &quot;
                      {intl.formatMessage({ id: `Feedback.${id}.content` })}
                      &quot;
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" gutterBottom>
                    {intl.formatMessage({ id: `Feedback.${id}.author` })}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}
