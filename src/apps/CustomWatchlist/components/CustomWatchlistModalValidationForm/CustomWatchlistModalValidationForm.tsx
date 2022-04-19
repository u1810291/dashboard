import React, { useState, useCallback } from 'react';
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
import { ButtonStyled } from 'apps/ui';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { WatchlistProcessStatusTypes, IWatchlistUpload } from 'models/Watchlist.model';
import { CustomWatchlistModalValidationInputs, customWatchlistsPollingDelay, FlowWatchlistUi, CustomWatchlistModalValidationInputTypes } from '../../models/CustomWatchlist.model';
import { selectCurrentCustomWatchlistHeadersErrorType, selectCurrentCustomWatchlistId, selectCurrentCustomWatchlistIsLoading, selectIsWatchlistsContentLoading, selectIsWatchlistsLoading, selectCurrentCustomWatchlistStatus, selectCurrentCustomWatchlistHeadersIsLoading, selectCurrentCustomWatchlistIsFileAvailable, selectCurrentCustomWatchlistIsLoaded } from '../../state/CustomWatchlist.selectors';
import { updateCurrentWatchlistProcess, customWatchlistLoadById, getCustomWatchlistHeaders, getCustomWatchlistShortValidation } from '../../state/CustomWatchlist.actions';
import { useStyles } from './CustomWatchlistModalValidationForm.styles';
import { CustomWatchlistModalValidationFileUploadForm } from '../CustomWatchlistModalValidationFileUploadForm/CustomWatchlistModalValidationFileUploadForm';
import { CustomWatchlistModalValidationSubmitButton } from '../CustomWatchlistModalValidationSubmitButton/CustomWatchlistModalValidationSubmitButton';
import { CustomWatchlistMappingValidation } from '../CustomWatchlistMappingValidation/CustomWatchlistMappingValidation';

