import { useFormatMessage } from 'apps/intl';
import { useOverlay } from 'apps/overlay';
import { ButtonHeaderMenu, VerificationWebhookModal } from 'apps/ui';
import { useQuery } from 'lib/url';
import { ApiResponse } from 'models/Client.model';
import { QATags } from 'models/QA.model';
import React, { useCallback, useState } from 'react';
import { FiCode, FiLoader } from 'react-icons/fi';

export function VerificationDataButton({ className, verificationId, onGetWebhook }: {
  className?: string;
  verificationId: string;
  onGetWebhook: (id: string, params: any) => Promise<ApiResponse<any>>;
}) {
  const formatMessage = useFormatMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [createOverlay, closeOverlay] = useOverlay();
  const { asMerchantId } = useQuery();

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await onGetWebhook(verificationId, { ...(asMerchantId && { asMerchantId }) });
      createOverlay(<VerificationWebhookModal webhook={data} onClose={closeOverlay} />);
    } catch (e) {
      // eslint-disable-next-line
      console.error('error', (e as any).message)
    }
    setIsLoading(false);
  }, [verificationId, createOverlay, closeOverlay, asMerchantId, onGetWebhook]);

  return (
    <ButtonHeaderMenu
      variant="contained"
      className={className}
      onClick={handleClick}
      startIcon={isLoading ? <FiLoader /> : <FiCode />}
      disabled={isLoading}
      data-qa={QATags.Verification.Buttons.Data}
    >
      {formatMessage('verificationModal.webhookData')}
    </ButtonHeaderMenu>
  );
}
