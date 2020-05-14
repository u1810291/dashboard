import React from 'react';
import { useIntl } from 'react-intl';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { useStyles, ProxyChipElement } from './ProxyChip.styles';

export function ProxyChip({ proxy }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <ProxyChipElement
      variant="outlined"
      icon={proxy ? <FiAlertCircle /> : <FiCheckCircle />}
      label={proxy
        ? intl.formatMessage({ id: 'IpCheckStep.vpnDetected' })
        : intl.formatMessage({ id: 'IpCheckStep.noVpnDetected' })}
      className={proxy ? classes.proxy : classes.noProxy}
    />
  );
}
