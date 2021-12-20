import { Grid, Typography, Button, Box } from '@material-ui/core';
import { notification } from 'apps/ui';
import { isNil } from 'lib/isNil';
import compressImage from 'lib/compressImage';
import { CustomDocumentResponse } from 'models/CustomDocument.model';
import { DocumentSides } from 'models/Document.model';
import React, { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import { BsUpload } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { useStyles } from './CustomDocumentMedia.styles';
import { CustomDocumentWizadFooter } from '../CustomDocumentWizadFooter/CustomDocumentWizadFooter';
import { MIN_MEDIA_WIDTH, MIN_MEDIA_HEIGHT, CustomDocumentPageTypes, CustomDocumentWizardStepTypes, getNumberOfPages } from '../../models/CustomDocument.model';
import { updateCustomDocumentWizardStep, customDocumentRemoveMedia, customDocumentUpdateMedia } from '../../state/customDocument.actions';
import { selectCustomDocumentModal } from '../../state/customDocument.selectors';

export function CustomDocumentMedia() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const customDocument: Partial<CustomDocumentResponse> = useSelector(selectCustomDocumentModal);
  const [pageNumber, setPageNumber] = useState(1);
  const numberOfPages: CustomDocumentPageTypes = useMemo(() => getNumberOfPages(customDocument), [customDocument]);
  const isMediaPresent: boolean = (customDocument?.example?.front?.publicUrl && pageNumber === 1) || (customDocument?.example?.back?.publicUrl && pageNumber === 2);

  const isFilesRequired = useMemo<boolean>(() => {
    if (numberOfPages === CustomDocumentPageTypes.Two) {
      return isNil(customDocument?.example?.front) || isNil(customDocument?.example?.back);
    }

    return isNil(customDocument?.example?.front);
  }, [customDocument, numberOfPages]);

  const handleBack = useCallback(() => {
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.BasicInfo));
  }, [dispatch]);

  const handleDone = useCallback(() => {
    dispatch(updateCustomDocumentWizardStep(CustomDocumentWizardStepTypes.AdvancedSettings));
  }, [dispatch]);

  const showError = useCallback(() => {
    notification.error(intl.formatMessage({ id: 'CustomDocuments.settings.uploadResolutionError' }));
  }, [intl]);

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
            dispatch(customDocumentUpdateMedia(form, pageNumber === 1 ? DocumentSides.Front : DocumentSides.Back));
          } else {
            showError();
          }
        });
        image.src = URL.createObjectURL(firstFile);
      } catch (error) {
        notification.error(intl.formatMessage({ id: 'CustomDocuments.settings.uploadFileError' }));
      }
    },
    [showError, intl, pageNumber, dispatch],
  );

  const handleRemove = useCallback(() => dispatch(customDocumentRemoveMedia(pageNumber === 1 ? DocumentSides.Front : DocumentSides.Back)), [dispatch, pageNumber]);

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDropAccepted,
    multiple: false,
    accept: 'image/jpeg, image/jpg, image/png',
  });

  return (
    <>
      <Typography variant="h3" className={classes.title}>
        {intl.formatMessage({ id: 'CustomDocuments.settings.title' })}
      </Typography>

      <Grid container alignItems="center" spacing={2} className={classes.contentHolder}>
        <Grid item xs={6}>
          <Typography variant="h5" className={classes.innerTitle}>
            {intl.formatMessage({ id: 'CustomDocuments.settings.documentSamplePhoto' })}
          </Typography>
          <Typography variant="body1" className={classes.subtitle}>
            {intl.formatMessage({ id: 'CustomDocuments.settings.documentSamplePhoto.subtitle' })}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          {numberOfPages === CustomDocumentPageTypes.Two && (
            <div className={classes.pageButtonsHolder}>
              <Button
                className={`${classes.pageButton} ${pageNumber === 1 && classes.activePageButton}`}
                onClick={() => setPageNumber(1)}
              >
                1
              </Button>
              <Button
                className={`${classes.pageButton} ${pageNumber === 2 && classes.activePageButton}`}
                onClick={() => setPageNumber(2)}
              >
                2
              </Button>
            </div>
          )}
          <div className={isMediaPresent ? classes.mediaBlock : classes.uploadBlock}>
            {isMediaPresent ? (
              <>
                <img
                  src={(pageNumber === 1) ? customDocument.example.front.publicUrl : customDocument.example.back.publicUrl}
                  alt="document-example-preview"
                  className={classes.logoPreview}
                />
                <Button size="small" className={classes.deleteButton} onClick={handleRemove}>
                  <FiTrash2 />
                </Button>
              </>
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
        </Grid>
      </Grid>

      <CustomDocumentWizadFooter
        onBack={handleBack}
        onForward={handleDone}
        canMoveForward={!isFilesRequired}
        backTitle={intl.formatMessage({ id: 'CustomDocuments.settings.back' })}
        forwardTitle={intl.formatMessage({ id: 'CustomDocuments.settings.continue' })}
      />
    </>
  );
}
