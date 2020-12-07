import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { FiCheckCircle } from 'react-icons/fi';
import { Marker, StaticGoogleMap } from 'react-static-google-map';
import { ReactComponent as IconError } from '../../../../assets/icon-identity-error.svg';
import { ReactComponent as IconLoad } from '../../../../assets/icon-load.svg';
import { SkeletonLoader } from '../../../ui/components/SkeletonLoader/SkeletonLoader';
import { VerificationCheckCard } from '../VerificationCheckCard/VerificationCheckCard';
import { VerificationSummaryTitle } from '../VerificationSummaryTitle/VerificationSummaryTitle';
import { useStyles } from './VerificationIpCheck.styles';
import { StepStatus } from '../../../../models/Step.model';
import { getIpCheckStatus } from '../../../../models/IpCheck.model';
import { VerificationSummaryTitleTypes } from '../../../../models/Identity.model';

function Icon({ status }) {
  const classes = useStyles();

  const Icons = {
    [StepStatus.Failure]: <IconError className={classes.titleIcon} />,
    [StepStatus.Success]: <FiCheckCircle className={classes.titleIcon} />,
    [StepStatus.Checking]: <IconLoad width={17} className={classes.titleIcon} />,
  };

  return Icons[status];
}

export function VerificationIpCheck({ ipCheck }) {
  const status = getIpCheckStatus(ipCheck);
  const classes = useStyles();
  const intl = useIntl();

  return (
    <VerificationCheckCard
      titleComponent={(
        <VerificationSummaryTitle status={status} type={VerificationSummaryTitleTypes.additional}>
          {intl.formatMessage({ id: 'identity.summary.title.additional' })}
        </VerificationSummaryTitle>
      )}
      bottomComponent={(
        <Box py={0.6} px={1} className={status === StepStatus.Failure ? classes.error : ''}>
          <Grid container alignItems="center" wrap="nowrap">
            <Icon status={status} />
            <Typography className={status === StepStatus.Failure ? classes.titleError : classes.title} variant="subtitle2">
              {status === StepStatus.Checking ? (
                <SkeletonLoader animation="wave" variant="text" width={130} />
              ) : (
                <>{intl.formatMessage({ id: 'identity.summary.ipcheck' })}</>
              )}
            </Typography>
          </Grid>
        </Box>
      )}
    >
      <Grid container justify="center" alignItems="center" item xs={12} className={classes.map}>
        {status === StepStatus.Checking ? (
          <SkeletonLoader animation="wave" variant="rect" height={160} />
        ) : (
          <StaticGoogleMap size="600x200" scale={2} zoom={10} apiKey={process.env.REACT_APP_STATIC_GOOGLE_MAP_API_KEY}>
            <Marker location={{ lat: ipCheck.data?.latitude, lng: ipCheck.data?.longitude }} />
          </StaticGoogleMap>
        )}
      </Grid>
    </VerificationCheckCard>
  );
}
