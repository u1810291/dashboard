import { Box } from '@material-ui/core';
import { ProductIntegrationTypes } from 'models/Product.model';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectVerification, selectVerificationsGroupedByFlow } from 'apps/Verification';
import { PassedFlowSelect } from '../PassedFlowSelect/PassedFlowSelect';

export function PassedFlows() {
  const intl = useIntl();
  const flows = useSelector(selectVerificationsGroupedByFlow);
  const verification = useSelector(selectVerification);
  const [activeFlow, setActiveFlow] = useState(null);
  const [openedFlow, setOpenedFlow] = useState(null);

  const handleSetOpened = useCallback((id: string) => () => {
    setOpenedFlow((prevState) => (id === prevState ? null : id));
  }, []);

  const handleSetActive = useCallback((id: string) => () => setActiveFlow(id), []);

  useEffect(() => {
    if (!verification) {
      setActiveFlow(null);
      return;
    }

    if (verification?.flow?._id) {
      setActiveFlow(verification?.flow?._id);
      setOpenedFlow(verification?.flow?._id);
    }
  }, [verification]);

  return (
    <Box>
      <Box color="common.black90" fontWeight="bold" mb={1.4}>
        {intl.formatMessage({ id: 'IdentityProfile.label.passedFlows' })}
      </Box>
      {flows.map(({ verifications, flowId, flowName }) => flowId && (
        <PassedFlowSelect
          key={flowId}
          isSelected={activeFlow === flowId}
          isOpened={openedFlow === flowId}
          setIsSelected={handleSetOpened(flowId)}
          verifications={verifications}
          flowName={flowName}
          platformType={ProductIntegrationTypes.Sdk}
          badgeStatusId={verifications[0]?.verificationStatus}
          onSetActive={handleSetActive(flowId)}
        />
      ))}
    </Box>
  );
}
