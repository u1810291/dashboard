import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import isEqual from 'lodash/isEqual';
import { FiChevronLeft } from 'react-icons/fi';
import { useFormatMessage } from 'apps/intl';
import { useLongPolling } from 'lib/longPolling.hook';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { ButtonStyled } from 'apps/ui';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { useDebounce } from 'lib/debounce.hook';
import { CustomWatchlistModalValidationInputs, WatchlistMapping, WatchlistProcessStatus, customWatchlistsPollingDelay, CustomWatchlistUpload, getCustomWatchlistMapping, IValidatedInputsFieldTypes, ValidatedInputsKeys, FlowWatchlistUi, CustomWatchlistModalValidationInputTypes, getCustomWatchlistValidMapping } from '../../models/CustomWatchlist.models';
import { ValidatedInputs } from '../ValidatedInputs/ValidatedInputs';
import { selectCurrentCustomWatchlistHeadersErrorType, selectCurrentCustomWatchlistId, selectWatchlistsContentErrorType, selectCurrentCustomWatchlistIsLoading, selectIsWatchlistsContentLoading, selectIsWatchlistsLoading, selectCurrentCustomWatchlistStatus, selectCurrentCustomWatchlistMapping, selectCurrentCustomWatchlistHeaders, selectCurrentCustomWatchlistHeadersIsLoading, selectCurrentCustomWatchlistIsFileAvailable } from '../../state/CustomWatchlist.selectors';
import { updateCurrentWatchlistProcess, customWatchlistLoadById, getCustomWatchlistHeaders, getCustomWatchlistShortValidation } from '../../state/CustomWatchlist.actions';
import { useStyles } from './CustomWatchlistModalValidationForm.styles';
import { CustomWatchlistModalValidationFileUploadForm } from '../CustomWatchlistModalValidationFileUploadForm/CustomWatchlistModalValidationFileUploadForm';
import { CustomWatchlistModalValidationSubmitButton } from '../CustomWatchlistModalValidationSubmitButton/CustomWatchlistModalValidationSubmitButton';
import { FakeInputs } from '../FakeInputs/FakeInputs';
import { ValidatedInputsLoadingSkeleton } from '../ValidatedInputsLoadingSkeleton/ValidatedInputsLoadingSkeleton';

