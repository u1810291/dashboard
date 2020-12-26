import { Box, IconButton, Typography } from '@material-ui/core';
import { notification } from 'apps/ui';
import compressImage from 'lib/compressImage';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { configurationFlowUpdate, merchantUpdateMedia } from 'state/merchant/merchant.actions';
import { selectLogoModel, selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { useStyles } from './Logo.styles';

export function Logo() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const logoModel = useSelector(selectLogoModel);
  const merchantFlowModel = useSelector(selectMerchantFlowsModel);

  const showError = useCallback(() => {
    notification.error(intl.formatMessage({ id: 'flow.logoStep.button.error' }));
  }, [intl]);

  const onDropAccepted = useCallback(async (files) => {
    try {
      const file = files[0];
      const form = new FormData();
      const compressedFile = await compressImage(file, {
        maxSideSize: 159,
        type: file.type === 'image/png' ? file.type : 'image/jpeg',
      });
      form.append('media', compressedFile);
      dispatch(merchantUpdateMedia(form));
    } catch (error) {
      showError();
    }
  }, [dispatch, showError]);

  const onDropRejected = useCallback(() => {
    showError();
  }, [showError]);

  const handleRemove = useCallback(() => {
    dispatch(configurationFlowUpdate({ logoUrl: null }));
  }, [dispatch]);

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    onDropRejected,
    multiple: false,
    accept: 'image/*',
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {intl.formatMessage({ id: 'flow.logoStep.title' })}
      </Typography>

      <Box display="flex" alignItems="center" mt={2}>
        {/* logo */}
        <Box flexGrow={1}>
          <div
            {...getRootProps()}
            className={classes.addLogo}
          >
            <input {...getInputProps()} />
            {merchantFlowModel.isLoading && !logoModel
              ? <FiLoader size={20} color="gray" />
              : logoModel
                ? <img src={logoModel} alt="logo-preview" className={classes.logoPreview} />
                : (
                  <Typography variant="h6" color="primary">
                    {intl.formatMessage({ id: 'flow.logoStep.button.title' })}
                  </Typography>
                )}
          </div>
        </Box>

        {/* actions */}
        {logoModel && (
          <Box flexGrow={0} ml={1}>
            <IconButton
              size="small"
              onClick={handleRemove}
              disabled={merchantFlowModel.isLoading || merchantFlowModel.isFailed}
            >
              {!merchantFlowModel.isLoading
                ? <FiTrash2 className="color-red" />
                : <FiLoader />}
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}
