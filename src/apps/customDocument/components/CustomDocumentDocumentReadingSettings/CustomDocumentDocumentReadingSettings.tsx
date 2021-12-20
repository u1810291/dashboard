import { Grid, Typography, Box, Button, TextareaAutosize } from '@material-ui/core';
import { notification } from 'apps/ui';
import { CustomDocumentResponse, CustomDocumentDocumentReading, CustomDocumentReadingField } from 'models/CustomDocument.model';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import { isNil } from 'lib/isNil';
import compact from 'lodash/compact';
import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import { BsUpload } from 'react-icons/bs';
import compressImage from 'lib/compressImage';
import { useStyles } from './CustomDocumentDocumentReadingSettings.styles';
import { CustomDocumentWizadFooter } from '../CustomDocumentWizadFooter/CustomDocumentWizadFooter';
import { MIN_MEDIA_WIDTH, MIN_MEDIA_HEIGHT, CustomDocumentPageTypes, CustomDocumentWizardStepTypes, getNumberOfPages } from '../../models/CustomDocument.model';
import { updateCustomDocumentModal, customDocumentUpdateReadingMedia, resetCustomDocumentDocumentReadingField, updateCustomDocumentDocumentReadingField, updateCustomDocumentDocumentEditedReadingField, updateCustomDocumentWizardStep } from '../../state/customDocument.actions';
import { selectCustomDocumentModal } from '../../state/customDocument.selectors';

export function CustomDocumentDocumentReadingSettings() {
  const intl = useIntl();
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const dispatch = useDispatch();
  const customDocument: Partial<CustomDocumentResponse> = useSelector(selectCustomDocumentModal);
  const verificationPatterns = useMemo(() => customDocument?.flow?.verificationPatterns || {}, [customDocument]);
  const documentReading: Partial<CustomDocumentDocumentReading> = useMemo(() => verificationPatterns?.[VerificationPatternTypes.DocumentReading] || {}, [verificationPatterns]);
  const numberOfPages: CustomDocumentPageTypes = useMemo(() => getNumberOfPages(customDocument), [customDocument]);

  const showError = useCallback(() => {
    notification.error(intl.formatMessage({ id: 'CustomDocuments.settings.uploadResolutionError' }));
  }, [intl]);

  const handleInstructionsChange = useCallback(({ target: { value } }) => {
    dispatch(updateCustomDocumentModal({
      flow: {
        verificationPatterns: {
          ...verificationPatterns,
          [VerificationPatternTypes.DocumentReading]: {
            ...documentReading,
            instructions: value || null,
          },
        },
      },
    }));
  }, [verificationPatterns, documentReading, dispatch]);

  const handleEditField = useCallback((index: number | null, field: CustomDocumentReadingField | null) => () => {
    dispatch(updateCustomDocumentDocumentEditedReadingField(index));
    if (isNil(index)) {
      dispatch(resetCustomDocumentDocumentReadingField());
    } else {
      dispatch(updateCustomDocumentDocumentReadingField(field));
    }
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.DocumentReadingFieldSettings));
  }, [dispatch]);

  const handleDeleteField = useCallback((index: number) => () => {
    const updatedFields = [...documentReading?.fields || []];
    updatedFields.splice(index, 1);
    dispatch(updateCustomDocumentModal({
      flow: {
        verificationPatterns: {
          ...verificationPatterns,
          [VerificationPatternTypes.DocumentReading]: {
            ...documentReading,
            fields: updatedFields,
          },
        },
      },
    }));
  }, [verificationPatterns, documentReading, dispatch]);

  const handleRemoveImage = useCallback((pageNumber: number) => () => {
    const updatedImages = [...documentReading?.images || []];
    updatedImages[pageNumber] = null;
    dispatch(updateCustomDocumentModal({
      flow: {
        verificationPatterns: {
          ...verificationPatterns,
          [VerificationPatternTypes.DocumentReading]: {
            ...documentReading,
            images: compact(updatedImages),
          },
        },
      },
    }));
  }, [verificationPatterns, documentReading, dispatch]);

  const onDropAccepted = useCallback(
    async (files) => {
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
            dispatch(customDocumentUpdateReadingMedia(form, page));
          } else {
            showError();
          }
        });
        image.src = URL.createObjectURL(firstFile);
      } catch (error) {
        notification.error(intl.formatMessage({ id: 'CustomDocuments.settings.uploadFileError' }));
      }
    },
    [showError, intl, page, dispatch],
  );

  const handleDone = useCallback(() => {
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.AdvancedSettings));
  }, [dispatch]);

  const handleBack = useCallback(() => {
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.AdvancedSettings));
  }, [dispatch]);

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    multiple: false,
    accept: 'image/*',
  });

  return (
    <>
      <Typography variant="h3" className={classes.title}>
        {intl.formatMessage({ id: 'CustomDocuments.settings.documentReadingSettings' })}
      </Typography>

      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle2">{intl.formatMessage({ id: 'CustomDocuments.settings.instructions' })}</Typography>
          <Typography variant="body1" className={classes.helpText}>
            {intl.formatMessage({ id: 'CustomDocuments.settings.instructions.subtitle' })}
          </Typography>

          <TextareaAutosize
            rowsMax={3}
            value={documentReading?.instructions || ''}
            rowsMin={3}
            onChange={handleInstructionsChange}
            className={classes.textarea}
            placeholder={intl.formatMessage({
              id: 'CustomDocuments.settings.instructionsOptional.placeholder',
            })}
          />
          <div className={classes.uploadBlock}>
            {page === 0 ? (
              documentReading?.images?.[0] ? (
                <img src={documentReading.images[0]?.publicUrl} alt="document-example-preview" className={classes.logoPreview} />
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
              )
            ) : documentReading?.images?.[1] ? (
              <img src={documentReading.images[1].publicUrl} alt="document-example-preview" className={classes.logoPreview} />
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
            {numberOfPages === CustomDocumentPageTypes.Two && (
              <>
                <Button className={`${classes.pageButton} ${page === 0 && classes.activePageButton}`} onClick={() => setPage(0)}>
                  1
                </Button>
                <Button className={`${classes.pageButton} ${page === 1 && classes.activePageButton}`} onClick={() => setPage(1)}>
                  2
                </Button>
              </>
            )}
            {documentReading?.images?.[page] && (
              <Button size="small" className={classes.pageButton} onClick={handleRemoveImage(page)}>
                <FiTrash2 className={classes.pageDeleteButton} />
              </Button>
            )}
          </div>
        </Grid>

        <Grid item xs={6}>
          <Grid container item xs={12}>
            <div className={classes.settingRow}>
              <Typography variant="subtitle2" className={classes.secondCaption}>
                {intl.formatMessage({
                  id: 'CustomDocuments.settings.fields',
                })}
              </Typography>
              <Button className={classes.addButton} onClick={handleEditField(null, null)}>
                <FiPlus className={classes.addIcon} />
                {intl.formatMessage({
                  id: 'CustomDocuments.settings.add',
                })}
              </Button>
            </div>

            {documentReading?.fields && documentReading?.fields.map((field, index) => (
              <div className={classes.tag} key={field.id}>
                {field.label}
                <div className={classes.buttonsHolder}>
                  <Button className={classes.editButton} onClick={handleEditField(index, field)}>
                    <FiEdit2 />
                  </Button>
                  <Button className={classes.deleteButton} onClick={handleDeleteField(index)}>
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
