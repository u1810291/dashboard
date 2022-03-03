import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { useFormContext } from 'react-hook-form';
import { useDebounce } from 'lib/debounce.hook';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { useFormatMessage } from 'apps/intl';
import { ValidatedInputs } from '../ValidatedInputs/ValidatedInputs';
import { useStyles } from './WatchlistMappingValidation.styles';
import { FakeInputs } from '../FakeInputs/FakeInputs';
import { ValidatedInputsLoadingSkeleton } from '../ValidatedInputsLoadingSkeleton/ValidatedInputsLoadingSkeleton';
import { selectWatchlistsContentErrorType, selectCurrentCustomWatchlistHeadersErrorType, selectCurrentCustomWatchlistHeadersIsLoading, selectCurrentCustomWatchlistMapping, selectCurrentCustomWatchlistHeaders } from '../../state/CustomWatchlist.selectors';
import { CustomWatchlistModalValidationInputs, getCustomWatchlistMapping, getCustomWatchlistValidMapping, isMappingExist, IValidatedInputsFieldTypes, WatchlistMapping } from '../../models/CustomWatchlist.models';
import { getCustomWatchlistShortValidation } from '../../state/CustomWatchlist.actions';

export function WatchlistMappingValidation({ isSubmittingError, isEdit, hasOptions }:
  {
    isEdit: boolean;
    hasOptions: boolean;
    isSubmittingError: boolean;
  }) {
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const classes = useStyles();
  const merchantId = useSelector(selectMerchantId);
  const watchlistsContentErrorType = useSelector(selectWatchlistsContentErrorType);
  const currentCustomWatchlistHeadersErrorType = useSelector(selectCurrentCustomWatchlistHeadersErrorType);
  const isFileHeadersFlowLoading = useSelector(selectCurrentCustomWatchlistHeadersIsLoading);
  const currentWatchlistMapping = useSelector(selectCurrentCustomWatchlistMapping);
  const currentCustomWatchlistHeaders = useSelector(selectCurrentCustomWatchlistHeaders);
  const debounced = useDebounce();
  const { setValue, getValues } = useFormContext();

  const watchlistMapping = useMemo(() => getCustomWatchlistMapping(currentCustomWatchlistHeaders, currentWatchlistMapping), [currentCustomWatchlistHeaders, currentWatchlistMapping]);

  const watchlsitError = useMemo(() => {
    if (isSubmittingError) {
      return <div className={classes.error}>{formatMessage('CustomWatchlist.settings.modal.submit.error.default')}</div>;
    }
    if (watchlistsContentErrorType) {
      return <div className={classes.error}>{formatMessage(`CustomWatchlist.settings.modal.submit.error.${watchlistsContentErrorType}`)}</div>;
    }
    if (currentCustomWatchlistHeadersErrorType && !isFileHeadersFlowLoading) {
      return <div className={classes.error}>{formatMessage(`CustomWatchlist.settings.headers.${currentCustomWatchlistHeadersErrorType}`)}</div>;
    }

    return null;
  }, [classes, isSubmittingError, watchlistsContentErrorType, isFileHeadersFlowLoading, currentCustomWatchlistHeadersErrorType, formatMessage]);

  const handleInputValidate = useCallback((mapping: WatchlistMapping[]) => {
    const formValues = getValues();
    const isMustValidate = isEdit ? !isEqual(mapping, currentWatchlistMapping ?? []) : true;

    if ((formValues[CustomWatchlistModalValidationInputs.FileKey]) && formValues[CustomWatchlistModalValidationInputs.CsvSeparator] && isMustValidate) {
      dispatch(getCustomWatchlistShortValidation(
        merchantId, {
          [CustomWatchlistModalValidationInputs.FileKey]: formValues[CustomWatchlistModalValidationInputs.FileKey],
          [CustomWatchlistModalValidationInputs.CsvSeparator]: formValues[CustomWatchlistModalValidationInputs.CsvSeparator],
          mapping,
        },
        isEdit,
      ));
    }
  }, [merchantId, isEdit, currentWatchlistMapping, getValues, dispatch]);

  const onValidatedInputsChange = useCallback((validatedInputsValues: IValidatedInputsFieldTypes[]) => {
    const validatedInputsValuesFormated = getCustomWatchlistValidMapping(validatedInputsValues);
    setValue(CustomWatchlistModalValidationInputs.Mapping, validatedInputsValuesFormated);
    debounced(() => handleInputValidate(validatedInputsValuesFormated));
  }, [setValue, debounced, handleInputValidate]);

  return (
    <>
      {(isFileHeadersFlowLoading && !isEdit) && <ValidatedInputsLoadingSkeleton />}
      {!isFileHeadersFlowLoading && (
        ((watchlistMapping.length !== 0 && !currentCustomWatchlistHeadersErrorType) || isEdit) ? (
          <ValidatedInputs fieldValues={watchlistMapping} onChange={onValidatedInputsChange} disabled={isEdit} hasOptions={hasOptions} />
        ) : (
          <FakeInputs />
        )
      )}
      {watchlsitError}
    </>
  );
}
