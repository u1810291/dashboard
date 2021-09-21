import React, { useState, useCallback, useMemo } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Box, InputLabel, Grid, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useIntl } from 'react-intl';
import { FileUploadButton } from 'apps/ui/components/FileUploadButton/FileUploadButton';
import { ButtonStyled } from 'apps/ui/components/ButtonStyled/ButtonStyled';
import { Watchlist, CustomWatchlistModalSubmitType } from 'models/CustomWatchlist.model';
import { useStyles, RoundedButton } from './CustomWatchListModal.styles';
import { FakeInputs } from '../FakeInputs/FakeInputs';
import { ValidatedInputs } from '../ValidatedInputs/ValidatedInputs';

export function CustomWatchListModal(
  {
    watchlist,
    onClose,
    onSubmit,
  }: {
    watchlist: Watchlist;
    onClose: () => void;
    onSubmit: (values: CustomWatchlistModalSubmitType) => void; },
) {
  const intl = useIntl();
  const classes = useStyles();
  const [fileName, setFileName] = useState<string>();

  const handleUploadFile = useCallback(
    (setFieldValue: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files[0];
      console.log('upload file', file);
      setFileName(file.name);
      setFieldValue('file', file);
    },
    [],
  );

  const initialValues: CustomWatchlistModalSubmitType = useMemo(() => ({
    name: watchlist?.name || '',
    // TODO: @richvoronv step 1, remove mock on step 2
    mapping: [],
    // mapping: [{
    //   systemField: 'fullName',
    //   merchantField: 'Full Name',
    //   options: {
    //     fuzziness: 0.5,
    //   },
    // }, {
    //   systemField: 'dateOfBirth',
    //   merchantField: 'Date Of Birth',
    // }],
  }), [watchlist]);

  const handleSubmit = useCallback(
    (values: CustomWatchlistModalSubmitType) => {
      console.log('submit', values);
      onSubmit(values);
    },
    [onSubmit],
  );

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
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6}>
                <Box mb={3}>
                  <InputLabel className={classes.marginBottom10} htmlFor="watchlist-name">
                    <Typography variant="subtitle2">
                      {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.name.label' })}
                    </Typography>
                  </InputLabel>
                  <Field
                    id="watchlist-name"
                    name="name"
                    value={values.name}
                    type="input"
                    variant="outlined"
                    fullWidth
                    component={TextField}
                    disabled={false}
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
                    <Grid container className={classes.fileName} justifyContent="space-between" alignItems="center">
                      <Grid item className={classes.fileNameTitle}>{fileName}</Grid>
                      <Grid item>
                        <FileUploadButton
                          onChange={handleUploadFile(setFieldValue)}
                          accept=".xls, .csv"
                          renderButton={(
                            <RoundedButton>
                              {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.uploadFile.reload' })}
                            </RoundedButton>
                          )}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <FileUploadButton onChange={handleUploadFile(setFieldValue)} accept=".xls, .csv">{intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.uploadFile' })}</FileUploadButton>
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
                {fileName ? (
                  // TODO: @richvoronov replace fieldValues with recieved data
                  <ValidatedInputs fieldValues={[
                    {
                      label: 'Name',
                      value: 'fullName',
                      options: {
                        fuzziness: 0.5,
                      },
                    },
                    {
                      label: 'Date of birth',
                      value: 'dateOfBirth',
                    },
                  ]}
                  />
                ) : <FakeInputs />}
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
                {/* TODO: изменить название кнопки до Валидации на Validation, как провалидировалось Done - при нажатии закрываем модалку  */}
                <ButtonStyled
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.done' })}
                </ButtonStyled>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
