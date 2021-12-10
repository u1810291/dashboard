import { notification } from 'apps/ui';
import { downloadBlob } from 'lib/file';
import { QATags } from 'models/QA.model';
import React, { useCallback, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { downloadCSV } from 'state/identities/identities.actions';
import { ButtonSide } from './DownloadCSV.styles';

export function DownloadCSV() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCSV = useCallback(async () => {
    if (!isDownloading) {
      setIsDownloading(true);
      const notificationId = notification.spinner(intl.formatMessage({ id: 'csv.loading' }));
      const response = await dispatch(downloadCSV()) as any;
      setIsDownloading(false);
      notification.dismiss(notificationId);
      if (!response) {
        return;
      }
      const blob = new Blob([response.data]);
      downloadBlob(blob, 'mati-verifications.zip');
    }
  }, [dispatch, intl, isDownloading]);

  return (
    <ButtonSide
      variant="contained"
      onClick={handleDownloadCSV}
      startIcon={<FiDownload />}
      disabled={isDownloading}
      data-qa={QATags.VerificationList.DownloadCsv}
    >
      {intl.formatMessage({ id: 'identities.download-all-csv' })}
    </ButtonSide>
  );
}
