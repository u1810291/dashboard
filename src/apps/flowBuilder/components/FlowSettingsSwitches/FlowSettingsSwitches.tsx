import React from 'react';
import { Box, Switch } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { ExtendedDescription } from 'apps/ui/components/ExtendedDescription/ExtendedDescription';

export function FlowSettingsSwitches() {
  const intl = useIntl();

  return (
    <Box>
      <Box mb={4}>
        <ExtendedDescription
          title={intl.formatMessage({ id: 'FlowBuilder.settings.title.gdpr' })}
          text={intl.formatMessage({ id: 'Product.configuration.gdpr.subtitle' })}
          postfix={<Switch color="primary" />}
        />
      </Box>
      <Box>
        <ExtendedDescription
          title={intl.formatMessage({ id: 'FlowBuilder.settings.title.timestamp' })}
          text={intl.formatMessage({ id: 'FlowBuilder.settings.description.timestamp' })}
          postfix={<Switch color="primary" />}
        />
      </Box>
    </Box>
  );
}
