import { FiCode } from 'react-icons/fi';
import { QATags } from 'models/QA.model';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useOverlay } from 'apps/overlay';
import { ButtonHeaderMenu } from 'apps/ui';
import { VerificationWebhookModal } from 'apps/identity/components/VerificationWebhookModal/VerificationWebhookModal';

export interface VerificationDataButtonProps {
  verification: any,
  className?: string,
}

export function VerificationDataButton({ verification, className }: VerificationDataButtonProps) {
  const intl = useIntl();
  const [createOverlay, closeOverlay] = useOverlay();

  const openWebhookModal = useCallback(() => {
    createOverlay(<VerificationWebhookModal webhook={verification} onClose={closeOverlay} />);
  }, [verification, createOverlay, closeOverlay]);

  return (
    <ButtonHeaderMenu
      variant="contained"
      className={className}
      onClick={openWebhookModal}
      startIcon={<FiCode />}
      data-qa={QATags.Verification.Buttons.Data}
    >
      {intl.formatMessage({ id: 'verificationModal.webhookData' })}
    </ButtonHeaderMenu>
  );
}
