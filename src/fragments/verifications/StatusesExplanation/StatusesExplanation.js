import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { getIdentityStatusDescription, getIdentityStatusLabel, IdentityStatusesMap } from 'models/Identity.model';

export function StatusesExplanation() {
  const intl = useIntl();

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          {IdentityStatusesMap.map((item) => (
            <Grid item key={item.id}>
              <Box color={item.color}>
                <Typography variant="h4" gutterBottom>
                  {intl.formatMessage({ id: getIdentityStatusLabel(item.id) })}
                </Typography>
              </Box>
              <Box color="text.secondary">
                <Typography variant="body1">
                  {intl.formatMessage({ id: getIdentityStatusDescription(item.id) })}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
