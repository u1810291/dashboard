import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { Items, Text } from 'components';
import { notification } from 'components/notification';
import { putMerchants, uploadMerchantMedia } from 'state/merchant';
import { compressImage } from 'lib/compressImage.js';

import CSS from './Logo.module.scss';

export default function Logo() {
  const { token } = useSelector(s => s.auth);
  const { logoUrl } = useSelector(s => s.merchant);
  const [shouldLogoUpdate, setShouldLogoUpdate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldLogoUpdate) {
      dispatch(
        putMerchants(token, { logoUrl }),
      );

      setShouldLogoUpdate(false);
    }
  }, [shouldLogoUpdate, logoUrl, token, dispatch]);

  const onDropAccepted = useCallback(async files => {
    try {
      const file = files[0];
      const form = new FormData();
      const compressedFile = await compressImage(file);
      form.append('media', compressedFile);

      await dispatch(
        uploadMerchantMedia(token, form),
      );

      setShouldLogoUpdate(true);
    } catch (error) {
      notification.error(
        <>
          <FormattedMessage id="flow.logoStep.button.error" />
        </>,
      );
    }
  }, [token, dispatch]);

  const onDropRejected = useCallback(() => {
    notification.error(
      <>
        <FormattedMessage id="flow.logoStep.button.error" />
      </>,
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxSize: 100 * 1024,
    multiple: false,
    accept: 'image/*',
  });

  return (
    <fieldset className="mgi-fieldset">
      <Text size={3} weight={4}>
        <FormattedMessage id="flow.logoStep.title" />
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
                  [CSS.hasntLogo]: !logoUrl,
                },
              )
            }
          >
            <input {...getInputProps()} />
            <Text size={2.5}>
              {logoUrl ?
                <img src={logoUrl} alt="logo-preview" className={CSS.logoPreview} /> :
                <FormattedMessage id="flow.documentTypeStep.button.title" />}
            </Text>
          </div>
        </div>
      </Items>
    </fieldset>
  );
}
