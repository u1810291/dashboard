import { Box } from '@material-ui/core';
import React, { useCallback } from 'react';
import { FiActivity } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useStyles } from './PremiumAmlWatchlistsMonitoringNotification.styles';

export interface PremiumAmlWatchlistsMonitoringNotificationProps {
  isSwitchedToVerified: boolean,
  closeToast?: () => void,
  onEnableFallback: () => void
}

export function PremiumAmlWatchlistsMonitoringNotification({ isSwitchedToVerified, closeToast, onEnableFallback } : PremiumAmlWatchlistsMonitoringNotificationProps) {
  const intl = useIntl();
  const classes = useStyles();
  const handleClick = useCallback(() => {
    onEnableFallback();
    if (closeToast) {
      closeToast();
    }
  }, [closeToast, onEnableFallback]);

  return (
    <Box>
      <Box mb={1} className={classes.notificationText}>
        <Box className={classes.notificationIcon}>
          <FiActivity className={isSwitchedToVerified ? classes.greenText : classes.redText} />
        </Box>
        <Box>
          {intl.formatMessage({ id: 'statusSelect.monitoring.text' }, {
            action: (
              <Box component="span" fontWeight={600}>
                {intl.formatMessage({ id: `statusSelect.monitoring.action.${isSwitchedToVerified ? 'off' : 'on'}` })}
              </Box>
            ),
          })}
        </Box>
      </Box>
      <Box
        className={classes.notificationButton}
        onClick={handleClick}
      >
        {intl.formatMessage({ id: 'statusSelect.monitoring.button' }, {
          state: (
            <Box component="span" fontWeight={600}>
              {intl.formatMessage({ id: `statusSelect.monitoring.state.${isSwitchedToVerified ? 'off' : 'on'}` })}
            </Box>
          ),
        })}
      </Box>
    </Box>
  );
}
