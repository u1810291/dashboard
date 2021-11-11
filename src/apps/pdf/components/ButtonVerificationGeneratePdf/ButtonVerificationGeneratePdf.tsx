import { FiDownload, FiLoader } from 'react-icons/fi';
import { IdentityStatuses } from 'models/Status.model';
import { QATags } from 'models/QA.model';
import React, { useCallback } from 'react';
import { pdfDownloaded, setPDFGenerating } from 'state/identities/identities.actions';
import { downloadBlob } from 'lib/file';
import { useDispatch, useSelector } from 'react-redux';
import { selectIdentityIsPDFGenerating } from 'state/identities/identities.selectors';
import { useIntl } from 'react-intl';
import { ButtonHeaderMenu } from 'apps/ui';
import { selectMerchantLegalAddress, selectMerchantLegalName, selectMerchantLegalRegNumber } from 'state/merchant/merchant.selectors';
import { VerificationResponse } from 'models/Verification.model';

export interface ButtonVerificationGeneratePdfProps {
  verification: VerificationResponse;
  className: string;
}

export function ButtonVerificationGeneratePdf({ verification, className }: ButtonVerificationGeneratePdfProps) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const isPDFGenerating = useSelector(selectIdentityIsPDFGenerating);
  const legalName = useSelector(selectMerchantLegalName);
  const legalAddress = useSelector(selectMerchantLegalAddress);
  const legalRegNumber = useSelector(selectMerchantLegalRegNumber);

  const handlePDFGenerating = useCallback((flag) => {
    dispatch(setPDFGenerating(flag));
  }, [dispatch]);

  const handlePDFDownload = useCallback(async () => {
    if (isPDFGenerating) {
      return;
    }
    handlePDFGenerating(true);
    const { getIdentityDocumentBlob } = await import('../../IdentityDocument.pdf');
    const blob = await getIdentityDocumentBlob(verification, { legalName, legalAddress, legalRegNumber });
    downloadBlob(blob, `mati-identity-${verification?._id}.pdf`);
    handlePDFGenerating(false);
    dispatch(pdfDownloaded(verification?.identity, verification?._id));
  }, [isPDFGenerating, handlePDFGenerating, verification, legalName, legalAddress, legalRegNumber, dispatch]);

  return (
    <ButtonHeaderMenu
      variant="contained"
      onClick={handlePDFDownload}
      className={className}
      startIcon={isPDFGenerating ? <FiLoader /> : <FiDownload />}
      disabled={verification?.verificationStatus === IdentityStatuses.running}
      data-qa={QATags.Verification.Buttons.DownloadPdf}
    >
      {intl.formatMessage({ id: 'verificationModal.downloadPDF' })}
    </ButtonHeaderMenu>
  );
}
