import React, { useCallback } from 'react';
import { useFormatMessage } from 'apps/intl';
import { useOverlay, Modal } from 'apps/overlay';
import { Box, Grid, InputLabel, TextareaAutosize, TextField, Button, Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import classnames from 'classnames';
import { FiArrowRight, FiArrowDownLeft, FiArrowLeft } from 'react-icons/fi';
import { appPalette } from 'apps/theme';
import { useStyles } from './TemplateSaveModal.styles';
import { useForm } from 'react-hook-form';
import { TemplateSaveInputsTypes } from 'apps/Templates/model/Templates.model';

interface TemplateSaveInputs {
  [TemplateSaveInputsTypes.TemplateTitle]: string;
  [TemplateSaveInputsTypes.MetamapName]: string;
  [TemplateSaveInputsTypes.Industries]: string[];
  [TemplateSaveInputsTypes.Countries]: string[];
  [TemplateSaveInputsTypes.Description]: string;
}

const COUNTRIES_MOCK = ['North America', 'South and Central America', 'Asia', 'Europe', 'Africa', 'Oceania'];
const INDUSTRIES_MOCK = ['Work', 'Finance', 'Neobanking', 'Crypto'];

export function TemplateSaveModal({ onSubmit }) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();

  const { register, handleSubmit, setError, watch, formState: { errors, isSubmitting, isValid, isDirty } } = useForm<TemplateSaveInputs>({
    mode: 'onBlur',
    defaultValues: {
      [TemplateSaveInputsTypes.TemplateTitle]: '',
      [TemplateSaveInputsTypes.MetamapName]: '',
      [TemplateSaveInputsTypes.Industries]: [],
      [TemplateSaveInputsTypes.Countries]: [],
      [TemplateSaveInputsTypes.Description]: '',
    },
  });
  const values = watch();

  const metamapNameRegister = register(TemplateSaveInputsTypes.MetamapName, {
    required: formatMessage('validations.required'),
    minLength: 3,
    maxLength: 20,
  });
  const templateTitleRegister = register(TemplateSaveInputsTypes.TemplateTitle, {
    required: formatMessage('validations.required'),
    minLength: 3,
    maxLength: 20,
  });
  const industriesRegister = register(TemplateSaveInputsTypes.Industries, {
    required: formatMessage('validations.required'),
  });
  const countriesRegister = register(TemplateSaveInputsTypes.Countries, {
    required: formatMessage('validations.required'),
  });
  const descriptionRegister = register(TemplateSaveInputsTypes.Description, {
    required: formatMessage('validations.required'),
    minLength: 3,
    maxLength: 20,
  });

  console.log(errors, isValid, isDirty, isSubmitting);

  const handleSaveTemplate = () => {

  };

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
          <Box className={classes.inputsColumnsContainer}>
            <Box className={classes.inputsColumn} id="col_1">
              <Box className={classes.inputLabelAndField}>
                <span className={classes.inputLabel}>
                  Metamap name:
                </span>
                <TextField
                  {...metamapNameRegister}
                  className={classes.smallInput}
                  helperText={errors?.[TemplateSaveInputsTypes.MetamapName]?.message}
                  error={!!errors[TemplateSaveInputsTypes.MetamapName]}
                  type="input"
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box className={classes.inputLabelAndField} mt={3}>
                <span className={classes.inputLabel}>
                  Template title:
                </span>
                <TextField
                  {...templateTitleRegister}
                  className={classes.smallInput}
                  helperText={errors?.[TemplateSaveInputsTypes.TemplateTitle]?.message}
                  error={!!errors[TemplateSaveInputsTypes.TemplateTitle]}
                  type="input"
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </Box>
            <Box className={classes.inputsColumn} id="col_2">
              <Box className={classes.inputLabelAndField} justifyContent="end !important">
                <Box mr={2}>
                  <span className={classes.inputLabel}>
                    Industries:
                  </span>
                </Box>
                <Select
                  {...industriesRegister}
                  value={values[TemplateSaveInputsTypes.Industries]}
                  multiple
                  disableUnderline
                  className={classes.select}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  }}
                  autoWidth={false}
                >
                  {INDUSTRIES_MOCK.map((industry) => (
                    <MenuItem key={industry} value={industry}>
                      <Checkbox checked={false} color="primary" />
                      <ListItemText primary={industry} />
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box className={classes.inputLabelAndField} mt={3} justifyContent="end !important">
                <Box mr={2}>
                  <span className={classes.inputLabel}>
                    Countries:
                  </span>
                </Box>
                <Select
                  {...countriesRegister}
                  value={values[TemplateSaveInputsTypes.Countries]}
                  multiple
                  disableUnderline
                  className={classes.select}
                  autoWidth={false}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  }}
                >
                  {COUNTRIES_MOCK.map((country) => (
                    <MenuItem key={country} value={country}>
                      <Checkbox checked={false} color="primary" />
                      <ListItemText primary={country} />
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Box>
          <Box mt={3} display="flex" justifyContent="space-between">
            <span className={classes.inputLabel}>
              Description:
            </span>
            <Box flexBasis="85%">
              <TextareaAutosize
                {...descriptionRegister}
                className={classes.textArea}
                maxRows={3}
                minRows={3}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.saveTemplateButtonContainer} mt={3} pl={3} pr={3} pb={2}>
        <Button
          className={classes.buttonSave}
          color="primary"
          variant="contained"
          onClick={handleSaveTemplate}
          disabled={isSubmitting || !isValid || !isDirty}
        >
          Save Template
        </Button>
      </Box>
    </Modal>
  );
}
