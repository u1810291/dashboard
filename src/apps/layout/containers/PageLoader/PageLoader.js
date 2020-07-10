import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CenterContent } from '../../components/CenterContent/CenterContent';

export function PageLoader() {
  return (
    <CenterContent>
      <CircularProgress color="primary" />
    </CenterContent>
  );
}
