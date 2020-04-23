import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Box } from '@material-ui/core';
import { selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';

export function VerificationFlowName({ flowId }) {
  const intl = useIntl();
  const merchantFlowList = useSelector(selectMerchantFlowsModel);

  const findFlowName = (id) => (merchantFlowList.value || []).find((item) => item.id === id);

  if (!flowId) {
    return null;
  }

  return findFlowName(flowId)
    ? (
      <Box color="text.primary">
        {findFlowName(flowId).name}
      </Box>
    )
    : (
      <Box color="text.disabled">
        {intl.formatMessage({ id: 'statuses.deleted' })}
      </Box>
    );
}
