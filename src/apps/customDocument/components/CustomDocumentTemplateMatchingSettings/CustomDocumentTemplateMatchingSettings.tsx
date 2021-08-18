import { Grid, Typography, Button, TextareaAutosize } from '@material-ui/core';
import { CustomDocumentResponse, CustomDocumentTemplateMatching, CustomDocumentTemplate } from 'models/CustomDocument.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { isNil } from 'lib/isNil';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useStyles } from './CustomDocumentTemplateMatchingSettings.styles';
import { CustomDocumentWizadFooter } from '../CustomDocumentWizadFooter/CustomDocumentWizadFooter';
import { CustomDocumentWizardStepTypes } from '../../models/customDocument.model';
import { updateCustomDocumentModal, updateCustomDocumentTemplateMatchingTemplateSettings, resetCustomDocumentTemplateMatchingTemplateSettings, updateCustomDocumentTemplateMatchingEditedTemplate, updateCustomDocumentWizardStep } from '../../state/customDocument.actions';
import { selectCustomDocumentModal } from '../../state/customDocument.selectors';

export function CustomDocumentTemplateMatchingSettings() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const customDocument: Partial<CustomDocumentResponse> = useSelector(selectCustomDocumentModal);
  const verificationPatterns = useMemo(() => customDocument?.flow?.verificationPatterns || {}, [customDocument]);
  const templateMatching: Partial<CustomDocumentTemplateMatching> = useMemo(() => verificationPatterns?.[VerificationPatternTypes.TemplateMatching], [verificationPatterns]);

  const handleInstructionsUpdate = useCallback(({ target: { value } }) => {
    dispatch(updateCustomDocumentModal({
      flow: {
        verificationPatterns: {
          ...verificationPatterns,
          [VerificationPatternTypes.TemplateMatching]: {
            ...templateMatching,
            instructions: value || null,
          },
        },
      },
    }));
  }, [verificationPatterns, templateMatching, dispatch]);

  const handleDelete = useCallback((index: number) => () => {
    const updatedTemplates = [...templateMatching?.templates || []];
    updatedTemplates.splice(index, 1);
    dispatch(updateCustomDocumentModal({
      flow: {
        verificationPatterns: {
          ...verificationPatterns,
          [VerificationPatternTypes.TemplateMatching]: {
            ...templateMatching,
            templates: updatedTemplates,
          },
        },
      },
    }));
  }, [verificationPatterns, templateMatching, dispatch]);

  const handleEdit = useCallback((index: number | null, template: CustomDocumentTemplate) => () => {
    dispatch(updateCustomDocumentTemplateMatchingEditedTemplate(index));
    if (isNil(index)) {
      dispatch(resetCustomDocumentTemplateMatchingTemplateSettings());
    } else {
      dispatch(updateCustomDocumentTemplateMatchingTemplateSettings(template));
    }
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.TemplateMatchingTemplateSettings));
  }, [dispatch]);

  const handleDone = useCallback(() => {
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.AdvancedSettings));
  }, [dispatch]);

  const handleBack = useCallback(() => {
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.AdvancedSettings));
  }, [dispatch]);

  return (
    <>
      <Typography variant="h3" className={classes.title}>
        {intl.formatMessage({ id: 'CustomDocuments.settings.templateMatchingSettings' })}
      </Typography>

      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle2">{intl.formatMessage({ id: 'CustomDocuments.settings.instructionsOptional' })}</Typography>
          <Typography variant="body1" className={classes.helpText}>
            {intl.formatMessage({ id: 'CustomDocuments.settings.instructionsOptional.subtitle' })}
          </Typography>

          <TextareaAutosize
            rowsMax={3}
            rowsMin={3}
            value={templateMatching?.instructions || ''}
            className={classes.textarea}
            onChange={handleInstructionsUpdate}
            placeholder={intl.formatMessage({ id: 'CustomDocuments.settings.instructionsOptional.placeholder' })}
          />
        </Grid>

        <Grid item xs={6}>
          <Grid container item xs={12}>
            <div className={classes.settingRow}>
              <Typography variant="subtitle2" className={classes.secondCaption}>
                {intl.formatMessage({ id: 'CustomDocuments.settings.samples' })}
              </Typography>
              <Button className={classes.addButton} onClick={handleEdit(null, null)}>
                <FiPlus className={classes.addIcon} />
                {intl.formatMessage({ id: 'CustomDocuments.settings.add' })}
              </Button>
            </div>

            {templateMatching?.templates && templateMatching.templates.map((template, index) => (
              <div className={classes.tag} key={template.caption}>
                {template.caption}
                <div className={classes.buttonsHolder}>
                  <Button className={classes.editButton} onClick={handleEdit(index, template)}>
                    <FiEdit2 />
                  </Button>
                  <Button className={classes.deleteButton} onClick={handleDelete(index)}>
                    <FiTrash2 />
                  </Button>
                </div>
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <CustomDocumentWizadFooter
        onBack={handleBack}
        onForward={handleDone}
        backTitle={intl.formatMessage({ id: 'CustomDocuments.settings.back' })}
        forwardTitle={intl.formatMessage({ id: 'CustomDocuments.settings.done' })}
      />
    </>
  );
}
