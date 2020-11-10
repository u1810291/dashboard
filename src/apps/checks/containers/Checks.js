import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Box, Typography } from '@material-ui/core';
import { selectAvailableChecks } from 'state/merchant/merchant.selectors';
import { CheckTypes, DOCS_BASE_URL } from '../models/Checks.model';
import { Card } from '../components/Card/Card';
import { IpCheckControl } from '../components/IpCheckControl/IpCheckControl';
import { DuplicateUserDetectionCheckControl } from '../components/DuplicateUserDetectionCheckControl/DuplicateUserDetectionCheckControl';
import { CheckControlButton } from '../components/CheckControlButton/CheckControlButton';

export function AdditionalChecks() {
  const intl = useIntl();
  const checks = useSelector(selectAvailableChecks);

  const CheckComponentsMap = {
    [CheckTypes.IpCheck]: { component: IpCheckControl },
    [CheckTypes.DuplicateUserDetection]: { component: DuplicateUserDetectionCheckControl },
    [CheckTypes.EmailCheck]: {
      component: CheckControlButton,
      props: {
        link: `${DOCS_BASE_URL}#post-optional-email-validation`,
        buttonText: 'Product.checks.emailCheck.buttonText',
      },
    },
    [CheckTypes.ComplyAdvantage]: {
      component: CheckControlButton,
      props: {
        link: `${DOCS_BASE_URL}#post-optional-comply-advantage-validation`,
        buttonText: 'Product.checks.complyAdvantage.buttonText',
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
          />
        ))}
    </Box>
  );
}
