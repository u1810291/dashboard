import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { Items, Text } from 'components';
import Icons from 'components/icons';
import Button from 'components/button';
import { notification } from 'components/notification';
import { putMerchants, uploadMerchantMedia } from 'state/merchant/merchant.actions';
import compressImage from 'lib/compressImage';

import CSS from './Logo.module.scss';

export default function Logo() {
  const { logoUrl } = useSelector(({ merchant }) => merchant);
  const [shouldLogoUpdate, setShouldLogoUpdate] = useState(false);
  const [innerLogoUrl, setInnerLogoUrl] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldLogoUpdate) {
      dispatch(
        putMerchants({ logoUrl: innerLogoUrl }),
      );
      setShouldLogoUpdate(false);
    }
  }, [shouldLogoUpdate, innerLogoUrl, dispatch]);

  const showError = () => {
    notification.error(
      <FormattedMessage id="flow.logoStep.button.error" />,
    );
  };

  const onDropAccepted = useCallback(async (files) => {
    try {
      const file = files[0];
      const compressionOptions = {
        maxSideSize: 159,
        type: file.type === 'image/png' ? file.type : 'image/jpeg',
      };
      const form = new FormData();
      const compressedFile = await compressImage(file, compressionOptions);
      form.append('media', compressedFile);

      const mediaPayload = await dispatch(uploadMerchantMedia(form));
      setInnerLogoUrl(mediaPayload.data.url);

      setShouldLogoUpdate(true);
    } catch (error) {
      showError();
    }
  }, [dispatch]);

  const onDropRejected = useCallback(() => {
    showError();
  }, []);

  const clearLogo = () => dispatch(putMerchants({ logoUrl: null }));

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
    onDropRejected,
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
              {logoUrl
                ? <img src={logoUrl} alt="logo-preview" className={CSS.logoPreview} />
                : <FormattedMessage id="flow.logoStep.button.title" />}
            </Text>
          </div>
        </div>
        {logoUrl && (
          <Button
            buttonStyle="invisible"
            data-role="deleteVerificationStep"
            onClick={clearLogo}
          >
            <Icons.TrashBin
              className="svg-error"
            />
          </Button>
        )}
      </Items>
    </fieldset>
  );
}
