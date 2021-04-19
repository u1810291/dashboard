import { Box, CircularProgress } from '@material-ui/core';
import { useCountdownTimer } from 'apps/layout/hooks/CountdownTimer';
import React from 'react';

export function CircularTimerWithLabel({ seconds = 3, onTimerEnd, isCanceled }) {
  const [progressLabel, progressPercent] = useCountdownTimer(seconds, onTimerEnd, 100, isCanceled);

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress color="inherit" variant="determinate" value={progressPercent} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="common.black75"
      >
        <Box>
          {progressLabel}
        </Box>
      </Box>
    </Box>
  );
}