export function CustomWatchlistModalValidationForm({ watchlist, onClose, onSubmit }: {
  watchlist?: FlowWatchlistUi;
  onClose: () => void;
  onSubmit: (values: CustomWatchlistModalValidationInputTypes, watchlist?: Partial<FlowWatchlistUi>) => void;
}) {
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
  const classes = useStyles();

  const merchantId = useSelector(selectMerchantId);
  const currentWatchlistId = useSelector(selectCurrentCustomWatchlistId);
  const currentWatchlistStatus = useSelector(selectCurrentCustomWatchlistStatus);
  const isWatchlistsLoading = useSelector(selectIsWatchlistsLoading);
  const isWatchlistsLoaded = useSelector(selectCurrentCustomWatchlistIsLoaded);
  const isCurrentCustomWatchlistIsLoading = useSelector(selectCurrentCustomWatchlistIsLoading);
  const isWatchlistsContentLoading = useSelector(selectIsWatchlistsContentLoading);
  const currentCustomWatchlistHeadersErrorType = useSelector(selectCurrentCustomWatchlistHeadersErrorType);
  const isCurrentCustomWatchlistHeadersLoading = useSelector(selectCurrentCustomWatchlistHeadersIsLoading);
  const isCurrentCustomWatchlistIsFileAvailable = useSelector(selectCurrentCustomWatchlistIsFileAvailable);

  const [isSubmittingError, setIsSubmittingError] = useState<boolean>(false);
  const [fileKey, setFileKey] = useState<string | null>(watchlist?.process?.inputSourceFileKey ?? null);
  const formMethods = useForm<CustomWatchlistModalValidationInputTypes>({
    defaultValues: {
      [CustomWatchlistModalValidationInputs.Name]: watchlist?.name,
      [CustomWatchlistModalValidationInputs.CsvSeparator]: watchlist?.process?.csvSeparator,
    },
  });
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = formMethods;

  const isWatchlistCompleted = currentWatchlistStatus === WatchlistProcessStatusTypes.Completed;
  const isWatchlistPending = currentWatchlistStatus === WatchlistProcessStatusTypes.Pending;
  const isWatchlistRunning = currentWatchlistStatus === WatchlistProcessStatusTypes.Running;
  const isSubmitRestricted = [!fileKey || isCurrentCustomWatchlistIsLoading || isWatchlistsLoading || isWatchlistsContentLoading || isWatchlistRunning || isCurrentCustomWatchlistHeadersLoading || currentCustomWatchlistHeadersErrorType || !isCurrentCustomWatchlistIsFileAvailable].some(Boolean);
  const hasMappingValidationOptions = ![isWatchlistsLoading || isWatchlistsContentLoading || isWatchlistRunning || isCurrentCustomWatchlistHeadersLoading || !isCurrentCustomWatchlistIsFileAvailable || !isWatchlistsLoaded].some(Boolean);
  const isEdit = !!(currentWatchlistId);

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
    maxLength: {
      value: 40,
      message: formatMessage('Watchlist.validation.name.label'),
    },
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
      setIsSubmittingError(false);
      onSubmit(submitValues, { ...watchlist, id: currentWatchlistId });
    } catch (error) {
      setIsSubmittingError(true);
    }
  };

  const handleFileUploaded = useCallback((data: IWatchlistUpload) => {
    const formValues = getValues();
    setFileKey(data?.key);
    if (data?.key) {
      const headersBody = { [CustomWatchlistModalValidationInputs.FileKey]: data.key, [CustomWatchlistModalValidationInputs.CsvSeparator]: formValues[CustomWatchlistModalValidationInputs.CsvSeparator] };

      if (isEdit) {
        dispatch(updateCurrentWatchlistProcess(formValues));
        dispatch(getCustomWatchlistShortValidation(
          merchantId,
          {
            [CustomWatchlistModalValidationInputs.FileKey]: formValues[CustomWatchlistModalValidationInputs.FileKey] || fileKey,
            [CustomWatchlistModalValidationInputs.CsvSeparator]: formValues[CustomWatchlistModalValidationInputs.CsvSeparator],
            [CustomWatchlistModalValidationInputs.Mapping]: formValues[CustomWatchlistModalValidationInputs.Mapping],
          },
          isEdit,
        ));

        return;
      }

      dispatch(getCustomWatchlistHeaders(merchantId, headersBody));
    }
  }, [merchantId, isEdit, fileKey, dispatch, getValues]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.form}>
        <Grid container direction="row" spacing={2} className={classes.marginBottom50}>
          <Grid item xs={6}>
            <Box mb={3}>
              <InputLabel className={classes.marginBottom10} htmlFor="watchlist-name">
                <Typography variant="subtitle2">
                  {formatMessage('Watchlist.settings.modal.input.name.label')}
                </Typography>
              </InputLabel>
              <TextField
                {...nameRegister}
                id="watchlist-name"
                helperText={errors?.[CustomWatchlistModalValidationInputs.Name]?.message}
                error={!!errors[CustomWatchlistModalValidationInputs.Name]}
                type="input"
                variant="outlined"
                fullWidth
                placeholder={formatMessage('Watchlist.settings.modal.input.name.placeholder')}
              />
            </Box>
            <Box mb={3}>
              <CustomWatchlistModalValidationFileUploadForm watchlist={watchlist} onFileUploaded={handleFileUploaded} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box mb={2}>
              <Typography variant="subtitle2">
                {formatMessage('Watchlist.settings.modal.validationFields.title')}
              </Typography>
              <Typography variant="body1" className={classes.colorGrey}>
                {formatMessage('Watchlist.settings.modal.validationFields.subTitle')}
              </Typography>
            </Box>
            <CustomWatchlistMappingValidation
              isSubmittingError={isSubmittingError}
              isEdit={isEdit}
              hasOptions={hasMappingValidationOptions}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.buttonContainer}>
          <Grid item xs={6}>
            <ButtonStyled variant="outlined" color="primary" size="large" fullWidth onClick={onClose}>
              <FiChevronLeft />
              {' '}
              {formatMessage('Watchlist.settings.modal.button.back')}
            </ButtonStyled>
          </Grid>
          <Grid item xs={6} className={classes.validationHelperWrap}>
            {isWatchlistRunning && (
              <Box className={classes.validationHelper}>
                <Box>{formatMessage('Watchlist.settings.modal.validation.helper')}</Box>
              </Box>
            )}
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
