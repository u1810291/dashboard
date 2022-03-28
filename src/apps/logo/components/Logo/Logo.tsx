import { Grid, Box, IconButton } from '@material-ui/core';
import { notification } from 'apps/ui';
import compressImage from 'lib/compressImage';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiLoader, FiTrash2, FiUpload } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { flowBuilderChangeableFlowUpdate } from 'apps/flowBuilder/store/FlowBuilder.action';
import { selectFlowBuilderChangeableFlowModel, selectFlowBuilderChangeableLogoUrl } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { ReactComponent as MatiLogo } from 'assets/metamap-logo.svg';
import { useStyles } from './Logo.styles';
import { flowBuilderSDKMediaUpdate } from '../../state/Logo.actions';

export function Logo() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const logoModel = useSelector(selectFlowBuilderChangeableLogoUrl);
  const flowModel = useSelector(selectFlowBuilderChangeableFlowModel);

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
      dispatch(flowBuilderSDKMediaUpdate(form));
    } catch (error) {
      showError();
    }
  }, [dispatch, showError]);

  const onDropRejected = useCallback(() => {
    showError();
  }, [showError]);

  const handleRemove = useCallback(() => {
    dispatch(flowBuilderChangeableFlowUpdate({ logo: { url: null, publicUrl: null } }));
  }, [dispatch]);

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    onDropRejected,
    multiple: false,
    accept: 'image/*',
  });

  return (
    <Grid className={classes.root} container alignItems="center">
      {/* logo */}
      <div {...getRootProps()} className={classes.addLogo}>
        <input {...getInputProps()} />
        {flowModel.isLoading && !logoModel
          ? <FiLoader size={20} color="gray" />
          : logoModel?.publicUrl
            ? <img src={logoModel?.publicUrl} alt="logo-preview" className={classes.logoPreview} />
            : (
              <MatiLogo width={120} />
            )}
      </div>

      {/* actions */}
      <Grid container direction="column" justify="space-between" className={classes.actions}>
        <div {...getRootProps()}>
          <IconButton
            size="small"
            disabled={flowModel.isLoading || flowModel.isFailed}
          >
            <FiUpload size={17} className="color-blue" />
          </IconButton>
        </div>
        {logoModel?.publicUrl && (
          <Box>
            <IconButton
              size="small"
              onClick={handleRemove}
              disabled={flowModel.isLoading || flowModel.isFailed}
            >
              {!flowModel.isLoading
                ? <FiTrash2 className="color-red" size={17} />
                : <FiLoader />}
            </IconButton>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
