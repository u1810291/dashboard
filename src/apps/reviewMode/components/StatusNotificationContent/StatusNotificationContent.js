import { Box, Grid, Link, Typography } from '@material-ui/core';
import { notification } from 'apps/ui';
import { CircularTimerWithLabel } from 'apps/ui/components/CircularTimerWithLabel/CircularTimerWithLabel';
import classnames from 'classnames';
import { QATags } from 'models/QA.model';
import { IdentityStatuses } from 'models/Status.model';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from './StatusNotificationContent.styles';

export function StatusNotificationContent({ status, onNext }) {
  const intl = useIntl();
  const classes = useStyles();
  const [isCanceled, setIsCanceled] = useState(false);

  const handleCancel = useCallback(() => {
    setIsCanceled(true);
    notification.dismiss();
  }, []);

  const handleNext = useCallback(() => {
    handleCancel();
    onNext(status);
  }, [handleCancel, onNext, status]);

  return (
    <Grid container alignItems="center" wrap="nowrap">
      <Box flexShrink={0}>
        <Typography>
          {`${intl.formatMessage({ id: 'ReviewMode.statusChangedNotification' })} `}
          <span className={classnames({
            [classes.rejected]: status === IdentityStatuses.rejected,
            [classes.verified]: status === IdentityStatuses.verified,
          })}
          >
            {intl.formatMessage({ id: `statuses.${status}` })}
          </span>
        </Typography>
      </Box>
      <Box mx={2}>
        <CircularTimerWithLabel onTimerEnd={handleNext} isCanceled={isCanceled} seconds={3} />
      </Box>
      <Link className={classes.link} onClick={handleCancel} data-qa={QATags.Review.Page.Buttons.Cancel}>
        {`${intl.formatMessage({ id: 'ReviewMode.statusChangedNotification.cancel' })}`}
      </Link>
      <Box ml={2} mr={-2} fontWeight="bold">
        <Link className={classes.link} onClick={handleNext} data-qa={QATags.Review.Page.Buttons.Next}>
          {`${intl.formatMessage({ id: 'ReviewMode.statusChangedNotification.next' })}`}
        </Link>
      </Box>
    </Grid>
  );
}
