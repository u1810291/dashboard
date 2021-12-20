import { Radio, RadioGroup, FormControlLabel, FormControl, Grid, Typography, Button, Box } from '@material-ui/core';
import { notification } from 'apps/ui';
import compressImage from 'lib/compressImage';
import { isNil } from 'lib/isNil';
import { CustomDocumentTemplate } from 'models/CustomDocument.model';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import { BsUpload } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { TextFieldInput, useStyles } from './CustomDocumentTemplateMatchingTemplate.styles';
import { CustomDocumentWizadFooter } from '../CustomDocumentWizadFooter/CustomDocumentWizadFooter';
import { MIN_MEDIA_WIDTH, MIN_MEDIA_HEIGHT, CustomDocumentWizardStepTypes, CustomDocumentTemplateTypes } from '../../models/CustomDocument.model';
import { editCustomDocumentTemplateMatchingTemplate, updateCustomDocumentTemplateMatchingTemplateSettings, customDocumentUpdateTemplateMedia, updateCustomDocumentWizardStep } from '../../state/customDocument.actions';
import { selectCustomDocumentTemplateMatchingTemplateSettings, selectCustomDocumentTemplateMatchingEditedTemplate } from '../../state/customDocument.selectors';

export function CustomDocumentTemplateMatchingTemplate() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const template: CustomDocumentTemplate = useSelector(selectCustomDocumentTemplateMatchingTemplateSettings);
  const edited: number | null = useSelector(selectCustomDocumentTemplateMatchingEditedTemplate);
  const isValid: boolean = useMemo(() => !isNil(template?.image) && !isNil(template?.caption), [template]);

  const handleUpdateCaption = useCallback(({ target: { value } }) => {
    dispatch(updateCustomDocumentTemplateMatchingTemplateSettings({ caption: value || null }));
  }, [dispatch]);

  const handleUpdateisAcceptable = useCallback(({ target: { value } }) => {
    dispatch(updateCustomDocumentTemplateMatchingTemplateSettings({ isAcceptable: value === CustomDocumentTemplateTypes.Acceptable }));
  }, [dispatch]);

  const handleDeleteImage = useCallback(() => {
    dispatch(updateCustomDocumentTemplateMatchingTemplateSettings({ image: null }));
  }, [dispatch]);

  const handleBack = useCallback(() => {
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.TemplateMatchingSettings));
  }, [dispatch]);

  const handleDone = useCallback(() => {
    dispatch(editCustomDocumentTemplateMatchingTemplate(edited, template));
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.TemplateMatchingSettings));
  }, [template, edited, dispatch]);

  const showError = useCallback(() => {
    notification.error(intl.formatMessage({ id: 'CustomDocuments.settings.uploadResolutionError' }));
  }, [intl]);

  const onDropAccepted = useCallback(async (files) => {
    try {
      const firstFile = files[0];
      const image = new Image();
      const form = new FormData();
      image.addEventListener('load', async () => {
        if (image.width >= MIN_MEDIA_WIDTH && image.height >= MIN_MEDIA_HEIGHT) {
          const compressedFile = await compressImage(firstFile, {
            maxSideSize: MIN_MEDIA_WIDTH,
            type: firstFile.type === 'image/png' ? firstFile.type : 'image/jpeg',
          });
          form.append('media', compressedFile);
          dispatch(customDocumentUpdateTemplateMedia(form));
        } else {
          showError();
        }
      });
      image.src = URL.createObjectURL(firstFile);
    } catch (error) {
      notification.error(intl.formatMessage({ id: 'CustomDocuments.settings.uploadFileError' }));
    }
  }, [dispatch, showError, intl]);

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    multiple: false,
    accept: 'image/*',
  });

  return (
    <>
      <Typography variant="h3" className={classes.title}>
        {intl.formatMessage({ id: 'CustomDocuments.settings.addTemplate' })}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className={classes.uploadBlock}>
            {template?.image ? (
              <img src={template.image?.publicUrl} alt="document-example-preview" className={classes.logoPreview} />
            ) : (
              <Box>
                <div className={classes.dropzoneHolder} {...getRootProps()}>
                  <input type="file" className={classes.fileInput} {...getInputProps()} />
                  <Typography variant="body1" color="primary">
                    <BsUpload className={classes.uploadIcon} />
                    {intl.formatMessage({ id: 'CustomDocuments.settings.documentSamplePhoto.uploadTitle' })}
                  </Typography>
                </div>
              </Box>
            )}
          </div>
          <div className={classes.pageButtonsHolder}>
            {template?.image && (
              <Button size="small" className={classes.pageButton} onClick={handleDeleteImage}>
                <FiTrash2 className={classes.deleteButton} />
              </Button>
            )}
          </div>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h5">
            {intl.formatMessage({
              id: 'CustomDocuments.settings.sampleCaption',
            })}
          </Typography>
          <TextFieldInput
            value={template?.caption || ''}
            className={classes.input}
            onChange={handleUpdateCaption}
          />

          <FormControl
            className={classes.radioForm}
            component="fieldset"
          >
            <RadioGroup
              value={template.isAcceptable ? CustomDocumentTemplateTypes.Acceptable : CustomDocumentTemplateTypes.Fake}
              onChange={handleUpdateisAcceptable}
            >
              <FormControlLabel
                value={CustomDocumentTemplateTypes.Acceptable}
                control={<Radio />}
                label={intl.formatMessage({ id: 'CustomDocuments.settings.acceptableDocument' })}
              />
              <FormControlLabel
                value={CustomDocumentTemplateTypes.Fake}
                control={<Radio />}
                label={intl.formatMessage({ id: 'CustomDocuments.settings.fakeDocument' })}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

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
