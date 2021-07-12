import { Loader } from 'apps/ui';
import { downloadBlob } from 'lib/file';
import { QATags } from 'models/QA.model';
import React, { useCallback, useState } from 'react';
import { FiDownload, FiLoader } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { downloadVerificationCSV } from 'state/identities/identities.actions';
import { selectFilteredCountModel } from 'state/identities/identities.selectors';
import { SideButton } from './DownloadCSV.styles';

export function DownloadCSV() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(false);
  const filteredCountModel = useSelector(selectFilteredCountModel);

  const handleDownloadCSV = useCallback(async () => {
    setIsLoading(true);
    const response = await dispatch(downloadVerificationCSV()) as any;
    setIsLoading(false);
    if (!response) {
      return;
    }
    const blob = new Blob([response.data]);
    downloadBlob(blob, 'mati-verifications.zip');
  }, [dispatch]);

  return (
    <>
      <SideButton
        variant="contained"
        onClick={handleDownloadCSV}
        startIcon={isLoading ? <FiLoader /> : <FiDownload />}
        disabled={isLoading || filteredCountModel.value === 0}
        data-qa={QATags.VerificationList.DownloadCsv}
      >
        {intl.formatMessage({ id: 'identities.download-all-csv' })}
      </SideButton>
      {isLoading && <Loader />}
    </>
  );
}
