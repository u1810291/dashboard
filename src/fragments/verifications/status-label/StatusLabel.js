import { Box } from '@material-ui/core';
import { DEFAULT_STATUS_COLOR, getIdentityStatusLabel, getStatusById, IdentityStatuses } from 'models/Identity.model';
import React from 'react';
import { useIntl } from 'react-intl';

export function StatusLabel({ status }) {
  const intl = useIntl();
  const data = getStatusById(status) || {};

  return (
    <Box component="span" color={data.color || DEFAULT_STATUS_COLOR} className={data.style}>
      {intl.formatMessage({ id: getIdentityStatusLabel(data.id || IdentityStatuses.unknown) })}
    </Box>
  );
}
