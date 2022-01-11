import React from 'react';
import { IValidatedInputsFieldTypes, ValidatedInputsKeys } from '../../models/CustomWatchlist.models';
import { SkeletonStyled } from './ValidatedInputsLoadingSkeleton.styles';

export interface SelectedOptions {
  [key: string]: IValidatedInputsFieldTypes;
}

export function ValidatedInputsLoadingSkeleton() {
  return (
    <>
      {Object.values(ValidatedInputsKeys).map((inputKey) => <SkeletonStyled key={inputKey} height="40px" animation="wave" />)}
    </>
  );
}
