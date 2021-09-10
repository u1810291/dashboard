import React, { useMemo, useState, useCallback } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Box, Button, InputLabel, Select, MenuItem, Grid, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useIntl } from 'react-intl';
import { CustomWatchlistActions } from 'models/CustomWatchlist.model';
import classnames from 'classnames';
import { FileUploadButton } from 'apps/ui/components/FileUploadButton/FileUploadButton';
import { useStyles, RoundedButton } from './CustomWatchListModal.styles';
import { FakeInputs } from '../FakeInputs/FakeInputs';
import { ValidatedInputs } from '../ValidatedInputs/ValidatedInputs';

const placeholderOption = 'no-action';

export function CustomWatchListModal(
  {
    isEdit,
    onClose,
    onSubmit,
  }: {
    isEdit: boolean;
    onClose: (callback?: Function) => void;
    onSubmit: Function; },
) {
  const intl = useIntl();
  const classes = useStyles();
  const [fileName, setFileName] = useState<string>();
  const actionOptions = useMemo(() => ([
    {
      label: 'No action',
      value: placeholderOption,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.option.autoReject' }),
      value: CustomWatchlistActions.AutoReject,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.option.manual' }),
      value: CustomWatchlistActions.Manual,
    },
    {
      label: intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.option.notifyWebhook' }),
      value: CustomWatchlistActions.NotifyWebhook,
    },
  ]), [intl]);

  const handleUploadFile = useCallback(
    (setFieldValue: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log('Start');
      const file = event.target.files[0];
      console.log('upload file', file);
      setFileName(file.name);
      setFieldValue('file', file);
    },
    [],
  );

  const handleSubmit = useCallback(
    // TODO: Add types here
    (values: Object) => {
      console.log('submit', values);
      // onSubmit(values);
    },
    [onSubmit],
  );

  const closeModal = useCallback(() => {
    onClose();
  },
  [onClose]);

  // TODO: пулинг только для модалки, модалка закрывается закрывается пулинг. Процесс загрузки документа синхронный

  return (
    <Box className={classes.root}>
      <Grid container justifyContent="space-between" alignItems="flex-start">
        <Typography variant="h3" className={classes.modalTitle}>
          {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.title' })}
        </Typography>
        <div onClick={closeModal} onKeyPress={closeModal} role="button" tabIndex={0} className={classes.closeButton}>
          <Close />
        </div>
      </Grid>
      <Formik
        initialValues={{
          name: 'asdasd',
          action: 'no-action',
        }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, values, setFieldValue }) => (
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
                    type="input"
                    variant="outlined"
                    fullWidth
                    component={TextField}
                    disabled={false}
                    placeholder={intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.name.placeholder' })}
                  />
                </Box>
                <Box mb={3}>
                  <InputLabel className={classes.marginBottom10} htmlFor="action-select">
                    <Typography variant="subtitle2">
                      {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.label' })}
                    </Typography>
                  </InputLabel>
                  <Select
                    id="action-select"
                    name="action"
                    variant="outlined"
                    fullWidth
                    value={values.action}
                    onChange={handleChange}
                    className={classnames({
                      [classes.placeholder]: values.action === placeholderOption,
                    })}
                  >
                    {actionOptions.map((item) => {
                      if (item.value === placeholderOption) {
                        return (
                          <MenuItem
                            key={placeholderOption}
                            value={item.value}
                            className={classes.placeholder}
                          >
                            {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.input.action.placeholder' })}
                          </MenuItem>
                        );
                      }
                      return (
                        <MenuItem
                          key={`${item.value}-${item.label}`}
                          value={item.value}
                        >
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
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
                {isEdit ? <ValidatedInputs /> : <FakeInputs />}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button variant="outlined" color="primary" size="large" fullWidth onClick={closeModal}>
                  <FiChevronLeft />
                  {' '}
                  {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.back' })}
                </Button>
              </Grid>
              <Grid item xs={6}>
                {/* TODO: изменить название кнопки до Валидации на Validation, как провалидировалось Done - при нажатии закрываем модалку  */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.done' })}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
