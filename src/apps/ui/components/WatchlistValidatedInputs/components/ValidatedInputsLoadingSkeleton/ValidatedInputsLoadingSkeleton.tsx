import React from 'react';
import { ValidatedInputsKeys } from '../../../../models/WatchlistValidatedInputs.model';
import { SkeletonStyled } from './ValidatedInputsLoadingSkeleton.styles';

export function ValidatedInputsLoadingSkeleton() {
  return (
    <>
      {Object.values(ValidatedInputsKeys).map((inputKey) => <SkeletonStyled key={inputKey} height="40px" animation="wave" />)}
    </>
  );
}
