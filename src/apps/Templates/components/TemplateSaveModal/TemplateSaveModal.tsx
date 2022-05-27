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
import { QATags } from 'models/QA.model';
import { ReactComponent as CheckboxOff } from 'assets/icon-checkbox-off.svg';
import { ReactComponent as CheckboxOn } from 'assets/icon-checkbox-on.svg';
import { IoCloseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { InfoTooltip, notification } from 'apps/ui';
import { useFlowListLoad } from 'apps/FlowList';
import { Routes } from 'models/Router.model';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { flatten, groupBy, pickBy, uniqBy } from 'lodash';
import { useLoadMetadataList } from '../../hooks/UseLoadMetadataList';
import { selectIndustryMetadata, selectCountryMetadata, selectCurrentTemplateModelValue } from '../../store/Templates.selectors';
import {
  ITemplateMetadata,
  TemplateSaveInputsTypes,
  TemplateSaveInputs,
  ITemplate,
  TEMPLATE_SAVE_FORM_INITIAL_STATE,
  templateSaveFormEdit,
  saveTemplateOptions,
  IFieldValidation,
} from '../../model/Templates.model';
import { createTemplate, updateTemplate, toggleUnsavedChanges } from '../../store/Templates.actions';
import { useStyles } from './TemplateSaveModal.styles';

export function TemplateSaveModal({ edit }: saveTemplateOptions) {
  const formatMessage = useFormatMessage();
  const flowListModel = useFlowListLoad();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [, closeOverlay] = useOverlay();
  const history = useHistory();
  const industries = useSelector<any, ITemplateMetadata[]>(selectIndustryMetadata);
  const regions = useSelector<any, ITemplateMetadata[]>(selectCountryMetadata);
  const currentTemplate = useSelector<any, ITemplate>(selectCurrentTemplateModelValue);
  const intl = useIntl();
  const TEMPLATE_SAVE_FORM_EDIT = edit && templateSaveFormEdit(currentTemplate);
  const defaultValuesForModal = edit ? TEMPLATE_SAVE_FORM_EDIT : TEMPLATE_SAVE_FORM_INITIAL_STATE;

  useLoadMetadataList();

  useEffect(() => {
    if (currentTemplate !== null && !edit) {
      history.push(`${Routes.templates.root}/${currentTemplate._id}`);
      closeOverlay();
    }
  }, [currentTemplate, history, closeOverlay, edit]);

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors, isSubmitting, isValid } } = useForm<TemplateSaveInputs>({
    mode: 'onChange',
    defaultValues: defaultValuesForModal,
  });
  const values = watch();

  const metamapNameRegister = register(TemplateSaveInputsTypes.MetamapName, {
    required: formatMessage('validations.required'),
    maxLength: {
      value: 30,
      message: intl.formatMessage({ id: 'Templates.saveModal.validation.max' }, { max: 35 }),
    },
    validate: (value) => (currentTemplate?.flow?.name === value || !flowListModel?.value?.find((flow) => flow.name === value)) || formatMessage('validators.nameOccupied'),
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
  const regionsRegister = register(TemplateSaveInputsTypes.Regions, {
    required: formatMessage('validations.required'),
    validate: (value) => value?.length > 0 || formatMessage('validations.required'),
  });
  const descriptionRegister = register(TemplateSaveInputsTypes.Description, {
    required: formatMessage('validations.required'),
    maxLength: {
      value: 150,
      message: intl.formatMessage({ id: 'Templates.saveModal.validation.max' }, { max: 150 }),
    },
  });

  const handleSubmitSaveForm = async () => {
    try {
      await dispatch(createTemplate(values[TemplateSaveInputsTypes.TemplateTitle], values[TemplateSaveInputsTypes.MetamapName], values[TemplateSaveInputsTypes.Description], [...values[TemplateSaveInputsTypes.Industries], ...values[TemplateSaveInputsTypes.Regions]]));
      dispatch(toggleUnsavedChanges(false));
    } catch (error) {
      notification.error(formatMessage('Error.common'));
    }
  };

  const handleSubmitPatchForm = async () => {
    try {
      await dispatch(updateTemplate(values[TemplateSaveInputsTypes.MetamapName], values[TemplateSaveInputsTypes.TemplateTitle], values[TemplateSaveInputsTypes.Description], [...values[TemplateSaveInputsTypes.Industries], ...values[TemplateSaveInputsTypes.Regions]]));
      closeOverlay();
    } catch (error) {
      notification.error(formatMessage('Error.common'));
    }
  };

  const handleSaveTemplate = async () => {
    const currentAction = edit ? handleSubmitPatchForm : handleSubmitSaveForm;
    try {
      handleSubmit(currentAction)();
    } catch (error) {
      if (error) {
        notification.error(formatMessage('Error.common'));
      }
    }
  };

  const handleDeleteChip = (valueToDelete: ITemplateMetadata, property: TemplateSaveInputsTypes) => {
    setValue(property, (values[property] as ITemplateMetadata[]).filter((value) => value.name !== valueToDelete.name));
    trigger(property); // Force validation after deleting a value
  };

  const renderChip = useCallback((selectValues: ITemplateMetadata[], onDelete: (value: ITemplateMetadata, type: TemplateSaveInputsTypes) => void, type: TemplateSaveInputsTypes) => selectValues.map((selectValue) => <Chip className={classes.chip} variant="outlined" key={selectValue._id} label={selectValue.name} onDelete={() => onDelete(selectValue, type)} deleteIcon={<IoCloseOutline onMouseDown={(event) => event.stopPropagation()} />} />), [classes]);

  const getIsChecked = (value, type) => values[type].some((metadata) => metadata._id === value._id);

  const { onChange: industriesOnChange } = industriesRegister;
  const { onChange: regionsOnChange } = regionsRegister;

  const chipChange = (event, IndustryField: boolean) => {
    const uniqueIndustries = uniqBy(event.target.value as [], (metadata: ITemplateMetadata) => metadata._id);
    const hasDuplicates = event.target.value.length !== uniqueIndustries.length;
    if (hasDuplicates) {
      const group = groupBy(event.target.value, (ind) => ind._id);
      const groupWithoutDups = pickBy(group, (property) => property.length < 2);
      // eslint-disable-next-line no-param-reassign
      event.target.value = flatten(Object.values(groupWithoutDups));
    }
    if (IndustryField) industriesOnChange(event);
    regionsOnChange(event);
  };

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
                <div className={classes.tooltip}>
                  <InfoTooltip
                    placement="top-start"
                    title={formatMessage('Templates.saveModal.metamapName.tooltip')}
                  />
                </div>
                <TextField
                  {...metamapNameRegister}
                  className={classes.smallInput}
                  helperText={errors?.[TemplateSaveInputsTypes.MetamapName]?.message}
                  error={!!errors[TemplateSaveInputsTypes.MetamapName]}
                  type="input"
                  variant="outlined"
                  fullWidth
                  data-qa={QATags.Templates.Modal.MetamapName}
                />
              </Box>
              <Box className={classes.inputLabelAndField} mt={3}>
                <span className={classes.inputLabel}>
                  {`${formatMessage('Templates.saveModal.fields.title')}:`}
                </span>
                <div className={classes.tooltip}>
                  <InfoTooltip
                    placement="top-start"
                    title={formatMessage('Templates.saveModal.metamapTitle.tooltip')}
                  />
                </div>
                <TextField
                  {...templateTitleRegister}
                  className={classes.smallInput}
                  helperText={errors?.[TemplateSaveInputsTypes.TemplateTitle]?.message}
                  error={!!errors[TemplateSaveInputsTypes.TemplateTitle]}
                  type="input"
                  variant="outlined"
                  fullWidth
                  data-qa={QATags.Templates.Modal.TemplateTitle}
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
                  // @ts-ignore
                  onChange={(event: React.ChangeEvent<{ name?: string; value: ITemplateMetadata[]}>) => {
                    chipChange(event, true);
                  }}
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
                  renderValue={(selectValues) => renderChip(selectValues as ITemplateMetadata[], handleDeleteChip, TemplateSaveInputsTypes.Industries)}
                  autoWidth={false}
                  error={!!errors[TemplateSaveInputsTypes.Industries]}
                  data-qa={QATags.Templates.Modal.IndustriesSelect}
                >
                  {industries.map((industry) => (
                    // @ts-ignore
                    <MenuItem key={industry._id} value={industry} className={classes.menuItem}>
                      <Checkbox checked={getIsChecked(industry, TemplateSaveInputsTypes.Industries)} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />
                      <ListItemText primary={industry.name} />
                    </MenuItem>
                  ))}
                </Select>
                {!!errors[TemplateSaveInputsTypes.Industries] && <FormHelperText className={classes.selectHelperText}>{(errors?.[TemplateSaveInputsTypes.Industries] as IFieldValidation)?.message}</FormHelperText>}
              </Box>
              <Box className={classes.inputLabelAndField} mt={3} justifyContent="end !important">
                <Box mr={2}>
                  <span className={classes.inputLabel}>
                    {`${formatMessage('Templates.saveModal.fields.regions')}:`}
                  </span>
                </Box>
                <Select
                  {...regionsRegister}
                  // @ts-ignore
                  onChange={(event: React.ChangeEvent<{ name?: string; value: ITemplateMetadata[]}>) => {
                    chipChange(event, false);
                  }}
                  value={values[TemplateSaveInputsTypes.Regions]}
                  multiple
                  disableUnderline
                  className={classnames(classes.select, { [classes.selectError]: !!errors[TemplateSaveInputsTypes.Regions] })}
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
                  renderValue={(selectValues) => renderChip(selectValues as ITemplateMetadata[], handleDeleteChip, TemplateSaveInputsTypes.Regions)}
                  error={!!errors[TemplateSaveInputsTypes.Regions]}
                  data-qa={QATags.Templates.Modal.CountriesSelect}
                >
                  {regions.map((region) => (
                    // @ts-ignore
                    <MenuItem key={region.name} value={region} className={classes.menuItem}>
                      <Checkbox checked={getIsChecked(region, TemplateSaveInputsTypes.Regions)} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />
                      <ListItemText primary={region.name} />
                    </MenuItem>
                  ))}
                </Select>
                {!!errors[TemplateSaveInputsTypes.Regions] && <FormHelperText className={classes.selectHelperText}>{(errors[TemplateSaveInputsTypes.Regions] as IFieldValidation)?.message}</FormHelperText>}
              </Box>
            </Box>
          </Box>
          <Box mt={3} display="flex" justifyContent="space-between">
            <span className={classes.inputLabel}>
              {`${formatMessage('Templates.saveModal.fields.description')}:`}
            </span>
            <Box flexBasis="84.4%">
              <TextareaAutosize
                {...descriptionRegister}
                className={classnames(classes.textArea, { [classes.selectError]: !!errors[TemplateSaveInputsTypes.Description] })}
                maxRows={3}
                minRows={3}
                data-qa={QATags.Templates.Modal.Description}
              />
              {!!errors[TemplateSaveInputsTypes.Description] && <FormHelperText className={classes.textAreaHelperText}>{(errors[TemplateSaveInputsTypes.Description] as IFieldValidation)?.message}</FormHelperText>}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.saveTemplateButtonContainer} mt={3} pl={3} pr={3} pb={2}>
        <Button
          className={classes.buttonSave}
          data-qa={QATags.Templates.Modal.SaveButton}
          color="primary"
          variant="contained"
          onClick={handleSaveTemplate}
          disabled={isSubmitting || !isValid}
        >
          {formatMessage('Templates.saveModal.saveButton')}
        </Button>
      </Box>
    </Modal>
  );
}
