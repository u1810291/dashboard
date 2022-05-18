import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { useFormContext } from 'react-hook-form';
import Box from '@material-ui/core/Box';
import { useDebounce } from 'lib/debounce.hook';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { useFormatMessage } from 'apps/intl';
import { Loadable } from 'models/Loadable.model';
import { IWatchlistMapping, getWatchlistMapping, getWatchlistValidMapping } from 'models/Watchlist.model';
import { IValidatedInputsFieldTypes, WatchlistValidatedInputsErrors, FakeInputs, ValidatedInputs, ValidatedInputsLoadingSkeleton } from 'apps/ui';
import { useStyles } from './BasicWatchlistMappingValidation.styles';
import { selectWatchlistsContentErrorType, selectCurrentBasicWatchlistHeadersModel, selectCurrentBasicWatchlistMapping, selectCurrentBasicWatchlistHeaders, selectCurrentBasicWatchlistErrorsFormated } from '../../state/Aml.selectors';
import { BasicWatchlistModalValidationInputTypes } from '../../models/Aml.model';
import { getBasicWatchlistShortValidation } from '../../state/Aml.actions';

export function BasicWatchlistMappingValidation({ isSubmittingError, isEdit, hasOptions }:
  {
    isEdit: boolean;
    hasOptions: boolean;
    isSubmittingError: boolean;
  }) {
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const classes = useStyles();
  const merchantId = useSelector<any, string>(selectMerchantId);
  const watchlistsContentErrorType = useSelector<any, string>(selectWatchlistsContentErrorType);
  const currentWatchlistMapping = useSelector<any, Nullable<IWatchlistMapping[]>>(selectCurrentBasicWatchlistMapping);
  const currentBasicWatchlistHeaders = useSelector<any, Nullable<string[]>>(selectCurrentBasicWatchlistHeaders);
  const currentWatchlistErrors = useSelector<any, WatchlistValidatedInputsErrors>(selectCurrentBasicWatchlistErrorsFormated);
  const { isLoading: isFileHeadersFlowLoading, error: currentBasicWatchlistHeadersErrorType } = useSelector<any, Loadable<string[]>>(selectCurrentBasicWatchlistHeadersModel);

  const debounced = useDebounce();
  const { setValue, getValues } = useFormContext();

  const watchlistMapping = useMemo(() => getWatchlistMapping(currentBasicWatchlistHeaders, currentWatchlistMapping), [currentBasicWatchlistHeaders, currentWatchlistMapping]);

  const watchlsitError = useMemo(() => {
    if (isSubmittingError) {
      return <Box className={classes.error}>{formatMessage('Watchlist.settings.modal.submit.error.default')}</Box>;
    }
    if (watchlistsContentErrorType) {
      return <Box className={classes.error}>{formatMessage(`Watchlist.settings.modal.submit.error.${watchlistsContentErrorType}`)}</Box>;
    }
    if (currentBasicWatchlistHeadersErrorType && !isFileHeadersFlowLoading) {
      return <Box className={classes.error}>{formatMessage(`Watchlist.settings.headers.${currentBasicWatchlistHeadersErrorType}`)}</Box>;
    }

    return null;
  }, [classes, isSubmittingError, watchlistsContentErrorType, isFileHeadersFlowLoading, currentBasicWatchlistHeadersErrorType, formatMessage]);

  const handleInputValidate = useCallback((mapping: IWatchlistMapping[]) => {
    const formValues = getValues();
    const isMustValidate = isEdit ? !isEqual(mapping, currentWatchlistMapping ?? []) : true;

    if ((formValues[BasicWatchlistModalValidationInputTypes.FileKey]) && formValues[BasicWatchlistModalValidationInputTypes.CsvSeparator] && isMustValidate) {
      dispatch(getBasicWatchlistShortValidation(
        merchantId, {
          [BasicWatchlistModalValidationInputTypes.FileKey]: formValues[BasicWatchlistModalValidationInputTypes.FileKey],
          [BasicWatchlistModalValidationInputTypes.CsvSeparator]: formValues[BasicWatchlistModalValidationInputTypes.CsvSeparator],
          mapping,
        },
        isEdit,
      ));
    }
  }, [merchantId, isEdit, currentWatchlistMapping, getValues, dispatch]);

  const onValidatedInputsChange = useCallback((validatedInputsValues: IValidatedInputsFieldTypes[]) => {
    const validatedInputsValuesFormated = getWatchlistValidMapping(validatedInputsValues);

    setValue(BasicWatchlistModalValidationInputTypes.Mapping, validatedInputsValuesFormated);
    debounced(() => handleInputValidate(validatedInputsValuesFormated));
  }, [setValue, debounced, handleInputValidate]);

  return (
    <>
      {(isFileHeadersFlowLoading && !isEdit) && <ValidatedInputsLoadingSkeleton />}
      {!isFileHeadersFlowLoading && (
        ((watchlistMapping.length !== 0 && !currentBasicWatchlistHeadersErrorType) || isEdit) ? (
          <ValidatedInputs fieldValues={watchlistMapping} onChange={onValidatedInputsChange} disabled={isEdit} hasOptions={hasOptions} errors={currentWatchlistErrors} />
        ) : (
          <FakeInputs />
        )
      )}
      {watchlsitError}
    </>
  );
}
