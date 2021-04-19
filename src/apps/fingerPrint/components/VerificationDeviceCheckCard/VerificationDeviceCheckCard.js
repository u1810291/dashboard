import { VerificationCheckCard } from 'apps/identity/components/VerificationCheckCard/VerificationCheckCard';
import { VerificationSummaryTitle } from 'apps/identity/components/VerificationSummaryTitle/VerificationSummaryTitle';
import { VerificationSummaryTitleTypes } from 'models/Identity.model';
import { StepStatus } from 'models/Step.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { VerificationDeviceCheck } from '../VerificationDeviceCheck/VerificationDeviceCheck';

export function VerificationDeviceCheckCard({ deviceFingerprint }) {
  const intl = useIntl();

  return (
    <VerificationCheckCard
      title={(
        <VerificationSummaryTitle status={StepStatus.Success} type={VerificationSummaryTitleTypes.device}>
          {intl.formatMessage({ id: 'identity.summary.title.device' })}
        </VerificationSummaryTitle>
      )}
    >
      <VerificationDeviceCheck deviceFingerprint={deviceFingerprint} />
    </VerificationCheckCard>
  );
}
