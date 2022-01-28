import React, { useCallback } from 'react';
import { useFormatMessage } from 'apps/intl';
import { useOverlay, Modal } from 'apps/overlay';
import { Box, Grid, InputLabel, TextField } from '@material-ui/core';
import classnames from 'classnames';
import { FiArrowRight, FiArrowDownLeft, FiArrowLeft } from 'react-icons/fi';
import { appPalette } from 'apps/theme';
import { useStyles } from './TemplateSaveModal.styles';
import { useForm } from 'react-hook-form';

interface TemplateSaveInputs {
  metamapName: string;
  templateTitle: string;
  industries: string;
  countries: string;
}

export function TemplateSaveModal({ onSubmit }) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<TemplateSaveInputs>();

  const metamapNameRegister = {};
  const industriesRegister = {};
  const templateTitleRegister = {};
  const countriesRegister = {};

  return (
    <Modal
      onClose={closeOverlay}
      className={classes.modal}
    >
      <Box className={classes.headerContainer}>
        <span className={classes.headerTitle}>Metamap template details</span>
      </Box>
      <Box p={2} pl={3} pr={3}>
        <span className={classes.inputsHeaderTitle}>Fill in the following fields to create a new metamap template. When you Save, this template will be live to users</span>
        <Box mt={3}>
          <Grid container spacing={1} justifyContent="space-between">
            <Grid item xs={6} id="inp_1">
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <span className={classes.inputLabel}>
                    Metamap name:
                  </span>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    {...metamapNameRegister}
                    className={classes.smallInput}
                    helperText={errors?.metamapName?.message}
                    error={!!errors.metamapName}
                    type="input"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={6} id="col_2">
              <Grid container alignItems="center">
                <Grid item xs={3}>
                  <span className={classes.inputLabel}>
                    Industries:
                  </span>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    {...industriesRegister}
                    className={classes.smallInput}
                    helperText={errors?.industries?.message}
                    error={!!errors.industries}
                    type="input"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={6} alignItems="center">
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <span className={classes.inputLabel}>
                    Template title:
                  </span>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    {...templateTitleRegister}
                    className={classes.smallInput}
                    helperText={errors?.templateTitle?.message}
                    error={!!errors.templateTitle}
                    type="input"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container item xs={6} alignItems="center">
              <Grid container alignItems="center">
                <Grid item xs={3}>
                  <span className={classes.inputLabel}>
                    Countries:
                  </span>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    {...countriesRegister}
                    className={classes.smallInput}
                    helperText={errors?.templateTitle?.message}
                    error={!!errors.templateTitle}
                    type="input"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}
