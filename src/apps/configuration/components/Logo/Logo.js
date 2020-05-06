import { IconButton, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { Items, Text } from 'components';
import { notification } from 'components/notification';
import compressImage from 'lib/compressImage';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { configurationFlowUpdate, merchantUpdateMedia } from 'state/merchant/merchant.actions';
import { selectLogoModel, selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import CSS from './Logo.module.scss';

export function Logo() {
  const intl = useIntl();
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
    <fieldset className="mgi-fieldset">
      <Text size={3} weight={4}>
        {intl.formatMessage({ id: 'flow.logoStep.title' })}
      </Text>
      <Items
        gap={1}
        flow="column"
        align="center"
        className={CSS.logoTitle}
      >
        <div className={CSS.logoWrapper}>
          <div
            {...getRootProps()}
            className={
              classNames(
                [CSS.addLogo],
                {
                  [CSS.hasntLogo]: !logoModel,
                },
              )
            }
          >
            <input {...getInputProps()} />
            {merchantFlowModel.isLoading && !logoModel
              ? <FiLoader size={20} color="gray" />
              : logoModel
                ? <img src={logoModel} alt="logo-preview" className={CSS.logoPreview} />
                : (
                  <Typography variant="h6" color="primary">
                    {intl.formatMessage({ id: 'flow.logoStep.button.title' })}
                  </Typography>
                )}
          </div>
        </div>
        {logoModel && (
          <IconButton
            size="small"
            onClick={handleRemove}
            disabled={merchantFlowModel.isLoading || merchantFlowModel.isFailed}
          >
            {!merchantFlowModel.isLoading
              ? <FiTrash2 className="color-red" />
              : <FiLoader />}
          </IconButton>
        )}
      </Items>
    </fieldset>
  );
}
