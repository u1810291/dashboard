import React from 'react';
import { useIntl } from 'react-intl';
import { useStyles, ProxyChipElement } from './ProxyChip.styles';

export function ProxyChip({ proxy }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <ProxyChipElement
      label={proxy
        ? intl.formatMessage({ id: 'IpCheckStep.vpnDetected' })
        : intl.formatMessage({ id: 'IpCheckStep.noVpnDetected' })}
      className={proxy ? classes.proxy : classes.noProxy}
    />
  );
}
