import { VerificationWebhookModal } from 'apps/ui/components/VerificationWebhookModal/VerificationWebhookModal';
import { useOverlay } from 'apps/overlay';
import { ButtonHeaderMenu } from 'apps/ui';
import { useQuery } from 'lib/url';
import { QATags } from 'models/QA.model';
import React, { useCallback, useState } from 'react';
import { FiCode, FiLoader } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { getVerificationWebhook } from '../../client/Verification.client';

export function VerificationDataButton({ className, verificationId }: {
  className: string;
  verificationId: string;
}) {
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(false);
  const [createOverlay, closeOverlay] = useOverlay();
  const { asMerchantId } = useQuery();

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getVerificationWebhook(verificationId, { ...(asMerchantId && { asMerchantId }) });
      createOverlay(<VerificationWebhookModal webhook={data} onClose={closeOverlay} />);
    } catch (e) {
      // eslint-disable-next-line
      console.error('error', e.message)
    }
    setIsLoading(false);
  }, [verificationId, createOverlay, closeOverlay, asMerchantId]);

  return (
    <ButtonHeaderMenu
      variant="contained"
      className={className}
      onClick={handleClick}
      startIcon={isLoading ? <FiLoader /> : <FiCode />}
      disabled={isLoading}
      data-qa={QATags.Verification.Buttons.Data}
    >
      {intl.formatMessage({ id: 'verificationModal.webhookData' })}
    </ButtonHeaderMenu>
  );
}
