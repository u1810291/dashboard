import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiChevronLeft } from 'react-icons/fi';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, InputLabel, Grid, Typography, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useIntl } from 'react-intl';
import { FileUploadButton } from 'apps/ui/components/FileUploadButton/FileUploadButton';
import { ButtonStyled } from 'apps/ui/components/ButtonStyled/ButtonStyled';
import { FlowWatchlistUi, CustomWatchlistModalValidationInputs, WatchlistMapping, CustomWatchlistFileExt } from 'models/CustomWatchlist.model';
import { WithDescriptionActionBordered } from 'apps/ui/components/WithDescriptionActionBordered/WithDescriptionActionBordered';
import { FakeInputs } from '../FakeInputs/FakeInputs';
import { ValidatedInputs } from '../ValidatedInputs/ValidatedInputs';
import { selectIsWatchlistsLoading } from '../../state/CustomWatchlist.selectors';
import { useStyles, RoundedButton } from './CustomWatchListModalValidation.styles';
import * as api from '../../client/CustomWatchlist.client';
import { CSVDelimeterSelect } from '../CSVDelimeterSelect/CSVDelimeterSelect';

export interface CustomWatchlistModalValidationInputTypes {
  [CustomWatchlistModalValidationInputs.Name]: string;
  [CustomWatchlistModalValidationInputs.File]: string | null;
  [CustomWatchlistModalValidationInputs.Mapping]: WatchlistMapping[];
  [CustomWatchlistModalValidationInputs.CsvDelimiter]: null;
}

export function CustomWatchListModalValidation({ watchlist, onClose, onSubmit }: {
  watchlist?: FlowWatchlistUi;
  onClose: () => void;
  onSubmit: (values: CustomWatchlistModalValidationInputTypes) => void;
}) {
  const isWatchlistsLoading = useSelector(selectIsWatchlistsLoading);
  const intl = useIntl();
  const classes = useStyles();
  const [fileName, setFileName] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<CustomWatchlistModalValidationInputTypes>();

  const handleUploadFile = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    setFileName(file.name);
    const form = new FormData();
    form.append('media', file);
    try {
      const { data } = await api.uploadMerchantWatchlist(form);
      setValue(CustomWatchlistModalValidationInputs.File, data.publicUrl);
      setError(CustomWatchlistModalValidationInputs.File, {});
    } catch {
      setError(CustomWatchlistModalValidationInputs.File, {
        message: intl.formatMessage({ id: 'CustomWatchlist.settings.watchlist.fileErrorUpload' }),
      });
    }
  }, [intl, setValue, setError]);

  const nameRegister = register(CustomWatchlistModalValidationInputs.Name, {
    required: intl.formatMessage({ id: 'validations.required' }),
  });

  const delimiterRegister = register(CustomWatchlistModalValidationInputs.CsvDelimiter);

  const handleFormSubmit: SubmitHandler<CustomWatchlistModalValidationInputTypes> = useCallback((values) => {
    try {
      setIsSubmitting(true);
      onSubmit(values);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
    }
  }, [onSubmit]);

  const onValidatedInputsChange = useCallback((validatedInputsValues) => {
    setValue(CustomWatchlistModalValidationInputs.Mapping, validatedInputsValues);
  }, [setValue]);

  // TODO: STAGE 2, replace with dynamic data
  const watchlistMapping = useMemo(() => [
    {
      label: 'Name',
      value: 'fullName',
      options: {
        fuzziness: 50,
      },
    },
    {
      label: 'Date of birth',
      value: 'dateOfBirth',
    },
  ], []);

  const extFile = useMemo(() => {
    const arr = fileName?.split('.') || [];
    if (arr?.length !== 0) {
      return arr[arr.length - 1];
    }

    return '';
  }, [fileName]);

  console.log('extFile', extFile);

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
              <InputLabel className={classes.marginBottom10} htmlFor="watchlist-name">
                <Typography variant="subtitle2">
                  {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.uploadFile.label.title' })}
                </Typography>
                <Typography variant="body1" className={classes.colorGrey}>
                  {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.uploadFile.label.subTitle' })}
                </Typography>
              </InputLabel>
              {fileName ? (
                <WithDescriptionActionBordered description={fileName} error={errors[CustomWatchlistModalValidationInputs.File]?.message}>
                  <FileUploadButton
                    onChange={handleUploadFile}
                    accept=".xls, .csv"
                    renderButton={(
                      <RoundedButton>
                        {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.uploadFile.reload' })}
                      </RoundedButton>
                    )}
                  />
                </WithDescriptionActionBordered>
              ) : (
                <FileUploadButton onChange={handleUploadFile} accept=".xls, .csv">
                  {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.uploadFile' })}
                </FileUploadButton>
              )}
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
            {fileName ? <ValidatedInputs fieldValues={watchlistMapping} onChange={onValidatedInputsChange} /> : <FakeInputs />}
            {extFile === CustomWatchlistFileExt.Csv && <CSVDelimeterSelect {...delimiterRegister} />}
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
              disabled={isWatchlistsLoading}
            >
              {isWatchlistsLoading || isSubmitting ? <CircularProgress color="inherit" size={17} /> : intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.done' })}
            </ButtonStyled>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
