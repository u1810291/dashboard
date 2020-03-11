import { Box } from '@material-ui/core';
import React from 'react';

export function BiometricSection({ title, picture, content }) {
  return (
    <Box width="100%" display="flex">
      <Box flex="1 1 auto">
        <Box fontSize={16} lineHeight={2}>
          {title}
        </Box>
        {content && (
          <Box pr={1} ml={1}>{content}</Box>
        )}
      </Box>
      <Box flex="0 0 230px">
        {picture}
      </Box>
    </Box>
  );
}
