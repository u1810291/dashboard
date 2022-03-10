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
import { useLoadMetadataList } from '../../hooks/UseLoadMetadataList';
import { selectCountryMetadata, selectIndustryMetadata, selectCurrentTemplateModelValue } from '../../store/Templates.selectors';
import {
  ITemplateMetadata,
  TemplateSaveInputsTypes,
  TemplateSaveInputs,
  ITemplate,
  TEMPLATE_SAVE_FORM_INITIAL_STATE,
  templateSaveFormEdit,
  saveTemplateOptions,
} from '../../model/Templates.model';
import { createTemplate, updateTemplate } from '../../store/Templates.actions';
import { useStyles } from './TemplateSaveModal.styles';

export function TemplateSaveModal({ edit }: saveTemplateOptions) {
  const formatMessage = useFormatMessage();
  const flowListModel = useFlowListLoad();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [, closeOverlay] = useOverlay();
  const history = useHistory();
  const industries = useSelector<any, ITemplateMetadata[]>(selectIndustryMetadata);
  const countries = useSelector<any, ITemplateMetadata[]>(selectCountryMetadata);
  const currentTemplate = useSelector<any, ITemplate>(selectCurrentTemplateModelValue);
  const intl = useIntl();
  const TEMPLATE_SAVE_FORM_EDIT = edit && templateSaveFormEdit(currentTemplate);
  const defaultValuesForModal = edit ? TEMPLATE_SAVE_FORM_EDIT : TEMPLATE_SAVE_FORM_INITIAL_STATE;

  useEffect(() => {
    if (currentTemplate !== null && !edit) {
      history.push(`${Routes.templates.root}/${currentTemplate._id}`);
      closeOverlay();
    }
  }, [currentTemplate, history, closeOverlay]);

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors, isSubmitting, isValid, isDirty } } = useForm<TemplateSaveInputs>({
    mode: 'onChange',
    defaultValues: defaultValuesForModal,
  });
  const values = watch();

  const metamapNameRegister = register(TemplateSaveInputsTypes.MetamapName, {
    required: formatMessage('validations.required'),
    maxLength: {
      value: 35,
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
  // const countriesRegister = register(TemplateSaveInputsTypes.Countries, {
  //   required: formatMessage('validations.required'),
  //   validate: (value) => value?.length > 0 || formatMessage('validations.required'),
  // });
  // we will return this part in Q2, we were told to put it away for a while
  const descriptionRegister = register(TemplateSaveInputsTypes.Description, {
    required: formatMessage('validations.required'),
    maxLength: {
      value: 300,
      message: intl.formatMessage({ id: 'Templates.saveModal.validation.max' }, { max: 300 }),
    },
  });

  useLoadMetadataList();

  const handleSubmitSaveForm = async () => {
    const response = await dispatch(createTemplate(values[TemplateSaveInputsTypes.TemplateTitle], values[TemplateSaveInputsTypes.MetamapName], values[TemplateSaveInputsTypes.Description], [...values[TemplateSaveInputsTypes.Industries]]));
    return response;
  };

  const handleSubmitPatchFrom = async () => {
    const response = await dispatch(updateTemplate(values[TemplateSaveInputsTypes.MetamapName], values[TemplateSaveInputsTypes.TemplateTitle], values[TemplateSaveInputsTypes.Description], [...values[TemplateSaveInputsTypes.Industries]]));
    closeOverlay();
    return response;
  };

  const handleSaveTemplate = async () => {
    const currentAction = edit ? handleSubmitPatchFrom : handleSubmitSaveForm;
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

  const renderChip = useCallback((selectValues: ITemplateMetadata[], onDelete: (value: ITemplateMetadata, type: TemplateSaveInputsTypes) => void, type: TemplateSaveInputsTypes) => selectValues.map((selectValue) => <Chip className={classes.chip} variant="outlined" key={selectValue.name} label={selectValue.name} onDelete={() => onDelete(selectValue, type)} deleteIcon={<IoCloseOutline onMouseDown={(event) => event.stopPropagation()} />} />), [classes]);

  const getIsChecked = (value, type) => values[type].some((metadata) => metadata._id === value._id);

  const isCheckedChange = (value: ITemplateMetadata, type: TemplateSaveInputsTypes) => {
    const isCurrentPointChecked = getIsChecked(value, type);
    return isCurrentPointChecked && handleDeleteChip(value, type);
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
                  data-qa={QATags.Templates.Modal.IndustriesSelect}
                >
                  {industries.map((industry) => (
                    <MenuItem
                      // @ts-ignore
                      value={industry}
                      key={industry._id}
                      className={classes.menuItem}
                      onChange={() => {
                        isCheckedChange(industry, TemplateSaveInputsTypes.Industries);
                      }}
                    >
                      <Checkbox checked={getIsChecked(industry, TemplateSaveInputsTypes.Industries)} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} />
                      <ListItemText primary={industry.name} />
                    </MenuItem>
                  ))}
                </Select>
                {!!errors[TemplateSaveInputsTypes.Industries] && <FormHelperText className={classes.selectHelperText}>{(errors?.[TemplateSaveInputsTypes.Industries] as any)?.message}</FormHelperText>}
              </Box>
              {/* we will return this part in Q2, we were told to put it away for a while */}
              {/* <Box className={classes.inputLabelAndField} mt={3} justifyContent="end !important"> */}
              {/*  <Box mr={2}> */}
              {/*    <span className={classes.inputLabel}> */}
              {/*      {`${formatMessage('Templates.saveModal.fields.countries')}:`} */}
              {/*    </span> */}
              {/*  </Box> */}
              {/*  <Select */}
              {/*    {...countriesRegister} */}
              {/*    value={values[TemplateSaveInputsTypes.Countries]} */}
              {/*    renderValue={(selectValues) => renderChip(selectValues as any, handleDeleteChip, TemplateSaveInputsTypes.Countries)} */}
              {/*    multiple */}
              {/*    disableUnderline */}
              {/*    className={classnames(classes.select, { [classes.selectError]: !!errors[TemplateSaveInputsTypes.Countries] })} */}
              {/*    autoWidth={false} */}
              {/*    MenuProps={{ */}
              {/*      anchorOrigin: { */}
              {/*        vertical: 'bottom', */}
              {/*        horizontal: 'left', */}
              {/*      }, */}
              {/*      getContentAnchorEl: null, */}
              {/*      className: classes.dropdownMenu, */}
              {/*      PaperProps: { */}
              {/*        className: classes.dropdownMenuPaper, */}
              {/*      }, */}
              {/*    }} */}
              {/*    error={!!errors[TemplateSaveInputsTypes.Countries]} */}
              {/*    data-qa={QATags.Templates.Modal.CountriesSelect} */}
              {/*  > */}
              {/*    {countries.map((country) => ( */}
              {/*      // @ts-ignore */}
              {/*      <MenuItem key={country.name} value={country} className={classes.menuItem}> */}
              {/*        <Checkbox checked={getIsChecked(country, TemplateSaveInputsTypes.Countries)} color="primary" checkedIcon={<CheckboxOn />} icon={<CheckboxOff />} /> */}
              {/*        <ListItemText primary={country.name} /> */}
              {/*      </MenuItem> */}
              {/*    ))} */}
              {/*  </Select> */}
              {/*  {!!errors[TemplateSaveInputsTypes.Countries] && <FormHelperText className={classes.selectHelperText}>{(errors[TemplateSaveInputsTypes.Countries] as any)?.message}</FormHelperText>} */}
              {/* </Box> */}
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
                data-qa={QATags.Templates.Modal.Description}
              />
              {!!errors[TemplateSaveInputsTypes.Description] && <FormHelperText className={classes.textAreaHelperText}>{(errors[TemplateSaveInputsTypes.Description] as any)?.message}</FormHelperText>}
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
