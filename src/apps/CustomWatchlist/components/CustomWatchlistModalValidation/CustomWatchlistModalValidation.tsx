import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { FiChevronLeft } from 'react-icons/fi';
import { useLongPolling } from 'lib/longPolling.hook';
import { Box, InputLabel, Grid, Typography, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useIntl } from 'react-intl';
import { ButtonStyled } from 'apps/ui';
import { selectMerchantId } from 'state/merchant/merchant.selectors';
import { FlowWatchlistUi, CustomWatchlistModalValidationInputs, WatchlistMapping, WatchlistProcessStatus, customWatchlistsPollingDelay, CustomWatchlistUpload } from '../../models/CustomWatchlist.models';
import { FakeInputs } from '../FakeInputs/FakeInputs';
import { ValidatedInputs, ValidatedInputsFieldTypes } from '../ValidatedInputs/ValidatedInputs';
import { selectIsWatchlistsLoading } from '../../state/CustomWatchlist.selectors';
import { customWatchlistLoadById } from '../../state/CustomWatchlist.actions';
import { CustomWatchlistModalValidationFileUploadForm } from '../CustomWatchlistModalValidationFileUploadForm/CustomWatchlistModalValidationFileUploadForm';
import { CustomWatchlistModalValidationSubmitButton } from '../CustomWatchlistModalValidationSubmitButton/CustomWatchlistModalValidationSubmitButton';
import { useStyles } from './CustomWatchlistModalValidation.styles';

export interface CustomWatchlistModalValidationInputTypes {
  [CustomWatchlistModalValidationInputs.Name]: string;
  [CustomWatchlistModalValidationInputs.FileKey]: string | null;
  [CustomWatchlistModalValidationInputs.Mapping]: WatchlistMapping[];
  [CustomWatchlistModalValidationInputs.CsvSeparator]: string | null;
  [CustomWatchlistModalValidationInputs.FileName]: string;
}

export function CustomWatchlistModalValidation({ watchlist, onClose, onSubmit }: {
  watchlist?: FlowWatchlistUi;
  onClose: () => void;
  onSubmit: (values: CustomWatchlistModalValidationInputTypes) => void;
}) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const merchantId = useSelector(selectMerchantId);
  const [isDataPolling, setIsDataPolling] = useState(false);
  const isWatchlistsLoading = useSelector(selectIsWatchlistsLoading);
  const [isSubmittingError, setIsSubmittingError] = useState<boolean>(false);
  const [fileKey, setFileKey] = useState<string | null>(watchlist?.process?.inputSourceFileKey ?? null);
  const formMethods = useForm<CustomWatchlistModalValidationInputTypes>();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = formMethods;
  const classes = useStyles();

  const isWatchlistRunning = watchlist?.process?.status === WatchlistProcessStatus.Running;

  const handleWatchlistLoad = useCallback(() => {
    if (watchlist?.id) {
      dispatch(customWatchlistLoadById(merchantId, watchlist.id, (watchlistData) => {
        if (watchlistData?.process.status === WatchlistProcessStatus.Completed) {
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
    required: intl.formatMessage({ id: 'validations.required' }),
  });

  const handleFormSubmit: SubmitHandler<CustomWatchlistModalValidationInputTypes> = useCallback((values) => {
    if (isWatchlistRunning) {
      return;
    }
    try {
      setIsSubmittingError(false);
      onSubmit(values);
    } catch (error) {
      setIsSubmittingError(true);
    }
  }, [isWatchlistRunning, onSubmit]);

  const onValidatedInputsChange = useCallback((validatedInputsValues: ValidatedInputsFieldTypes[]) => {
    const validatedInputsValuesFormated = validatedInputsValues.map((fields) => ({ merchantField: fields.label, systemField: fields.value, ...(fields?.options && { options: fields.options }) }));
    setValue(CustomWatchlistModalValidationInputs.Mapping, validatedInputsValuesFormated);
  }, [setValue]);

  const handleFileUploaded = useCallback((data: CustomWatchlistUpload) => {
    setFileKey(data?.key);
  }, []);

  const watchlistMapping = useMemo(() => watchlist?.mapping?.map((fields) => ({ label: fields.merchantField, value: fields.systemField, ...(fields?.options && { options: fields.options }) })), [watchlist?.mapping]);

  useEffect(() => {
    if (!isDataPolling && watchlist?.process?.status === WatchlistProcessStatus.Running) {
      setIsDataPolling(true);
    }
  }, [isDataPolling, watchlist]);

  return (
    <Box className={classes.root}>
      <Grid container justifyContent="space-between" alignItems="flex-start">
        <Typography variant="h3" className={classes.modalTitle}>
          {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.title' })}
        </Typography>
        <div onClick={onClose} onKeyPress={onClose} role="button" tabIndex={0} className={classes.closeButton}>
          <Close />
        </div>
      </Grid>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container direction="row" spacing={2} className={classes.marginBottom50}>
            <Grid item xs={6}>
              <Box mb={3}>
                <InputLabel className={classes.marginBottom10} htmlFor="watchlist-name">
                  <Typography variant="subtitle2">
                    {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.name.label' })}
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
                  placeholder={intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.name.placeholder' })}
                />
              </Box>
              <Box mb={3}>
                <CustomWatchlistModalValidationFileUploadForm watchlist={watchlist} onFileUploaded={handleFileUploaded} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box mb={2}>
                <Typography variant="subtitle2">
                  {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.title' })}
                </Typography>
                <Typography variant="body1" className={classes.colorGrey}>
                  {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validationFields.subTitle' })}
                </Typography>
              </Box>
              {watchlistMapping?.length > 0 ? <ValidatedInputs fieldValues={watchlistMapping} onChange={onValidatedInputsChange} /> : <FakeInputs />}
              {isSubmittingError && <div className={classes.error}>{intl.formatMessage({ id: 'CustomWatchlist.settings.modal.submit.error' })}</div>}
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.buttonContainer}>
            {isWatchlistRunning && (
              <Grid className={classes.validationHelper}>
                <Box>{intl.formatMessage({ id: 'CustomWatchlist.settings.modal.validation.helper' })}</Box>
              </Grid>
            )}
            <Grid item xs={6}>
              <ButtonStyled variant="outlined" color="primary" size="large" fullWidth onClick={onClose}>
                <FiChevronLeft />
                {' '}
                {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.back' })}
              </ButtonStyled>
            </Grid>
            <Grid item xs={6}>
              <CustomWatchlistModalValidationSubmitButton
                isWatchlistsLoading={isWatchlistsLoading}
                isFormSubmitting={isSubmitting}
                isWatchlistRunning={isWatchlistRunning}
                disabled={!fileKey || isWatchlistsLoading || isWatchlistRunning}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
}
