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

  const handleSetActive = useCallback((id) => () => {
    setOpenedFlow((prevState) => (id === prevState ? null : id));
  }, []);

  const handleCheckIsActive = useCallback((id) => id && activeFlow === id, [activeFlow]);
  const handleCheckIsOpened = useCallback((id) => id && openedFlow === id, [openedFlow]);

  useEffect(() => {
    if (!verification) {
      setActiveFlow(null);
      return;
    }
    setActiveFlow(verification?.flow?._id);
    setOpenedFlow(verification?.flow?._id);
  }, [verification]);

  return (
    <Box>
      <Box color="common.black90" fontWeight="bold" mb={1}>
        {intl.formatMessage({ id: 'IdentityProfile.label.passedFlows' })}
      </Box>
      {flows.map(({ value: flow }) => (
        <PassedFlowSelect
          key={flow._id}
          isSelected={handleCheckIsActive(flow?._id)}
          isOpened={flow?.verifications && flow?.verifications.length > 1 && handleCheckIsOpened(flow?._id)}
          setIsSelected={handleSetActive(flow?._id)}
          verifications={flow?.verifications}
          flowName={flow?.name}
          platformType={ProductIntegrationTypes.Sdk}
          badgeStatusId={flow?.verifications[0]?.verificationStatusDetails?.value}
        />
      ))}
    </Box>
  );
}
