import { downloadBlob } from 'lib/file';
import React, { useCallback, useState } from 'react';
import { FiDownload, FiLoader } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { downloadCSV } from 'state/identities/identities.actions';
import { selectFilteredCountModel, selectIdentityCountModel } from '../../../../state/identities/identities.selectors';
import { SideButton } from './DownloadCSV.styles';

export function DownloadCSV() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(false);
  const countModel = useSelector(selectIdentityCountModel);
  const filteredCountModel = useSelector(selectFilteredCountModel);

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
    <SideButton
      variant="contained"
      onClick={handleDownloadCSV}
      startIcon={isLoading ? <FiLoader /> : <FiDownload />}
      disabled={isLoading || countModel.value === 0 || filteredCountModel.value === 0}
    >
      {intl.formatMessage({ id: 'identities.download-all-csv' })}
    </SideButton>
  );
}
