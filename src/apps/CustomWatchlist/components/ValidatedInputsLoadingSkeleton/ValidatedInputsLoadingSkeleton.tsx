import React from 'react';
import { ValidatedInputsFieldTypesExtended, ValidatedInputsKeys } from '../../models/CustomWatchlist.models';
import { SkeletonStyled } from './ValidatedInputsLoadingSkeleton.styles';

export interface SelectedOptions {
  [key: string]: ValidatedInputsFieldTypesExtended;
}

export function ValidatedInputsLoadingSkeleton() {
  return (
    <>
      {Object.values(ValidatedInputsKeys).map((inputKey) => <SkeletonStyled key={inputKey} height="50px" animation="wave" />)}
    </>
  );
}
