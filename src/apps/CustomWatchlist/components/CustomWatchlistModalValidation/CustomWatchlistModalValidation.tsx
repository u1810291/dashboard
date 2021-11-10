import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { FiChevronLeft } from 'react-icons/fi';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, InputLabel, Grid, Typography, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useIntl } from 'react-intl';
import { ButtonStyled } from 'apps/ui/components/ButtonStyled/ButtonStyled';
import { FlowWatchlistUi, CustomWatchlistModalValidationInputs, WatchlistMapping, WatchlistProcessStatus } from 'models/CustomWatchlist.model';
import { FakeInputs } from '../FakeInputs/FakeInputs';
import { ValidatedInputs, ValidatedInputsFieldTypes } from '../ValidatedInputs/ValidatedInputs';
import { selectIsWatchlistsLoading } from '../../state/CustomWatchlist.selectors';
import { useStyles } from './CustomWatchlistModalValidation.styles';
import { CustomWatchlistModalValidationFileUploadForm } from '../CustomWatchlistModalValidationFileUploadForm/CustomWatchlistModalValidationFileUploadForm';

export interface CustomWatchlistModalValidationInputTypes {
  [CustomWatchlistModalValidationInputs.Name]: string;
  [CustomWatchlistModalValidationInputs.FileUrl]: string | null;
  [CustomWatchlistModalValidationInputs.Mapping]: WatchlistMapping[];
  [CustomWatchlistModalValidationInputs.CsvSeparator]: null;
  [CustomWatchlistModalValidationInputs.FileName]: string;
}

export function CustomWatchlistModalValidation({ watchlist, onClose, onSubmit }: {
  watchlist?: FlowWatchlistUi;
  onClose: () => void;
  onSubmit: (values: CustomWatchlistModalValidationInputTypes) => void;
}) {
  const isWatchlistsLoading = useSelector(selectIsWatchlistsLoading);
  const intl = useIntl();
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittingError, setIsSubmittingError] = useState<boolean>(false);
  const formMethods = useForm<CustomWatchlistModalValidationInputTypes>();
  const { register, handleSubmit, setValue, formState: { errors } } = formMethods;

  const isWatchlistRunning = watchlist?.process?.status === WatchlistProcessStatus.Running;
  console.log(watchlist);

  const nameRegister = register(CustomWatchlistModalValidationInputs.Name, {
    required: intl.formatMessage({ id: 'validations.required' }),
  });

  const handleFormSubmit: SubmitHandler<CustomWatchlistModalValidationInputTypes> = useCallback((values) => {
    if (isWatchlistRunning) {
      return;
    }
    try {
      setIsSubmittingError(false);
      setIsSubmitting(true);
      onSubmit(values);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      setIsSubmittingError(true);
    }
  }, [isWatchlistRunning, onSubmit]);

  const onValidatedInputsChange = useCallback((validatedInputsValues: ValidatedInputsFieldTypes[]) => {
    const validatedInputsValuesFormated = validatedInputsValues.map((fields) => ({ merchantField: fields.label, systemField: fields.value, ...(fields?.options && { options: fields.options }) }));
    setValue(CustomWatchlistModalValidationInputs.Mapping, validatedInputsValuesFormated);
  }, [setValue]);

  // TODO: @richvoronov STAGE 3, replace with dynamic data
  const watchlistMapping = useMemo(() => [
    {
      merchantField: 'Name',
      systemField: 'fullName',
      options: {
        fuzziness: 50,
      },
    },
    {
      merchantField: 'Date of birth',
      systemField: 'dateOfBirth',
    },
  ].map((fields) => ({ label: fields.merchantField, value: fields.systemField, ...(fields?.options && { options: fields.options }) })), []);

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
          <Grid container direction="row" spacing={2}>
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
                <CustomWatchlistModalValidationFileUploadForm watchlist={watchlist} />
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
              {/* TODO: @richvoronov STAGE 3, ValidatedInputs shows when file has been loaded */}
              {true ? <ValidatedInputs fieldValues={watchlistMapping} onChange={onValidatedInputsChange} /> : <FakeInputs />}
              {isSubmittingError && <div className={classes.error}>{intl.formatMessage({ id: 'CustomWatchlist.settings.modal.submit.error' })}</div>}
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.marginTop50}>
            <Grid item xs={6}>
              <ButtonStyled variant="outlined" color="primary" size="large" fullWidth onClick={onClose}>
                <FiChevronLeft />
                {' '}
                {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.back' })}
              </ButtonStyled>
            </Grid>
            <Grid item xs={6}>
              {/* TODO: @richvoronov STAGE 2 change column name before Validation to "Validation", after Validation button text must be "Done" - pressing the button "Done" closes Modal  */}
              <ButtonStyled
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={isWatchlistsLoading || isWatchlistRunning}
              >
                {isWatchlistsLoading || isSubmitting || isWatchlistRunning ? (
                  <>
                    {isWatchlistRunning && <span className={classes.buttonRunning}>{intl.formatMessage({ id: `CustomWatchlist.settings.modal.button.status.${WatchlistProcessStatus.Running}` })}</span>}
                    <CircularProgress color="inherit" size={17} />
                  </>
                ) : intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.done' })}
              </ButtonStyled>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
}
