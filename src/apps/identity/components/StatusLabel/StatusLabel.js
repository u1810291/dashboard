import { Box } from '@material-ui/core';
import { getIdentityStatusLabel, getStatusById, IdentityStatuses } from 'models/Status.model';
import React from 'react';
import { useIntl } from 'react-intl';

export function StatusLabel({ status }) {
  const intl = useIntl();
  const data = getStatusById(status) || {};

  return (
    <Box component="span" color={data.color || 'common.gray68'} className={data.style}>
      {intl.formatMessage({ id: getIdentityStatusLabel(data.id || IdentityStatuses.unknown) })}
    </Box>
  );
}
