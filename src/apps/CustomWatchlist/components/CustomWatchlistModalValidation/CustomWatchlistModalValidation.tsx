import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { FiChevronLeft } from 'react-icons/fi';
import { useFormatMessage } from 'apps/intl';
import { useLongPolling } from 'lib/longPolling.hook';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Close from '@material-ui/icons/Close';
import { ButtonStyled } from 'apps/ui';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { useDebounce } from 'lib/debounce.hook';
import { CustomWatchlistModalValidationInputs, WatchlistMapping, WatchlistProcessStatus, customWatchlistsPollingDelay, CustomWatchlistUpload, getCustomWatchlistMapping, IValidatedInputsFieldTypes, ValidatedInputsKeys, FlowWatchlistUi, CustomWatchlistModalValidationInputTypes } from '../../models/CustomWatchlist.models';
import { ValidatedInputs } from '../ValidatedInputs/ValidatedInputs';
import { selectCurrentCustomWatchlistHeadersErrorType, selectCurrentCustomWatchlistId, selectWatchlistsContentErrorType, selectCurrentCustomWatchlistIsLoading, selectIsWatchlistsContentLoading, selectIsWatchlistsLoading, selectCurrentCustomWatchlistStatus, selectCurrentCustomWatchlistMapping, selectCurrentCustomWatchlistHeaders, selectCurrentCustomWatchlistHeadersIsLoading, selectCurrentCustomWatchlistError } from '../../state/CustomWatchlist.selectors';
import { updateCurrentWatchlist, customWatchlistLoadById, getCustomWatchlistHeaders, getCustomWatchlistShortValidation, updateMerchantWatchlistContent } from '../../state/CustomWatchlist.actions';
import { useStyles } from './CustomWatchlistModalValidation.styles';
import { CustomWatchlistModalValidationFileUploadForm } from '../CustomWatchlistModalValidationFileUploadForm/CustomWatchlistModalValidationFileUploadForm';
import { CustomWatchlistModalValidationSubmitButton } from '../CustomWatchlistModalValidationSubmitButton/CustomWatchlistModalValidationSubmitButton';
import { FakeInputs } from '../FakeInputs/FakeInputs';
import { ValidatedInputsLoadingSkeleton } from '../ValidatedInputsLoadingSkeleton/ValidatedInputsLoadingSkeleton';

