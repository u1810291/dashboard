import React, { useCallback, useEffect } from 'react';
import { useFormatMessage } from 'apps/intl';
import { useOverlay, Modal } from 'apps/overlay';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormHelperText from '@material-ui/core/FormHelperText';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'apps/ui';
import { Routes } from 'models/Router.model';
import { useHistory } from 'react-router-dom';
import { useLoadMetadataList } from '../../hooks/UseLoadMetadataList';
import { selectCountryMetadata, selectIndustryMetadata, selectCurrentTemplateModelValue } from '../../store/Templates.selectors';
import { ITemplateMetadata, TemplateSaveInputsTypes, TemplateSaveInputs, ITemplate, TEMPLATE_SAVE_FORM_INITIAL_STATE } from '../../model/Templates.model';
import { createTemplate } from '../../store/Templates.actions';
import { useStyles } from './TemplateSaveModal.styles';
import { useIntl } from 'react-intl';

export function TemplateSaveModal() {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [, closeOverlay] = useOverlay();
  const history = useHistory();
  const industries = useSelector<any, ITemplateMetadata[]>(selectIndustryMetadata);
  const countries = useSelector<any, ITemplateMetadata[]>(selectCountryMetadata);
  const currentTemplate = useSelector<any, ITemplate>(selectCurrentTemplateModelValue);
  const intl = useIntl();

  useEffect(() => {
    if (currentTemplate !== null) {
      history.push(`${Routes.templates.root}/${currentTemplate._id}`);
      closeOverlay();
    }
  }, [currentTemplate, history, closeOverlay]);

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors, isSubmitting, isValid, isDirty } } = useForm<TemplateSaveInputs>({
    mode: 'onChange',
    defaultValues: TEMPLATE_SAVE_FORM_INITIAL_STATE,
  });
  const values = watch();

  const metamapNameRegister = register(TemplateSaveInputsTypes.MetamapName, {
    required: formatMessage('validations.required'),
    maxLength: {
      value: 35,
      message: intl.formatMessage({ id: 'Templates.saveModal.validation.max' }, { max: 35 }),
    },
  });
  const templateTitleRegister = register(TemplateSaveInputsTypes.TemplateTitle, {
    required: formatMessage('validations.required'),
    maxLength: {
      value: 35,
      message: intl.formatMessage({ id: 'Templates.saveModal.validation.max' }, { max: 35 }),
    },
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
    maxLength: {
      value: 300,
      message: intl.formatMessage({ id: 'Templates.saveModal.validation.max' }, { max: 300 }),
    },
  });

  useLoadMetadataList();

  const handleSubmitForm = async () => {
    const response = await dispatch(createTemplate(values[TemplateSaveInputsTypes.TemplateTitle], values[TemplateSaveInputsTypes.MetamapName], values[TemplateSaveInputsTypes.Description], [...values[TemplateSaveInputsTypes.Industries], ...values[TemplateSaveInputsTypes.Countries]]));
    return response;
  };

  const handleSaveTemplate = async () => {
    try {
      handleSubmit(handleSubmitForm)();
    } catch (error) {
      if (error) {
        notification.error(formatMessage('Error.common'));
      }
    }
  };

  const handleDeleteChip = (valueToDelete: ITemplateMetadata, property: TemplateSaveInputsTypes) => {
    setValue(property, (values[property] as ITemplateMetadata[]).filter((value) => value !== valueToDelete));
    trigger(property); // Force validation after deleting a value
  };

  const renderChip = useCallback((selectValues: ITemplateMetadata[], onDelete: (value: ITemplateMetadata, type: TemplateSaveInputsTypes) => void, type: TemplateSaveInputsTypes) => selectValues.map((selectValue) => <Chip className={classes.chip} variant="outlined" key={selectValue.name} label={selectValue.name} onDelete={() => onDelete(selectValue, type)} deleteIcon={<IoCloseOutline onMouseDown={(event) => event.stopPropagation()} />} />), [classes]);

  const getIsChecked = (value, type) => values[type].some((metadata) => metadata.name === value.name);

  return (
    <Modal
      onClose={closeOverlay}
      className={classes.modal}
      customCloseIcon={<IoCloseOutline className={classes.closeIcon} />}
    >
      <Box className={classes.headerContainer}>
        <span className={classes.headerTitle}>{`${formatMessage('Templates.saveModal.title')}`}</span>
      </Box>
      <Box p={2} pl={3} pr={3}>
        <span className={classes.inputsHeaderTitle}>{`${formatMessage('Templates.saveModal.subtitle')}`}</span>
        <Box mt={3}>
          <Box className={classes.inputsColumnsContainer}>
            <Box className={classes.inputsColumn} id="col_1" flexBasis="52% !important">
              <Box className={classes.inputLabelAndField}>
                <span className={classes.inputLabel}>
                  {`${formatMessage('Templates.saveModal.fields.name')}:`}
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
                  {`${formatMessage('Templates.saveModal.fields.title')}:`}
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
                    {`${formatMessage('Templates.saveModal.fields.industries')}:`}
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
                  renderValue={(selectValues) => renderChip(selectValues as any, handleDeleteChip, TemplateSaveInputsTypes.Industries)}
                  autoWidth={false}
                  error={!!errors[TemplateSaveInputsTypes.Industries]}
                >
                  {industries.map((industry) => (
                    // @ts-ignore
                    <MenuItem key={industry.name} value={industry} className={classes.menuItem}>
                      <Checkbox checked={getIsChecked(industry, TemplateSaveInputsTypes.Industries)} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />
                      <ListItemText primary={industry.name} />
                    </MenuItem>
                  ))}
                </Select>
                {!!errors[TemplateSaveInputsTypes.Industries] && <FormHelperText className={classes.selectHelperText}>{(errors?.[TemplateSaveInputsTypes.Industries] as any)?.message}</FormHelperText>}
              </Box>
              <Box className={classes.inputLabelAndField} mt={3} justifyContent="end !important">
                <Box mr={2}>
                  <span className={classes.inputLabel}>
                    {`${formatMessage('Templates.saveModal.fields.countries')}:`}
                  </span>
                </Box>
                <Select
                  {...countriesRegister}
                  value={values[TemplateSaveInputsTypes.Countries]}
                  renderValue={(selectValues) => renderChip(selectValues as any, handleDeleteChip, TemplateSaveInputsTypes.Countries)}
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
                      <Checkbox checked={getIsChecked(country, TemplateSaveInputsTypes.Countries)} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />
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
              {`${formatMessage('Templates.saveModal.fields.description')}:`}
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
          {formatMessage('Templates.saveModal.saveButton')}
        </Button>
      </Box>
    </Modal>
  );
}
