import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { getExplanationStatuses, getIdentityStatusDescription, getIdentityStatusLabel } from 'models/Identity.model';

export function StatusesExplanation() {
  const intl = useIntl();
  const [statuses] = useState(getExplanationStatuses());

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          {statuses.map((item) => (
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
