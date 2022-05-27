import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import compressImage from 'lib/compressImage';
import { useFormatMessage } from 'apps/intl';
import { PageLoader } from 'apps/layout';
import { ICustomField } from 'models/CustomField.model';
import { AddCircledIcon, useStyles } from './CustomFieldUploadButton.style';
import { updateCustomFieldEditedFieldThumbnail, uploadCustomFieldGroupThumbnail } from '../../state/CustomField.actions';
import { selectCustomFieldEditedCustomField, selectCustomFieldModalType, selectCustomFieldUploadingThumbnail } from '../../state/CustomField.selectors';
import { CustomFieldModalTypes, MAX_THUMBNAIL_SIZE } from '../../models/CustomField.model';

export function CustomFieldUploadButton() {
  const formatMessage = useFormatMessage();
  const classes = useStyles();
  const dispatch = useDispatch();

  const customFieldModalType = useSelector<any, CustomFieldModalTypes>(selectCustomFieldModalType);
  const isUploadingThumbnail = useSelector<any, boolean>(selectCustomFieldUploadingThumbnail);
  const selectedCustomField = useSelector<any, ICustomField>(selectCustomFieldEditedCustomField);

  const onDropAccepted = useCallback(async (files) => {
    const file = files[0];
    const form = new FormData();
    const compressedFile = await compressImage(file, {
      maxSideSize: MAX_THUMBNAIL_SIZE,
      type: file.type === 'image/png' ? file.type : 'image/jpeg',
    });
    form.append('media', compressedFile);
    dispatch(uploadCustomFieldGroupThumbnail(form));
  }, [dispatch]);

  const handleRemove = () => {
    dispatch(updateCustomFieldEditedFieldThumbnail(null));
  };

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDropAccepted,
    multiple: false,
    accept: 'image/*',
  });

  return (
    <Grid item container spacing={1} direction="column">
      <Grid item>
        <Typography variant="subtitle2">
          {formatMessage(`CustomField.settings.${customFieldModalType.toLowerCase()}Thumbnail`)}
        </Typography>
      </Grid>
      <Grid item container spacing={1} alignItems="center">
        <Grid item>
          <Box
            {...getRootProps()}
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.uploadDiv}
          >
            <input {...getInputProps()} />
            {selectedCustomField?.thumbnail?.publicUrl && (<img src={selectedCustomField.thumbnail.publicUrl} className={classes.thumbnail} alt="thumbnail" />)}
            {!isUploadingThumbnail && !selectedCustomField?.thumbnail?.publicUrl && (<AddCircledIcon />)}
            {isUploadingThumbnail && (<PageLoader />)}
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" color="primary">
            {formatMessage('CustomField.settings.thumbnail.title')}
            {!!selectedCustomField?.thumbnail?.publicUrl && (
              <FiTrash2 onClick={handleRemove} className={classes.remove} />)}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {formatMessage('CustomField.settings.thumbnail.description')}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
