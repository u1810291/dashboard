import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FiChevronLeft } from 'react-icons/fi';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, InputLabel, Grid, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useIntl } from 'react-intl';
import { FileUploadButton } from 'apps/ui/components/FileUploadButton/FileUploadButton';
import { ButtonStyled } from 'apps/ui/components/ButtonStyled/ButtonStyled';
import { FlowWatchlist, CustomWatchlistModalSubmitType, CustomWatchlistAdditionalValues } from 'models/CustomWatchlist.model';
import { FakeInputs } from '../FakeInputs/FakeInputs';
import { ValidatedInputs } from '../ValidatedInputs/ValidatedInputs';
import { selectIsWatchlistsLoading } from '../../state/CustomWatchlist.selectors';
import { useStyles, RoundedButton } from './CustomWatchListModal.styles';

export function CustomWatchListModal({ watchlist, onClose, onSubmit }: {
  watchlist: FlowWatchlist;
  onClose: () => void;
  onSubmit: (values: CustomWatchlistModalSubmitType) => void;
}) {
  const isWatchlistsLoading = useSelector(selectIsWatchlistsLoading);
  const intl = useIntl();
  const classes = useStyles();
  const [fileName, setFileName] = useState<string>();

  const handleUploadFile = useCallback((setFieldValue: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setFieldValue([CustomWatchlistAdditionalValues.File], file);
  }, []);

  const initialValues: CustomWatchlistModalSubmitType = useMemo(() => ({
    name: watchlist?.name || '',
    [CustomWatchlistAdditionalValues.File]: null,
    // TODO: @richvoronv remove mock on STEP 2
    mapping: [{
      systemField: 'fullName',
      merchantField: 'Full Name',
      options: {
        fuzziness: 50,
      },
    }, {
      systemField: 'dateOfBirth',
      merchantField: 'Date Of Birth',
    }],
  }), [watchlist]);

  const handleSubmit = useCallback((values: CustomWatchlistModalSubmitType) => {
    onSubmit(values);
  }, [onSubmit]);

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
      {/* TODO: @richvoronov STAGE 2, replace formik with react-hook-form */}
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
                        fuzziness: 50,
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
                {/* TODO: @richvoronov STAGE 2 change column name before Validation to "Validation", after Validation button text must be "Done" - pressing the button "Done" closes Modal  */}
                <ButtonStyled
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={isWatchlistsLoading}
                >
                  {isWatchlistsLoading ? <CircularProgress color="inherit" size={17} /> : intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.done' })}
                </ButtonStyled>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
