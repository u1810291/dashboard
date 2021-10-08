import { Box } from '@material-ui/core';
import { selectFlowBuilderChangeableFlow } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { VerificationPatternTypes } from 'models/VerificationPatterns.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

export function BiometricVerificationRemovingAlert(): any {
  const intl = useIntl();
  const flow = useSelector(selectFlowBuilderChangeableFlow);
  const settings: string[] = [];

  settings.push(intl.formatMessage({ id: 'BiometricVerification.removingAlert.facematchCheck' }));
  if (flow?.verificationPatterns?.[VerificationPatternTypes.ProofOfOwnership]) {
    settings.push(intl.formatMessage({ id: 'BiometricVerification.removingAlert.proofOfOwnership' }));
  }

  return (
    <Box component="span">
      {intl.formatMessage(
        { id: 'BiometricVerification.removingAlert.text' },
        {
          settings: (
            <Box component="span" color="common.green">
              {settings.join(` ${intl.formatMessage({ id: 'And' })} `)}
            </Box>
          ),
        },
      )}
    </Box>
  );
}
