import { Box, Grid, Typography, Button, Switch } from '@material-ui/core';
import { InputValidationCheck, InputValidationType } from 'models/ImageValidation.model';
import { CustomDocumentResponse, CustomDocumentReadingField, CustomDocumentTemplate } from 'models/CustomDocument.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { MerchantTags } from 'models/Merchant.model';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { BsChat } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { selectMerchantTags } from 'state/merchant/merchant.selectors';
import { useStyles } from './CustomDocumentAdvancedSettings.styles';
import { CustomDocumentWizadFooter } from '../CustomDocumentWizadFooter/CustomDocumentWizadFooter';
import { CustomDocumentWizardStepTypes, CustomDocumentPageTypes, getNumberOfPages, TEXT_DETECTION_RELEASE } from '../../models/CustomDocument.model';
import { updateCustomDocumentModal, updateCustomDocumentWizardStep } from '../../state/customDocument.actions';
import { selectCustomDocumentModal } from '../../state/customDocument.selectors';

export function CustomDocumentAdvancedSettings({
  onDone,
}: {
  onDone: (customDocumentUpdate: Partial<CustomDocumentResponse>) => void;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const tags = useSelector(selectMerchantTags);
  const isAdvancedValidationAvailable: boolean = useMemo<boolean>(() => tags.includes(MerchantTags.CanUseCustomDocumentAdvancedValidation), [tags]);
  const customDocument = useSelector(selectCustomDocumentModal);
  const numberOfPages: CustomDocumentPageTypes = useMemo(() => getNumberOfPages(customDocument), [customDocument]);

  const checks = useMemo(() => {
    const inputValidationChecks: InputValidationCheck[] = customDocument?.inputValidationChecks || [];

    return inputValidationChecks.reduce((result, check: InputValidationCheck) => ({
      ...result,
      [check.id]: !check.isDisabled,
    }), {
      [InputValidationType.TextDetected]: false,
      [InputValidationType.BlurryTextDetected]: false,
    });
  }, [customDocument]);

  const handleisMakeRequiredStepUpdate = useCallback(() => {
    dispatch(updateCustomDocumentModal({ isSkippable: !customDocument.isSkippable }));
  }, [customDocument, dispatch]);

  const handleTextDetectionUpdate = useCallback(({ target: { checked } }) => {
    dispatch(updateCustomDocumentModal({
      inputValidationChecks: [
        {
          id: InputValidationType.TextDetected,
          isDisabled: !checked,
        },
        {
          id: InputValidationType.BlurryTextDetected,
          isDisabled: true,
        },
      ],
    }));
  }, [dispatch]);

  const handleBlurryTextDetectionUpdate = useCallback(({ target: { checked } }) => {
    const updatedInputValidationChecks = [...customDocument?.inputValidationChecks || []];
    dispatch(updateCustomDocumentModal({
      inputValidationChecks: updatedInputValidationChecks.map((check: InputValidationCheck) => {
        if (check.id !== InputValidationType.BlurryTextDetected) {
          return check;
        }

        return {
          ...check,
          isDisabled: !checked,
        };
      }),
    }));
  }, [customDocument, dispatch]);

  const handleDone = useCallback(() => onDone(customDocument), [onDone, customDocument]);

  const handleBack = useCallback(() => {
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.MediaUpload));
  }, [dispatch]);

  const handleOpenTemplateMatchingSettings = useCallback(() => {
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.TemplateMatchingSettings));
  }, [dispatch]);

  const handleOpenDocumentReadingSettings = useCallback(() => {
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.DocumentReadingSettings));
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={2} className={classes.container}>
        <Grid className={classes.leftGrid} item direction="column" justify="flex-start" xs={6}>
          <Box mb={2}>
            <Typography variant="h3">
              {intl.formatMessage({ id: 'CustomDocuments.settings.title' })}
            </Typography>
          </Box>
          <Box mb={2}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item xs={9}>
                <Typography variant="subtitle2">
                  {intl.formatMessage({ id: 'CustomDocuments.settings.makeRequiredStep' })}
                </Typography>
                <Typography variant="body1" className={classes.description}>
                  {intl.formatMessage({ id: 'CustomDocuments.settings.makeRequiredStep.subtitle' })}
                </Typography>
              </Grid>
              <Grid item>
                <Switch
                  color="primary"
                  checked={!customDocument?.isSkippable}
                  onChange={handleisMakeRequiredStepUpdate}
                />
              </Grid>
            </Grid>
          </Box>
          {TEXT_DETECTION_RELEASE && (numberOfPages !== CustomDocumentPageTypes.Many) && (
            <>
              <Box mb={2}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={9}>
                    <Typography variant="subtitle2">
                      {intl.formatMessage({ id: 'CustomDocuments.settings.textDetection' })}
                    </Typography>
                    <Typography variant="body1" className={classes.description}>
                      {intl.formatMessage({ id: 'CustomDocuments.settings.textDetection.subtitle' })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      className={classes.switcher}
                      color="primary"
                      checked={checks[InputValidationType.TextDetected]}
                      onChange={handleTextDetectionUpdate}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box mb={2} ml={2}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={9}>
                    <Typography variant="subtitle2">
                      {intl.formatMessage({ id: 'CustomDocuments.settings.blurryTextDetection' })}
                    </Typography>
                    <Typography variant="body1" className={classes.description}>
                      {intl.formatMessage({ id: 'CustomDocuments.settings.blurryTextDetection.subtitle' })}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      className={classes.switcher}
                      color="primary"
                      disabled={!checks[InputValidationType.TextDetected]}
                      checked={checks[InputValidationType.BlurryTextDetected]}
                      onChange={handleBlurryTextDetectionUpdate}
                    />
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Grid>

        <Grid container className={classes.borderedContent} item direction="column" xs={6}>
          <Typography variant="subtitle2" className={classes.secondCaption}>
            {intl.formatMessage({ id: 'CustomDocuments.settings.advancedValidations' })}
          </Typography>
          <div className={classes.descriptionHolder}>
            <Typography variant="body1" className={classes.description}>
              {intl.formatMessage({ id: 'CustomDocuments.settings.advancedValidations.subtitle.first' })}
            </Typography>
            {'\n'}
            {isAdvancedValidationAvailable ? (
              <Typography variant="body1" className={classes.description}>
                {intl.formatMessage({ id: 'CustomDocuments.settings.advancedValidations.subtitle.second' })}
              </Typography>
            ) : null}
          </div>
          {isAdvancedValidationAvailable ? (
            <div />
          ) : (
            <Button className={isAdvancedValidationAvailable ? classes.contactButtonHolder : classes.contactButtonHolderNoAdvancedValidation} disabled>
              <Typography variant="body1" color="primary">
                <BsChat className={classes.uploadIcon} />
                {intl.formatMessage({ id: 'CustomDocuments.settings.contactSales' })}
              </Typography>
            </Button>
          )}

          {isAdvancedValidationAvailable ? (
            <>
              <div className={classes.settingRowHolder}>
                <div className={classes.settingRow}>
                  <Typography variant="subtitle2" className={classes.secondCaption}>
                    {intl.formatMessage({ id: 'CustomDocuments.settings.templateMatching' })}
                  </Typography>
                  <Button className={classes.settingButton} onClick={handleOpenTemplateMatchingSettings}>
                    <FiSettings className={classes.settingsIcon} />
                    {intl.formatMessage({ id: 'CustomDocuments.settings.templateMatching.settings' })}
                  </Button>
                </div>
                {customDocument?.flow?.verificationPatterns?.[VerificationPatternTypes.TemplateMatching]?.templates && (
                  customDocument.flow.verificationPatterns[VerificationPatternTypes.TemplateMatching].templates.map((template: CustomDocumentTemplate) => (
                    <div className={classes.tag} key={template.caption}>
                      {template.caption}
                    </div>
                  ))
                )}
              </div>
              <div className={classes.settingRowHolder}>
                <div className={classes.settingRow}>
                  <Typography variant="subtitle2" className={classes.secondCaption}>
                    {intl.formatMessage({ id: 'CustomDocuments.settings.documentReading' })}
                  </Typography>
                  <Button className={classes.settingButton} onClick={handleOpenDocumentReadingSettings}>
                    <FiSettings className={classes.settingsIcon} />
                    {intl.formatMessage({ id: 'CustomDocuments.settings.documentReading.settings' })}
                  </Button>
                </div>
                {customDocument?.flow?.verificationPatterns?.[VerificationPatternTypes.DocumentReading]?.fields && (
                  customDocument.flow.verificationPatterns[VerificationPatternTypes.DocumentReading].fields.map((field: CustomDocumentReadingField) => (
                    <div className={classes.tag} key={field.id}>
                      {field.label}
                    </div>
                  ))
                )}
              </div>
            </>
          ) : null}
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
