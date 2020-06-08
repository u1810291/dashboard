import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { ProxyChipElement } from '../ProxyChip/ProxyChip.styles';
import { useStyles } from './SanctionChip.styles';

export function SanctionChip() {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <ProxyChipElement
      variant="outlined"
      icon={<FiAlertCircle />}
      label={intl.formatMessage({ id: 'SanctionCheck.title' })}
      className={classes.warn}
    />
  );
}