export function CustomWatchlistModalValidation({ watchlist, onClose, onSubmit }: {
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
  // const currentWatchlistError = useSelector(selectCurrentCustomWatchlistError);
  // const isCurrentWatchlistError = Array.isArray(currentWatchlistError) && currentWatchlistError?.length !== 0;

  const [isSubmittingError, setIsSubmittingError] = useState<boolean>(false);
  const [fileKey, setFileKey] = useState<string | null>(watchlist?.process?.inputSourceFileKey ?? null);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [isWatchlistValid, setIsWatchlistValid] = useState<boolean>(false);
  const formMethods = useForm<CustomWatchlistModalValidationInputTypes>();
  const { register, handleSubmit, setValue, getValues, formState: { errors, isSubmitting } } = formMethods;

  const isWatchlistCompleted = currentWatchlistStatus === WatchlistProcessStatus.Completed;
  const isWatchlistRunning = currentWatchlistStatus === WatchlistProcessStatus.Running;
  const isFileHeadersFlowLoading = isFileUploading || currentCustomWatchlistHeadersIsLoading;
  const isSubmitRestricted = !!(!fileKey || isCurrentCustomWatchlistIsLoading || isWatchlistsLoading || isWatchlistsContentLoading || isWatchlistRunning || isFileHeadersFlowLoading || currentCustomWatchlistHeadersErrorType);
  const watchlistId = watchlist?.id || currentWatchlistId;
  const isEdit = !!watchlist;
  const isWatchlistExist = !!(currentWatchlistId);
  const isWatchlistNeedsRevalidate = !isEdit && !isWatchlistValid && !!currentWatchlistId;

  const handleWatchlistLoad = useCallback((isReload: boolean) => {
    if (watchlistId && isReload) {
      dispatch(customWatchlistLoadById(merchantId, watchlistId, (dataWatchlist) => {
        if (!dataWatchlist.process.error) {
          setIsWatchlistValid(true);
        }
      }));
    }
  }, [watchlistId, merchantId, dispatch]);

  useLongPolling(handleWatchlistLoad, customWatchlistsPollingDelay, {
    isCheckMerchantTag: false,
    isUseFirstInvoke: true,
    isDone: isWatchlistCompleted,
  });

  const nameRegister = register(CustomWatchlistModalValidationInputs.Name, {
    required: formatMessage('validations.required'),
  });

  const handleFormSubmit: SubmitHandler<CustomWatchlistModalValidationInputTypes> = useCallback((values) => {
    if (isSubmitRestricted) {
      return;
    }

    if (isWatchlistNeedsRevalidate) {
      // TODO: @richvoronov must't be here, hotfix for alfa release
      dispatch(updateMerchantWatchlistContent(merchantId, watchlistId, values));
      return;
    }

    if (!isEdit && isWatchlistCompleted) {
      onClose();
      return;
    }

    try {
      const submitValues = {
        ...values,
        [CustomWatchlistModalValidationInputs.FileKey]: values[CustomWatchlistModalValidationInputs.FileKey] || fileKey,
      };
      // TODO: @richvoronov is there any other way to check for submit errors?
      setIsSubmittingError(false);
      onSubmit(submitValues, { ...watchlist, id: watchlistId });
    } catch (error) {
      setIsSubmittingError(true);
    }
  }, [watchlist, watchlistId, isSubmitRestricted, fileKey, isEdit, isWatchlistCompleted, isWatchlistNeedsRevalidate, merchantId, dispatch, onClose, onSubmit]);

  const handleInputValidate = useCallback((mapping: WatchlistMapping[]) => {
    const formValues = getValues();

    // TODO: @richvoronov fix this on backend ready
    if (isEdit) {
      return;
    }

    // TODO: @richvoronov make difference function between "mapping" and "watchlist.mapping" to prevent first invoke?
    if ((formValues[CustomWatchlistModalValidationInputs.FileKey] || fileKey) && formValues[CustomWatchlistModalValidationInputs.CsvSeparator] && mapping.length !== 0) {
      dispatch(getCustomWatchlistShortValidation(merchantId, {
        [CustomWatchlistModalValidationInputs.FileKey]: formValues[CustomWatchlistModalValidationInputs.FileKey] || fileKey,
        [CustomWatchlistModalValidationInputs.CsvSeparator]: formValues[CustomWatchlistModalValidationInputs.CsvSeparator],
        mapping,
      }));
    }
  }, [dispatch, isEdit, fileKey, getValues, merchantId]);

  const onValidatedInputsChange = useCallback((validatedInputsValues: IValidatedInputsFieldTypes[]) => {
    const validatedInputsValuesFormated: WatchlistMapping[] = validatedInputsValues.map((fields) => ({ merchantField: fields.label, systemField: fields.value, ...(fields?.options && { options: fields.options }) }));
    setValue(CustomWatchlistModalValidationInputs.Mapping, validatedInputsValuesFormated);
    debounced(() => handleInputValidate(validatedInputsValuesFormated.filter((inputValue) => inputValue.systemField !== ValidatedInputsKeys.NotSelected)));
  }, [setValue, debounced, handleInputValidate]);

  const handleFileUploaded = useCallback(async (data: Partial<CustomWatchlistUpload>) => {
    const formValues = getValues();
    setFileKey(data?.key);
    if (data?.key) {
      const headersBody = { [CustomWatchlistModalValidationInputs.FileKey]: data.key, [CustomWatchlistModalValidationInputs.CsvSeparator]: formValues[CustomWatchlistModalValidationInputs.CsvSeparator] };

      // TODO: @richvoronov refactor this after alfa release
      if (watchlistId) {
        setIsWatchlistValid(false);
        await dispatch(updateCurrentWatchlist(formValues));
      }

      // TODO: @richvoronov remove this on backend ready
      if (!isEdit) {
        await dispatch(getCustomWatchlistHeaders(merchantId, headersBody));
      }
    }
  }, [merchantId, watchlistId, isEdit, dispatch, getValues]);

  const handleFileUploading = useCallback((loading: boolean) => {
    setIsFileUploading(loading);
  }, []);

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

  useEffect(() => {
    if (isEdit) {
      setValue(CustomWatchlistModalValidationInputs.Name, watchlist.name);
    }
  }, [isEdit, watchlist, setValue]);

  return (
    <Box className={classes.root}>
      <Grid container justifyContent="space-between" alignItems="flex-start">
        <Typography variant="h3" className={classes.modalTitle}>
          {formatMessage('CustomWatchlist.settings.modal.title')}
        </Typography>
        <div onClick={onClose} onKeyPress={onClose} role="button" tabIndex={0} className={classes.closeButton}>
          <Close />
        </div>
      </Grid>
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
                  disabled={isEdit}
                />
              </Box>
              <Box mb={3}>
                <CustomWatchlistModalValidationFileUploadForm watchlist={watchlist} onFileUploaded={handleFileUploaded} onFileUploading={handleFileUploading} />
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
                  <ValidatedInputs fieldValues={watchlistMapping} onChange={onValidatedInputsChange} disabled={isEdit || isWatchlistExist} />
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
                isWatchlistCompleted={isWatchlistCompleted}
                loading={isWatchlistsLoading || isSubmitting || isWatchlistRunning || isWatchlistsContentLoading}
                isWatchlistRunning={isWatchlistRunning}
                isWatchlistNeedsRevalidate={isWatchlistNeedsRevalidate}
                disabled={isSubmitRestricted}
                isEdit={isEdit}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
}
