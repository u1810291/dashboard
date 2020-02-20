import React from 'react';
import { CenterContent } from '../../components/CenterContent/CenterContent';
import { Spinner } from '../../components/Spinner/Spinner';

export function PageLoader() {
  return (
    <CenterContent>
      <Spinner />
    </CenterContent>
  );
}
