import { Grid, Typography, Button, TextareaAutosize, Select, MenuItem } from '@material-ui/core';
import { isNil } from 'lib/isNil';
import React, { useCallback, useMemo } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiChevronDown } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { CustomDocumentReadingField, CustomDocumentVerificationFlowFieldTypes } from 'models/CustomDocument.model';
import { TextFieldInput, useStyles } from './CustomDocumentFieldSettings.styles';
import { CustomDocumentWizadFooter } from '../CustomDocumentWizadFooter/CustomDocumentWizadFooter';
import { updateCustomDocumentDocumentReadingField, editCustomDocumentDocumentReadingField, updateCustomDocumentWizardStep, updateCustomDocumentDocumentReadingEditedFieldOption, resetCustomDocumentDocumentReadingFieldOption, updateCustomDocumentDocumentReadingFieldOption } from '../../state/customDocument.actions';
import { CustomDocumentWizardStepTypes } from '../../models/customDocument.model';
import { selectCustomDocumentDocumentReadingFieldSettings, selectCustomDocumentEditedField } from '../../state/customDocument.selectors';

export function CustomDocumentFieldSettings() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const field: CustomDocumentReadingField = useSelector(selectCustomDocumentDocumentReadingFieldSettings);
  const edited: number | null = useSelector(selectCustomDocumentEditedField);
  const isValid: boolean = useMemo(() => {
    if (field?.type === CustomDocumentVerificationFlowFieldTypes.Options && field?.options?.length < 1) {
      return false;
    }

    return (field?.id?.length > 0) && (field?.inputFormat?.length > 0) && !isNil(field?.type) && (field?.label?.length > 0);
  }, [field]);

  const handleLabelUpdate = useCallback(({ target: { value } }) => {
    dispatch(updateCustomDocumentDocumentReadingField({ label: value || null }));
  }, [dispatch]);

  const handleTypeUpdate = useCallback(({ target: { value } }) => {
    dispatch(updateCustomDocumentDocumentReadingField({
      type: value || null,
      options: [],
    }));
  }, [dispatch]);

  const handleInputFormatUpdate = useCallback(({ target: { value } }) => {
    dispatch(updateCustomDocumentDocumentReadingField({ inputFormat: value || null }));
  }, [dispatch]);

  const handleIdUpdate = useCallback(({ target: { value } }) => {
    dispatch(updateCustomDocumentDocumentReadingField({ id: value || null }));
  }, [dispatch]);

  const handleEditOption = useCallback((index: number, option: string) => () => {
    dispatch(updateCustomDocumentDocumentReadingEditedFieldOption(index));
    if (isNil(index)) {
      dispatch(resetCustomDocumentDocumentReadingFieldOption());
    } else {
      dispatch(updateCustomDocumentDocumentReadingFieldOption(option));
    }
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.DocumentReadingFieldOptionSettings));
  }, [dispatch]);

  const handleDeleteOption = useCallback((index: number) => () => {
    const updatedOptions = [...field.options];
    updatedOptions.splice(index, 1);
    dispatch(updateCustomDocumentDocumentReadingField({ options: updatedOptions }));
  }, [field, dispatch]);

  const handleDone = useCallback(() => {
    dispatch(editCustomDocumentDocumentReadingField(edited, field));
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.DocumentReadingSettings));
  }, [edited, field, dispatch]);

  const handleBack = useCallback(() => {
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.DocumentReadingSettings));
  }, [dispatch]);

  return (
    <>
      <Typography variant="h3" className={classes.title}>
        {intl.formatMessage({
          id: 'CustomDocuments.settings.addFieldForYourDocument',
        })}
      </Typography>

      <Grid container spacing={3} className={classes.contentHolder}>
        <Grid item xs={6}>
          <Typography variant="subtitle2" className={classes.subtitle}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.parameterName',
            })}
          </Typography>
          <Typography variant="body1" className={classes.helpText}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.parameterName.subtitle',
            })}
          </Typography>

          <TextFieldInput
            type="text"
            onChange={handleLabelUpdate}
            value={field?.label || ''}
            className={classes.input}
            placeholder={intl.formatMessage({
              id: 'CustomDocuments.settings.parameterName.placeholder',
            })}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle2" className={classes.subtitle}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.validationType',
            })}
          </Typography>
          <Typography variant="body1" className={classes.helpText}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.validationType.subtitle',
            })}
          </Typography>
          <Select
            className={classes.select}
            disableUnderline
            onChange={handleTypeUpdate}
            value={field?.type || CustomDocumentVerificationFlowFieldTypes.Text}
            IconComponent={FiChevronDown}
          >
            <MenuItem value={CustomDocumentVerificationFlowFieldTypes.Text}>
              {intl.formatMessage({
                id: 'CustomDocuments.settings.validationType.text',
              })}
            </MenuItem>
            <MenuItem value={CustomDocumentVerificationFlowFieldTypes.Date}>
              {intl.formatMessage({
                id: 'CustomDocuments.settings.validationType.dateSelection',
              })}
            </MenuItem>
            <MenuItem value={CustomDocumentVerificationFlowFieldTypes.Options}>
              {intl.formatMessage({
                id: 'CustomDocuments.settings.validationType.optionSelection',
              })}
            </MenuItem>
          </Select>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle2" className={classes.subtitle}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.inputFormat',
            })}
          </Typography>
          <Typography variant="body1" className={classes.helpText}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.inputFormat.subtitle',
            })}
          </Typography>

          <TextareaAutosize
            rowsMax={4}
            rowsMin={4}
            onChange={handleInputFormatUpdate}
            value={field?.inputFormat || ''}
            className={classes.textarea}
            placeholder={intl.formatMessage({
              id: 'CustomDocuments.settings.inputFormat.placeholder',
            })}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle2" className={classes.subtitle}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.variableName',
            })}
          </Typography>
          <Typography variant="body1" className={classes.helpText}>
            {intl.formatMessage({
              id: 'CustomDocuments.settings.variableName.subtitle',
            })}
          </Typography>

          <TextFieldInput
            type="text"
            onChange={handleIdUpdate}
            value={field?.id || ''}
            className={classes.input}
            placeholder={intl.formatMessage({
              id: 'CustomDocuments.settings.variableName.placeholder',
            })}
          />
        </Grid>
      </Grid>

      {(field?.type === CustomDocumentVerificationFlowFieldTypes.Options) ? (
        <>
          <div className={classes.settingRow}>
            <Typography variant="subtitle2" className={classes.secondCaption}>
              {intl.formatMessage({ id: 'CustomDocuments.settings.options' })}
            </Typography>
            <Button className={classes.addButton} onClick={handleEditOption(null, null)}>
              <FiPlus className={classes.addIcon} />
              {intl.formatMessage({ id: 'CustomDocuments.settings.add' })}
            </Button>
          </div>
          <Grid container spacing={0} className={classes.optionsHolder}>
            {field.options?.map((option, index) => (
              <Grid item xs={6}>
                <div className={classes.tag} key={index}>
                  {option}
                  <div className={classes.buttonsHolder}>
                    <Button className={classes.editButton} onClick={handleEditOption(index, option)}>
                      <FiEdit2 />
                    </Button>
                    <Button className={classes.deleteButton} onClick={handleDeleteOption(index)}>
                      <FiTrash2 />
                    </Button>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </>
      ) : null}

      <CustomDocumentWizadFooter
        onBack={handleBack}
        onForward={handleDone}
        canMoveForward={isValid}
        backTitle={intl.formatMessage({ id: 'CustomDocuments.settings.back' })}
        forwardTitle={isNil(edited) ? intl.formatMessage({ id: 'CustomDocuments.settings.add' }) : intl.formatMessage({ id: 'CustomDocuments.settings.done' })}
      />
    </>
  );
}
