import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { CheckBarFlat } from '../CheckBarFlat/CheckBarFlat';

export function BiometricCheckSummary({ status }) {
  const intl = useIntl();

  return (
    <div key={document.type}>
      <Typography variant="h5" gutterBottom>
        {intl.formatMessage({ id: 'LivenessStep.Checks.status.title' })}
      </Typography>
      <Box mt={1}>
        <CheckBarFlat
          step={status}
          isShowExtra={false}
          tipPosition="left"
        />
      </Box>
    </div>
  );
}
