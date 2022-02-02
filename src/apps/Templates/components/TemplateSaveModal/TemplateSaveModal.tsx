import React, { useCallback, useEffect } from 'react';
import { useFormatMessage } from 'apps/intl';
import { useOverlay, Modal } from 'apps/overlay';
import { Box, Chip, TextareaAutosize, TextField, Button, Select, MenuItem, Checkbox, ListItemText, FormHelperText } from '@material-ui/core';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import { TemplateSaveInputsTypes } from 'apps/Templates/model/Templates.model';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { IoCloseOutline } from 'react-icons/io5';
import { createTemplate, getMetadata } from 'apps/Templates/store/Templates.actions';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'apps/ui';
import { selectCountryMetadata, selectIndustryMetadata } from 'apps/Templates/store/Templates.selectors';
import { useStyles } from './TemplateSaveModal.styles';
import { useLoadMetadataList } from 'apps/Templates/hooks/UseLoadMetadataList';

interface TemplateSaveInputs {
  [TemplateSaveInputsTypes.TemplateTitle]: string;
  [TemplateSaveInputsTypes.MetamapName]: string;
  [TemplateSaveInputsTypes.Industries]: string[];
  [TemplateSaveInputsTypes.Countries]: string[];
  [TemplateSaveInputsTypes.Description]: string;
}

export function TemplateSaveModal() {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [, closeOverlay] = useOverlay();
  const industries = useSelector(selectIndustryMetadata);
  const countries = useSelector(selectCountryMetadata);

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors, isSubmitting, isValid, isDirty } } = useForm<TemplateSaveInputs>({
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
    maxLength: 40,
  });
  const templateTitleRegister = register(TemplateSaveInputsTypes.TemplateTitle, {
    required: formatMessage('validations.required'),
    minLength: 3,
    maxLength: 40,
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
    maxLength: 300,
  });

  useLoadMetadataList();

  const handleSubmitForm = async () => {
    await dispatch(createTemplate(values[TemplateSaveInputsTypes.TemplateTitle], values[TemplateSaveInputsTypes.MetamapName], values[TemplateSaveInputsTypes.Description], [...values[TemplateSaveInputsTypes.Industries], ...values[TemplateSaveInputsTypes.Countries]]));
  };

  const handleSaveTemplate = async () => {
    try {
      await handleSubmit(handleSubmitForm)();
    } catch (error) {
      if (error) {
        notification.error(formatMessage('Error.common'));
      }
    }
  };

  const handleDeleteChip = (valueToDelete, property) => {
    setValue(property, values[property].filter((value) => value !== valueToDelete));
    trigger(property); // Force validation after deleting a value
  };

  const renderChip = useCallback((selectValues, onDelete, type) => selectValues.map((selectValue) => <Chip className={classes.chip} variant="outlined" key={selectValue.name} label={selectValue.name} onDelete={() => onDelete(selectValue, type)} deleteIcon={<IoCloseOutline onMouseDown={(event) => event.stopPropagation()} />} />), [classes]);

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
            <Box className={classes.inputsColumn} id="col_1" flexBasis="52% !important">
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
                  {industries.map((industry) => (
                    // @ts-ignore
                    <MenuItem key={industry.name} value={industry} className={classes.menuItem}>
                      <Checkbox checked={values[TemplateSaveInputsTypes.Industries].includes(industry.name)} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />
                      <ListItemText primary={industry.name} />
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
                  {countries.map((country) => (
                    // @ts-ignore
                    <MenuItem key={country.name} value={country} className={classes.menuItem}>
                      <Checkbox checked={values[TemplateSaveInputsTypes.Countries].includes(country.name)} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />
                      <ListItemText primary={country.name} />
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
