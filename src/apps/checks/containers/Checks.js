import React from 'react';
import { useIntl } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import { Card } from '../components/Card/Card';
import { IpCheckControl } from '../components/IpCheckControl/IpCheckControl';
import { EmailCheckControl } from '../components/EmailCheckControl/EmailCheckControl';
import { ChecksModel } from '../models/Checks.model';

export function AdditionalChecks() {
  const intl = useIntl();
  const controls = {
    ipCheck: <IpCheckControl />,
    emailCheck: <EmailCheckControl />,
  };

  return (
    <Box m={2}>
      <Typography gutterBottom variant="h5">{intl.formatMessage({ id: 'Product.tab.checks' })}</Typography>
      <Box mb={2}>{intl.formatMessage({ id: 'Product.checks.annotation' })}</Box>
      {ChecksModel
        .map((entry) => ({ ...entry, endControl: controls[entry.id] }))
        .map((check) => (
          <Card
            title={intl.formatMessage({ id: check.title })}
            body={intl.formatMessage({ id: check.text })}
            badgeText={intl.formatMessage({ id: check.badgeText })}
            startIcon={check.startIcon}
            endControl={check.endControl}
            key={check.id}
          />
        )) }
    </Box>
  );
}