export function CustomWatchlistModalValidationForm({ watchlist, onClose, onSubmit }: {
  watchlist?: FlowWatchlistUi;
  onClose: () => void;
  onSubmit: (values: CustomWatchlistModalValidationInputTypes, watchlist?: Partial<FlowWatchlistUi>) => void;
}) {
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const debounced = useDebounce();

  const merchantId = useSelector(selectMerchantId);
  const currentWatchlistId = useSelector(selectCurrentCustomWatchlistId);
  const currentWatchlistStatus = useSelector(selectCurrentCustomWatchlistStatus);
  const currentWatchlistMapping = useSelector(selectCurrentCustomWatchlistMapping);
  const isWatchlistsLoading = useSelector(selectIsWatchlistsLoading);
  const isCurrentCustomWatchlistIsLoading = useSelector(selectCurrentCustomWatchlistIsLoading);
  const isWatchlistsContentLoading = useSelector(selectIsWatchlistsContentLoading);
  const watchlistsContentErrorType = useSelector(selectWatchlistsContentErrorType);
  const currentCustomWatchlistHeaders = useSelector(selectCurrentCustomWatchlistHeaders);
  const currentCustomWatchlistHeadersErrorType = useSelector(selectCurrentCustomWatchlistHeadersErrorType);
  const currentCustomWatchlistHeadersIsLoading = useSelector(selectCurrentCustomWatchlistHeadersIsLoading);
  const currentCustomWatchlistIsFileAvailable = useSelector(selectCurrentCustomWatchlistIsFileAvailable);

  const [isSubmittingError, setIsSubmittingError] = useState<boolean>(false);
  const [fileKey, setFileKey] = useState<string | null>(watchlist?.process?.inputSourceFileKey ?? null);
  const formMethods = useForm<CustomWatchlistModalValidationInputTypes>();
  const { register, handleSubmit, setValue, getValues, formState: { errors, isSubmitting } } = formMethods;

  const isWatchlistCompleted = currentWatchlistStatus === WatchlistProcessStatus.Completed;
  const isWatchlistPending = currentWatchlistStatus === WatchlistProcessStatus.Pending;
  const isWatchlistRunning = currentWatchlistStatus === WatchlistProcessStatus.Running;
  const isFileHeadersFlowLoading = currentCustomWatchlistHeadersIsLoading;
  const isSubmitRestricted = !!(!fileKey || isCurrentCustomWatchlistIsLoading || isWatchlistsLoading || isWatchlistsContentLoading || isWatchlistRunning || isFileHeadersFlowLoading || currentCustomWatchlistHeadersErrorType || !currentCustomWatchlistIsFileAvailable);
  const isEdit = !!(currentWatchlistId);
  console.log({ currentCustomWatchlistIsFileAvailable });

  // TODO: @richvoronov, currentWatchlistMapping must be the only one entry poin, update currentWatchlistMapping after watchlist PATCH
  const watchlistMapping = useMemo(() => getCustomWatchlistMapping(currentCustomWatchlistHeaders, currentWatchlistMapping ?? watchlist?.mapping), [currentCustomWatchlistHeaders, watchlist, currentWatchlistMapping]);
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
  }, [classes, isSubmittingError, watchlistsContentErrorType, currentCustomWatchlistHeadersErrorType, isFileHeadersFlowLoading, formatMessage]);

  const handleWatchlistLoad = (isReload: boolean) => {
    if (currentWatchlistId && isReload) {
      dispatch(customWatchlistLoadById(merchantId, currentWatchlistId));
    }
  };

  useLongPolling(handleWatchlistLoad, customWatchlistsPollingDelay, {
    isCheckMerchantTag: false,
    isUseFirstInvoke: true,
    isDone: isWatchlistCompleted || isWatchlistPending,
  });

  const nameRegister = register(CustomWatchlistModalValidationInputs.Name, {
    required: formatMessage('validations.required'),
  });

  const handleFormSubmit: SubmitHandler<CustomWatchlistModalValidationInputTypes> = (values) => {
    if (isSubmitRestricted) {
      return;
    }

    try {
      const submitValues = {
        ...values,
        [CustomWatchlistModalValidationInputs.FileKey]: values[CustomWatchlistModalValidationInputs.FileKey] || fileKey,
      };
      // TODO: @richvoronov is there any other way to check for submit errors?
      setIsSubmittingError(false);
      onSubmit(submitValues, { ...watchlist, id: currentWatchlistId });
    } catch (error) {
      setIsSubmittingError(true);
    }
  };

  const handleInputValidate = useCallback((mapping: WatchlistMapping[]) => {
    const formValues = getValues();
    const isMappingExist = mapping.filter((value) => value.systemField !== ValidatedInputsKeys.NotSelected)?.length;
    const isMustValidate = isMappingExist && currentWatchlistMapping && !isEqual(mapping, currentWatchlistMapping);

    if ((formValues[CustomWatchlistModalValidationInputs.FileKey] || fileKey) && formValues[CustomWatchlistModalValidationInputs.CsvSeparator] && isMustValidate) {
      dispatch(getCustomWatchlistShortValidation(merchantId, {
        [CustomWatchlistModalValidationInputs.FileKey]: formValues[CustomWatchlistModalValidationInputs.FileKey] || fileKey,
        [CustomWatchlistModalValidationInputs.CsvSeparator]: formValues[CustomWatchlistModalValidationInputs.CsvSeparator],
        mapping,
      }));
    }
  }, [fileKey, merchantId, currentWatchlistMapping, getValues, dispatch]);

  const onValidatedInputsChange = useCallback((validatedInputsValues: IValidatedInputsFieldTypes[]) => {
    const validatedInputsValuesFormated = getCustomWatchlistValidMapping(validatedInputsValues);
    setValue(CustomWatchlistModalValidationInputs.Mapping, validatedInputsValuesFormated);
    debounced(() => handleInputValidate(validatedInputsValuesFormated));
  }, [setValue, debounced, handleInputValidate]);

  const handleFileUploaded = useCallback((data: Partial<CustomWatchlistUpload>) => {
    const formValues = getValues();
    setFileKey(data?.key);
    if (data?.key) {
      const headersBody = { [CustomWatchlistModalValidationInputs.FileKey]: data.key, [CustomWatchlistModalValidationInputs.CsvSeparator]: formValues[CustomWatchlistModalValidationInputs.CsvSeparator] };

      if (isEdit) {
        dispatch(updateCurrentWatchlistProcess(formValues));
        dispatch(getCustomWatchlistShortValidation(merchantId, {
          [CustomWatchlistModalValidationInputs.FileKey]: formValues[CustomWatchlistModalValidationInputs.FileKey] || fileKey,
          [CustomWatchlistModalValidationInputs.CsvSeparator]: formValues[CustomWatchlistModalValidationInputs.CsvSeparator],
          mapping: getCustomWatchlistValidMapping(watchlistMapping),
        }));

        return;
      }

      setValue(CustomWatchlistModalValidationInputs.Mapping, getCustomWatchlistValidMapping(watchlistMapping));
      dispatch(getCustomWatchlistHeaders(merchantId, headersBody));
    }
  }, [merchantId, isEdit, fileKey, watchlistMapping, setValue, dispatch, getValues]);

  useEffect(() => {
    if (watchlist) {
      setValue(CustomWatchlistModalValidationInputs.Name, watchlist.name);
    }
  }, [isEdit, watchlist, setValue]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.form}>
        <Grid container direction="row" spacing={2} className={classes.marginBottom50}>
          <Grid item xs={6}>
            <Box mb={3}>
              <InputLabel className={classes.marginBottom10} htmlFor="watchlist-name">
                <Typography variant="subtitle2">
                  {formatMessage('CustomWatchlist.settings.modal.input.name.label')}
                </Typography>
              </InputLabel>
              <TextField
                {...nameRegister}
                id="watchlist-name"
                defaultValue={watchlist?.name || ''}
                helperText={errors?.[CustomWatchlistModalValidationInputs.Name]?.message}
                error={!!errors[CustomWatchlistModalValidationInputs.Name]}
                type="input"
                variant="outlined"
                fullWidth
                placeholder={formatMessage('CustomWatchlist.settings.modal.input.name.placeholder')}
              />
            </Box>
            <Box mb={3}>
              <CustomWatchlistModalValidationFileUploadForm watchlist={watchlist} onFileUploaded={handleFileUploaded} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box mb={2}>
              <Typography variant="subtitle2">
                {formatMessage('CustomWatchlist.settings.modal.validationFields.title')}
              </Typography>
              <Typography variant="body1" className={classes.colorGrey}>
                {formatMessage('CustomWatchlist.settings.modal.validationFields.subTitle')}
              </Typography>
            </Box>
            {isFileHeadersFlowLoading && <ValidatedInputsLoadingSkeleton />}
            {!isFileHeadersFlowLoading && (
              (fileKey && watchlistMapping.length !== 0 && !currentCustomWatchlistHeadersErrorType) ? (
                <ValidatedInputs fieldValues={watchlistMapping} onChange={onValidatedInputsChange} disabled={isEdit} hasOptions={!(isWatchlistsLoading || isWatchlistsContentLoading || isWatchlistRunning || isFileHeadersFlowLoading || !currentCustomWatchlistIsFileAvailable)} />
              ) : (
                <FakeInputs />
              )
            )}
            {watchlsitError}
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.buttonContainer}>
          {isWatchlistRunning && (
            <Grid className={classes.validationHelper}>
              <Box>{formatMessage('CustomWatchlist.settings.modal.validation.helper')}</Box>
            </Grid>
          )}
          <Grid item xs={6}>
            <ButtonStyled variant="outlined" color="primary" size="large" fullWidth onClick={onClose}>
              <FiChevronLeft />
              {' '}
              {formatMessage('CustomWatchlist.settings.modal.button.back')}
            </ButtonStyled>
          </Grid>
          <Grid item xs={6}>
            <CustomWatchlistModalValidationSubmitButton
              loading={isWatchlistsLoading || isSubmitting || isWatchlistRunning || isWatchlistsContentLoading}
              isWatchlistRunning={isWatchlistRunning}
              disabled={isSubmitRestricted}
              isEdit={isEdit}
            />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
