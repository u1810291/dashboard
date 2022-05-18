import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { useFormContext } from 'react-hook-form';
import { useDebounce } from 'lib/debounce.hook';
import Box from '@material-ui/core/Box';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { useFormatMessage } from 'apps/intl';
import { IValidatedInputsFieldTypes, WatchlistValidatedInputsErrors, FakeInputs, ValidatedInputs, ValidatedInputsLoadingSkeleton } from 'apps/ui';
import { IWatchlistMapping, getWatchlistMapping, getWatchlistValidMapping } from 'models/Watchlist.model';
import { useStyles } from './CustomWatchlistMappingValidation.styles';
import { selectWatchlistsContentErrorType, selectCurrentCustomWatchlistHeadersErrorType, selectCurrentCustomWatchlistHeadersIsLoading, selectCurrentCustomWatchlistMapping, selectCurrentCustomWatchlistHeaders, selectCurrentCustomWatchlistErrorsFormated } from '../../state/CustomWatchlist.selectors';
import { CustomWatchlistModalValidationInputs } from '../../models/CustomWatchlist.model';
import { getCustomWatchlistShortValidation } from '../../state/CustomWatchlist.actions';

export function CustomWatchlistMappingValidation({ isSubmittingError, isEdit, hasOptions }:
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
  const currentWatchlistErrors = useSelector<any, WatchlistValidatedInputsErrors>(selectCurrentCustomWatchlistErrorsFormated);

  const debounced = useDebounce();
  const { setValue, getValues } = useFormContext();

  const watchlistMapping = useMemo(() => getWatchlistMapping(currentCustomWatchlistHeaders, currentWatchlistMapping), [currentCustomWatchlistHeaders, currentWatchlistMapping]);

  const watchlsitError = useMemo(() => {
    if (isSubmittingError) {
      return <Box className={classes.error}>{formatMessage('Watchlist.settings.modal.submit.error.default')}</Box>;
    }
    if (watchlistsContentErrorType) {
      return <Box className={classes.error}>{formatMessage(`Watchlist.settings.modal.submit.error.${watchlistsContentErrorType}`)}</Box>;
    }
    if (currentCustomWatchlistHeadersErrorType && !isFileHeadersFlowLoading) {
      return <Box className={classes.error}>{formatMessage(`Watchlist.settings.headers.${currentCustomWatchlistHeadersErrorType}`)}</Box>;
    }

    return null;
  }, [classes, isSubmittingError, watchlistsContentErrorType, isFileHeadersFlowLoading, currentCustomWatchlistHeadersErrorType, formatMessage]);

  const handleInputValidate = useCallback((mapping: IWatchlistMapping[]) => {
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
    const validatedInputsValuesFormated = getWatchlistValidMapping(validatedInputsValues);

    setValue(CustomWatchlistModalValidationInputs.Mapping, validatedInputsValuesFormated);
    debounced(() => handleInputValidate(validatedInputsValuesFormated));
  }, [setValue, debounced, handleInputValidate]);

  return (
    <>
      {(isFileHeadersFlowLoading && !isEdit) && <ValidatedInputsLoadingSkeleton />}
      {!isFileHeadersFlowLoading && (
        ((watchlistMapping.length !== 0 && !currentCustomWatchlistHeadersErrorType) || isEdit) ? (
        // TODO: @richvornov, use isFileAvailable for hasOptions to prevent short-validate envoke
          <ValidatedInputs fieldValues={watchlistMapping} onChange={onValidatedInputsChange} disabled={isEdit} hasOptions={hasOptions} errors={currentWatchlistErrors} />
        ) : (
          <FakeInputs />
        )
      )}
      {watchlsitError}
    </>
  );
}
