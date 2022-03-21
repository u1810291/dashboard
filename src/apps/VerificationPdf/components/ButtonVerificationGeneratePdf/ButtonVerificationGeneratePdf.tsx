import { useFormatMessage } from 'apps/intl';
import { ProductTypes } from 'models/Product.model';
import { IVerificationWorkflow } from 'models/Verification.model';
import { FiDownload, FiLoader } from 'react-icons/fi';
import { IdentityStatuses } from 'models/Status.model';
import { QATags } from 'models/QA.model';
import React, { useCallback } from 'react';
import { pdfDownloaded, setPDFGenerating } from 'state/identities/identities.actions';
import { downloadBlob } from 'lib/file';
import { useDispatch, useSelector } from 'react-redux';
import { selectIdentityIsPDFGenerating } from 'state/identities/identities.selectors';
import { ButtonHeaderMenu } from 'apps/ui';
import { selectMerchantLegalAddress, selectMerchantLegalName, selectMerchantLegalRegNumber } from 'state/merchant/merchant.selectors';

export function ButtonVerificationGeneratePdf({ verification, productList, className }: {
  verification: IVerificationWorkflow;
  productList: ProductTypes[];
  className: string;
}) {
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
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
    const { getVerificationPdfBlob } = await import('../VerificationPdf/VerificationPdf');
    const blob = await getVerificationPdfBlob(verification, productList, { legalName, legalAddress, legalRegNumber });
    downloadBlob(blob, `metamap-verification-${verification?.id}.pdf`);
    handlePDFGenerating(false);
    dispatch(pdfDownloaded(verification?.identityId, verification?.id));
  }, [isPDFGenerating, handlePDFGenerating, verification, productList, legalName, legalAddress, legalRegNumber, dispatch]);

  return (
    <ButtonHeaderMenu
      variant="contained"
      onClick={handlePDFDownload}
      className={className}
      startIcon={isPDFGenerating ? <FiLoader /> : <FiDownload />}
      disabled={verification?.verificationStatus === IdentityStatuses.running}
      data-qa={QATags.Verification.Buttons.DownloadPdf}
    >
      {formatMessage('verificationModal.downloadPDF')}
    </ButtonHeaderMenu>
  );
}
