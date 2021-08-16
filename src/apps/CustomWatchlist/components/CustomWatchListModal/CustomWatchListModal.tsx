import React, { useMemo } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { Box, Button, FormControlLabel, InputLabel, Select, MenuItem, Grid, Radio, RadioGroup, Switch, Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { CustomWatchlistActions } from 'models/CustomWatchlist.model';
import classNames from 'classnames';
import { useStyles } from './CustomWatchListModal.styles';
import { FakeInputs } from '../FakeInputs/FakeInputs';

const placeholderOption = 'no-action';

export function CustomWatchListModal() {
  const intl = useIntl();
  const classes = useStyles();

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

  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.modalTitle}>
        {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.title' })}
      </Typography>
      <Formik
        initialValues={{
          name: 'asdasd',
          action: 'no-action',
        }}
        onSubmit={(values) => {
          console.log('submit', values);
        }}
      >
        {({ handleChange, values, setFieldValue }) => {
          console.log('val', values);
          return (
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
                      className={classNames({
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
                        {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.upload.file.label.title' })}
                      </Typography>
                      <Typography variant="body1" className={classes.colorGrey}>
                        {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.upload.file.label.subTitle' })}
                      </Typography>
                    </InputLabel>
                    <input
                      id="raised-button-file"
                      type="file"
                      accept=".xls, .csv"
                      hidden
                    />
                    <label htmlFor="raised-button-file">
                      <Button
                        variant="outlined"
                        component="span"
                        fullWidth
                        color="primary"
                        size="large"
                      >
                        <FiPlus size={12} />
                        {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.upload.file' })}
                      </Button>
                    </label>
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
                  {true ? <FakeInputs /> : <div />}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="outlined" color="primary" size="large" fullWidth>
                    {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.back' })}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" size="large" fullWidth>
                    {intl.formatMessage({ id: 'CustomWatchlist.settings.modal.button.done' })}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
