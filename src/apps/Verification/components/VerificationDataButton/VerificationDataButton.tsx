import { VerificationWebhookModal } from 'apps/identity/components/VerificationWebhookModal/VerificationWebhookModal';
import { useOverlay } from 'apps/overlay';
import { ButtonHeaderMenu } from 'apps/ui';
import { QATags } from 'models/QA.model';
import React, { useCallback } from 'react';
import { FiCode } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectVerification } from '../../state/Verification.selectors';

export function VerificationDataButton({ className }: {
  className: string,
}) {
  const intl = useIntl();
  const [createOverlay, closeOverlay] = useOverlay();
  const verification = useSelector(selectVerification);

  const handleClick = useCallback(() => {
    createOverlay(<VerificationWebhookModal webhook={verification} onClose={closeOverlay} />);
  }, [verification, createOverlay, closeOverlay]);

  return (
    <ButtonHeaderMenu
      variant="contained"
      className={className}
      onClick={handleClick}
      startIcon={<FiCode />}
      data-qa={QATags.Verification.Buttons.Data}
    >
      {intl.formatMessage({ id: 'verificationModal.webhookData' })}
    </ButtonHeaderMenu>
  );
}
