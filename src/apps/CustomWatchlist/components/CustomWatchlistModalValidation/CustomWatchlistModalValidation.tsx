import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
import { CustomWatchlistModalValidationInputs, WatchlistMapping, WatchlistProcessStatus, customWatchlistsPollingDelay, CustomWatchlistUpload, getCustomWatchlistMapping, IValidatedInputsFieldTypes, ValidatedInputsKeys, IWatchlist } from '../../models/CustomWatchlist.models';
import { ValidatedInputs } from '../ValidatedInputs/ValidatedInputs';
import { selectCurrentCustomWatchlistHeadersErrorType, selectIsWatchlistsLoading, selectCurrentCustomWatchlistStatus, selectCurrentCustomWatchlistHeaders, selectCurrentCustomWatchlistHeadersIsLoading } from '../../state/CustomWatchlist.selectors';
import { customWatchlistLoadById, getCustomWatchlistHeaders, getCustomWatchlistShortValidation } from '../../state/CustomWatchlist.actions';
import { useStyles } from './CustomWatchlistModalValidation.styles';
import { CustomWatchlistModalValidationFileUploadForm } from '../CustomWatchlistModalValidationFileUploadForm/CustomWatchlistModalValidationFileUploadForm';
import { CustomWatchlistModalValidationSubmitButton } from '../CustomWatchlistModalValidationSubmitButton/CustomWatchlistModalValidationSubmitButton';
import { FakeInputs } from '../FakeInputs/FakeInputs';
import { ValidatedInputsLoadingSkeleton } from '../ValidatedInputsLoadingSkeleton/ValidatedInputsLoadingSkeleton';

export interface CustomWatchlistModalValidationInputTypes {
  [CustomWatchlistModalValidationInputs.Name]: string;
  [CustomWatchlistModalValidationInputs.FileKey]: string | null;
  [CustomWatchlistModalValidationInputs.Mapping]: WatchlistMapping[];
  [CustomWatchlistModalValidationInputs.CsvSeparator]: string | null;
  [CustomWatchlistModalValidationInputs.FileName]: string;
}

export function CustomWatchlistModalValidation({ watchlist, onClose, onSubmit }: {
  watchlist?: IWatchlist;
  onClose: () => void;
  onSubmit: (values: CustomWatchlistModalValidationInputTypes) => void;
}) {
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
  const merchantId = useSelector(selectMerchantId);
  const currentWatchlistStatus = useSelector(selectCurrentCustomWatchlistStatus);
  const isWatchlistsLoading = useSelector(selectIsWatchlistsLoading);
  const currentCustomWatchlistHeaders = useSelector(selectCurrentCustomWatchlistHeaders);
  const currentCustomWatchlistHeadersErrorType = useSelector(selectCurrentCustomWatchlistHeadersErrorType);
  const currentCustomWatchlistHeadersIsLoading = useSelector(selectCurrentCustomWatchlistHeadersIsLoading);

  const [isDataPolling, setIsDataPolling] = useState<boolean>(true);
  const [isSubmittingError, setIsSubmittingError] = useState<boolean>(false);
  const [fileKey, setFileKey] = useState<string | null>(watchlist?.process?.inputSourceFileKey ?? null);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const formMethods = useForm<CustomWatchlistModalValidationInputTypes>();
  const { register, handleSubmit, setValue, getValues, formState: { errors, isSubmitting } } = formMethods;
  const classes = useStyles();
  const debounced = useDebounce();

  console.log('currentWatchlistStatus', currentWatchlistStatus);
  const isWatchlistRunning = currentWatchlistStatus === WatchlistProcessStatus.Running;
  const isFileHeadersFlowLoading = isFileUploading || currentCustomWatchlistHeadersIsLoading;
  const isSubmitRestricted = !fileKey || isWatchlistsLoading || isWatchlistRunning || isFileHeadersFlowLoading || currentCustomWatchlistHeadersErrorType;

  const handleWatchlistLoad = useCallback(() => {
    if (watchlist?.id) {
      dispatch(customWatchlistLoadById(merchantId, watchlist.id, (watchlistData) => {
        if (watchlistData?.process.status === WatchlistProcessStatus.Completed) {
          console.log('check', watchlistData?.process.status);
          setIsDataPolling(false);
        }
      }));
    }
  }, [watchlist, merchantId, dispatch]);

  useLongPolling(handleWatchlistLoad, customWatchlistsPollingDelay, {
    isCheckMerchantTag: false,
    isUseFirstInvoke: false,
    isDone: !isDataPolling,
  });

  const nameRegister = register(CustomWatchlistModalValidationInputs.Name, {
    required: formatMessage('validations.required'),
  });

  const handleFormSubmit: SubmitHandler<CustomWatchlistModalValidationInputTypes> = useCallback((values) => {
    if (isSubmitRestricted) {
      return;
    }
    try {
      // TODO: @richvoronov is there any other way to check for submit errors?
      setIsSubmittingError(false);
      onSubmit(values);
    } catch (error) {
      setIsSubmittingError(true);
    }
  }, [isSubmitRestricted, onSubmit]);

  const handleInputValidate = useCallback((mapping: WatchlistMapping[]) => {
    const formValues = getValues();

    if ((formValues[CustomWatchlistModalValidationInputs.FileKey] || fileKey) && formValues[CustomWatchlistModalValidationInputs.CsvSeparator] && mapping.length !== 0) {
      dispatch(getCustomWatchlistShortValidation(merchantId, {
        [CustomWatchlistModalValidationInputs.FileKey]: formValues[CustomWatchlistModalValidationInputs.FileKey] || fileKey,
        [CustomWatchlistModalValidationInputs.CsvSeparator]: formValues[CustomWatchlistModalValidationInputs.CsvSeparator],
        mapping,
      }));
    }
  }, [dispatch, fileKey, getValues, merchantId]);

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
      await dispatch(getCustomWatchlistHeaders(merchantId, headersBody));
    }
  }, [merchantId, dispatch, getValues]);

  const handleFileUploading = useCallback((loading: boolean) => {
    setIsFileUploading(loading);
  }, []);

  const watchlistMapping = useMemo(() => getCustomWatchlistMapping(currentCustomWatchlistHeaders, watchlist?.mapping), [currentCustomWatchlistHeaders, watchlist?.mapping]);

  useEffect(() => {
    if (!isDataPolling && isWatchlistRunning) {
      setIsDataPolling(true);
    }
  }, [isDataPolling, isWatchlistRunning]);

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
                (fileKey && watchlistMapping.length !== 0 && !currentCustomWatchlistHeadersErrorType) ? <ValidatedInputs fieldValues={watchlistMapping} onChange={onValidatedInputsChange} /> : <FakeInputs />
              )}
              {isSubmittingError && <div className={classes.error}>{formatMessage('CustomWatchlist.settings.modal.submit.error')}</div>}
              {(currentCustomWatchlistHeadersErrorType && !isFileHeadersFlowLoading) && <div className={classes.error}>{formatMessage(`CustomWatchlist.settings.headers.${currentCustomWatchlistHeadersErrorType}`)}</div>}
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
                isWatchlistsLoading={isWatchlistsLoading}
                isFormSubmitting={isSubmitting}
                isWatchlistRunning={isWatchlistRunning}
                disabled={isSubmitRestricted}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
}
