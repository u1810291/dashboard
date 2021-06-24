import { Box, Typography } from '@material-ui/core';
import { Card, CheckControlButton } from 'apps/ui';
import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectAvailableChecks } from 'state/merchant/merchant.selectors';
import { DOCS_BASE_URL } from 'models/Documentation.model';
import { DuplicateUserDetectionCheckControl } from '../components/DuplicateUserDetectionCheckControl/DuplicateUserDetectionCheckControl';
import { IpCheckControl } from '../components/IpCheckControl/IpCheckControl';
import { Nom151CheckControl } from '../components/nom151CheckControl/Nom151CheckControl';
import { PremiumAmlWatchlistsCheckControl } from '../components/PremiumAmlWatchlistsIntegratedCheckControl/PremiumAmlWatchlistsIntegratedCheckControl';
import { CheckTypes } from '../models/Checks.model';

export function AdditionalChecks() {
  const intl = useIntl();
  const checks = useSelector(selectAvailableChecks);

  const CheckComponentsMap = {
    [CheckTypes.IpCheck]: { component: IpCheckControl },
    [CheckTypes.Nom151Check]: { component: Nom151CheckControl },
    [CheckTypes.DuplicateUserDetection]: { component: DuplicateUserDetectionCheckControl },
    [CheckTypes.PremiumAmlWatchlistsCheck]: { component: PremiumAmlWatchlistsCheckControl, endControlBlock: true },
    [CheckTypes.EmailCheck]: {
      component: CheckControlButton,
      props: {
        link: `${DOCS_BASE_URL}#post-optional-email-validation`,
        buttonText: 'Product.checks.emailCheck.buttonText',
      },
    },
  };

  return (
    <Box p={2}>
      <Typography gutterBottom variant="h5">{intl.formatMessage({ id: 'Product.tab.checks' })}</Typography>
      <Box mb={2}>{intl.formatMessage({ id: 'Product.checks.annotation' })}</Box>
      {checks
        .map((check) => (
          <Card
            key={check.id}
            title={check.title}
            text={check.text}
            badgeText={check.badgeText}
            startIcon={check.startIcon}
            endControl={React.createElement(CheckComponentsMap[check.id].component, CheckComponentsMap[check.id].props)}
            endControlBlock={CheckComponentsMap[check.id].endControlBlock}
          />
        ))}
    </Box>
  );
}
