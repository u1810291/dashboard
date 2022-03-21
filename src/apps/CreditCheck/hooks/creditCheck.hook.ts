import { useSelector } from 'react-redux';
import { selectDataForCreditCheck } from 'apps/Verification';
import { IdentityStatuses, VerificationStatusChangeReason } from 'models/Status.model';
import { useMemo } from 'react';
import { IStep, StepCodeStatus } from 'models/Step.model';
import { CreditCheckStep } from 'models/CreditCheck.model';

export function useCreditCheck(): {
  creditDocumentStep: IStep<CreditCheckStep>;
  id: string;
  isShowManualCreditCheckButton: boolean;
  isCheckInProgress: boolean;
  isPostResultPhase: boolean;
  } {
  const { verification, creditDocumentStep, id } = useSelector(selectDataForCreditCheck);

  const { value: verificationStatus, reasonCode } = verification?.verificationStatusDetails;
  const isPostResultPhase = [IdentityStatuses.reviewNeeded, IdentityStatuses.rejected, IdentityStatuses.verified].includes(verificationStatus);
  const isVerifiedBySystem = verificationStatus === IdentityStatuses.verified && reasonCode !== VerificationStatusChangeReason.ManualChange;

  const isShowManualCreditCheckButton = useMemo(() => isPostResultPhase && !isVerifiedBySystem && !creditDocumentStep?.startedManuallyAt,
    [isPostResultPhase, isVerifiedBySystem, creditDocumentStep?.startedManuallyAt]);
  const isCheckInProgress = [StepCodeStatus.Pending, StepCodeStatus.Running].includes(creditDocumentStep?.status) && !isShowManualCreditCheckButton;

  return { creditDocumentStep, id, isShowManualCreditCheckButton, isCheckInProgress, isPostResultPhase };
}
