import { Box, Typography } from '@material-ui/core';
import { useDocumentTitle } from 'apps/identity/hooks/document.hook';
import React from 'react';
import { CheckBarExpandable } from '../CheckBarExpandable/CheckBarExpandable';

export function DocumentCheckSummary({ document }) {
  const title = useDocumentTitle(document);

  return (
    <div key={document.type}>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      {document.steps.map((step) => (
        <Box mt={1} key={step.id}>
          <CheckBarExpandable step={step} isShowExtra={false} tipPosition="left" />
        </Box>
      ))}
    </div>
  );
}