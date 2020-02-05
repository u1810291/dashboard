import { Button } from '@material-ui/core';
import { downloadBlob } from 'lib/file';
import React, { useCallback, useState } from 'react';
import { FiDownload, FiLoader } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { downloadCSV } from 'state/identities/identities.actions';

export function DownloadCSV() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadCSV = useCallback(async () => {
    setIsLoading(true);
    const response = await dispatch(downloadCSV());
    setIsLoading(false);
    if (!response) {
      return;
    }
    const blob = new Blob([response.data]);
    downloadBlob(blob, 'mati-verifications.zip');
  }, [dispatch]);

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleDownloadCSV}
      startIcon={isLoading ? <FiLoader /> : <FiDownload />}
      disabled={isLoading}
    >
      {intl.formatMessage({ id: 'identities.download-all-csv' })}
    </Button>
  );
}
