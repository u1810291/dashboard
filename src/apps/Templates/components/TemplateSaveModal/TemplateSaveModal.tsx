import React, { useCallback } from 'react';
import { useFormatMessage } from 'apps/intl';
import { useOverlay, Modal } from 'apps/overlay';
import { Box, Chip, TextareaAutosize, TextField, Button, Select, MenuItem, Checkbox, ListItemText, FormHelperText } from '@material-ui/core';
import classnames from 'classnames';
import { FiArrowRight, FiArrowDownLeft, FiArrowLeft } from 'react-icons/fi';
import { appPalette } from 'apps/theme';
import { useStyles } from './TemplateSaveModal.styles';
import { useForm } from 'react-hook-form';
import { TemplateSaveInputsTypes } from 'apps/Templates/model/Templates.model';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { IoCloseOutline } from 'react-icons/io5';

interface TemplateSaveInputs {
  [TemplateSaveInputsTypes.TemplateTitle]: string;
  [TemplateSaveInputsTypes.MetamapName]: string;
  [TemplateSaveInputsTypes.Industries]: string[];
  [TemplateSaveInputsTypes.Countries]: string[];
  [TemplateSaveInputsTypes.Description]: string;
}

const COUNTRIES_MOCK = ['North America', 'South and Central America', 'Asia', 'Europe', 'Africa', 'Oceania'];
const INDUSTRIES_MOCK = ['Work', 'Finance', 'Neobanking', 'Crypto'];

// const renderChip = (values, onDelete, type) => values.map((value) => <Chip className={classes.chip} variant="outlined" key={value} label={value} onDelete={() => onDelete(value, type)} deleteIcon={<IoCloseOutline onMouseDown={(event) => event.stopPropagation()} />} />);

export function TemplateSaveModal({ onSubmit }) {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const [, closeOverlay] = useOverlay();

  const { register, handleSubmit, setError, setValue, watch, formState: { errors, isSubmitting, isValid, isDirty } } = useForm<TemplateSaveInputs>({
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
    validate: (value) => value?.length > 0 || formatMessage('validations.required'),
  });
  const countriesRegister = register(TemplateSaveInputsTypes.Countries, {
    required: formatMessage('validations.required'),
    validate: (value) => value?.length > 0 || formatMessage('validations.required'),
  });
  const descriptionRegister = register(TemplateSaveInputsTypes.Description, {
    required: formatMessage('validations.required'),
    minLength: 3,
    maxLength: 20,
  });

  console.log(errors, isValid, isDirty, isSubmitting, values);

  const handleSaveTemplate = () => {

  };

  const handleDeleteChip = (valueToDelete, property) => {
    console.log(valueToDelete);
    setValue(property, values[property].filter((value) => value !== valueToDelete));
  };

  const renderChip = useCallback((selectValues, onDelete, type) => selectValues.map((selectValue) => <Chip className={classes.chip} variant="outlined" key={selectValue} label={selectValue} onDelete={() => onDelete(selectValue, type)} deleteIcon={<IoCloseOutline onMouseDown={(event) => event.stopPropagation()} />} />), [classes]);

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
                  className={classnames(classes.select, { [classes.selectError]: !!errors[TemplateSaveInputsTypes.Industries] })}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                    className: classes.dropdownMenu,
                    PaperProps: {
                      className: classes.dropdownMenuPaper,
                    },
                  }}
                  renderValue={(selectValues) => renderChip(selectValues, handleDeleteChip, TemplateSaveInputsTypes.Industries)}
                  autoWidth={false}
                  error={!!errors[TemplateSaveInputsTypes.Industries]}
                >
                  {INDUSTRIES_MOCK.map((industry) => (
                    <MenuItem key={industry} value={industry} className={classes.menuItem}>
                      <Checkbox checked={values[TemplateSaveInputsTypes.Industries].includes(industry)} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />
                      <ListItemText primary={industry} />
                    </MenuItem>
                  ))}
                </Select>
                {!!errors[TemplateSaveInputsTypes.Industries] && <FormHelperText className={classes.selectHelperText}>{(errors?.[TemplateSaveInputsTypes.Industries] as any)?.message}</FormHelperText>}
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
                  renderValue={(selectValues) => renderChip(selectValues, handleDeleteChip, TemplateSaveInputsTypes.Countries)}
                  multiple
                  disableUnderline
                  className={classnames(classes.select, { [classes.selectError]: !!errors[TemplateSaveInputsTypes.Countries] })}
                  autoWidth={false}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                    className: classes.dropdownMenu,
                    PaperProps: {
                      className: classes.dropdownMenuPaper,
                    },
                  }}
                  error={!!errors[TemplateSaveInputsTypes.Countries]}
                >
                  {COUNTRIES_MOCK.map((country) => (
                    <MenuItem key={country} value={country} className={classes.menuItem}>
                      <Checkbox checked={values[TemplateSaveInputsTypes.Countries].includes(country)} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />
                      <ListItemText primary={country} />
                    </MenuItem>
                  ))}
                </Select>
                {!!errors[TemplateSaveInputsTypes.Countries] && <FormHelperText className={classes.selectHelperText}>{(errors[TemplateSaveInputsTypes.Countries] as any)?.message}</FormHelperText>}
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
                className={classnames(classes.textArea, { [classes.selectError]: !!errors[TemplateSaveInputsTypes.Description] })}
                maxRows={3}
                minRows={3}
              />
              {!!errors[TemplateSaveInputsTypes.Description] && <FormHelperText className={classes.textAreaHelperText}>{(errors[TemplateSaveInputsTypes.Description] as any)?.message}</FormHelperText>}
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
