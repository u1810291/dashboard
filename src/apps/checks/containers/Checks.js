import React from 'react';
import { useIntl } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import { ChecksModel } from '../models/Checks.model';
import { Card } from '../components/Card/Card';

export function AdditionalChecks() {
  const intl = useIntl();

  return (
    <Box m={2}>
      <Typography gutterBottom variant="h5">{intl.formatMessage({ id: 'Product.tab.checks' })}</Typography>
      <Box mb={2}>{intl.formatMessage({ id: 'Product.checks.annotation' })}</Box>
      {ChecksModel
        .map((check) => (
          <Card
            key={check.id}
            title={check.title}
            text={check.text}
            badgeText={check.badgeText}
            startIcon={check.startIcon}
            endControl={React.createElement(check.endControlComponent, check.endControlProps)}
          />
        ))}
    </Box>
  );
}
