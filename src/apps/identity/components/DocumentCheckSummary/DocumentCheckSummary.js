import { Typography, Box } from '@material-ui/core';
import { CheckBarFlat } from 'apps/identity/components/DocumentStep/CheckBar';
import React from 'react';
import { useDocumentTitle } from '../../hooks/document.hook';

export function DocumentCheckSummary({ document }) {
  const title = useDocumentTitle(document);

  return (
    <div key={document.type}>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      {document.steps.map((step) => (
        <Box mt={1} key={step.id}>
          <CheckBarFlat
            step={step}
            isShowExtra={false}
            tipPosition="left"
          />
        </Box>
      ))}
    </div>
  );
}