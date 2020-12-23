import { Box, Grid, Typography } from '@material-ui/core';
import { VerificationCheckCard } from 'apps/identity/components/VerificationCheckCard/VerificationCheckCard';
import { VerificationSummaryTitle } from 'apps/identity/components/VerificationSummaryTitle/VerificationSummaryTitle';
import { BrowserIcons, DeviceIcons, getDeviceBrowserLabel, getDeviceBrowserType, getDeviceModel, getDeviceOSLabel, getDeviceOSType, getDevicePlatformType, getDeviceType, OSIcons, PlatformTypes } from 'models/DeviceCheck.model';
import { StepStatus } from 'models/Step.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as ModelIcon } from '../../../identity/icons/model-icon.svg';
import { useStyles } from './VerificationDeviceCheck.styles';
import { VerificationSummaryTitleTypes } from '../../../../models/Identity.model';

export function VerificationDeviceCheck({ identity }) {
  const classes = useStyles();
  const intl = useIntl();
  const platform = getDevicePlatformType(identity);

  const model = getDeviceModel(identity);
  const deviceType = getDeviceType(identity);
  const osLabel = getDeviceOSLabel(identity);
  const browserLabel = getDeviceBrowserLabel(identity);

  const DeviceIcon = DeviceIcons[deviceType];
  const OSIcon = OSIcons[getDeviceOSType(identity)];
  const BrowserIcon = BrowserIcons[getDeviceBrowserType(identity)];

  return (
    <VerificationCheckCard
      titleComponent={(
        <VerificationSummaryTitle status={StepStatus.Success} type={VerificationSummaryTitleTypes.device}>
          {intl.formatMessage({ id: 'identity.summary.title.device' })}
        </VerificationSummaryTitle>
      )}
    >
      <Box className={classes.wrapper}>
        {/* model */}
        {platform === PlatformTypes.WebMobile && model && (
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Box className={classes.labelWrap}>
                <ModelIcon className={classes.titleIcon} />
                <Typography className={classes.label} variant="body1">{intl.formatMessage({ id: 'DeviceCheck.model' })}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.value} variant="subtitle2">{model}</Typography>
            </Grid>
          </Grid>
        )}
        {/* device type */}
        {deviceType && (
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Box className={classes.labelWrap}>
                <DeviceIcon className={classes.titleIcon} />
                <Typography className={classes.label} variant="body1">
                  {intl.formatMessage({ id: 'DeviceCheck.deviceType.title' })}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.value} variant="subtitle2">
                {intl.formatMessage({ id: `DeviceCheck.deviceType.${deviceType}` })}
              </Typography>
            </Grid>
          </Grid>
        )}
        {/* os */}
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Box className={classes.labelWrap}>
              <OSIcon className={classes.titleIcon} />
              <Typography
                className={classes.label}
                variant="body1"
              >
                {intl.formatMessage({ id: 'DeviceCheck.os' })}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.value} variant="subtitle2">{osLabel}</Typography>
          </Grid>
        </Grid>
        {/* browser */}
        {(platform === PlatformTypes.WebMobile || platform === PlatformTypes.WebDesktop) && (
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Box className={classes.labelWrap}>
                <BrowserIcon className={classes.titleIcon} />
                <Typography className={classes.label} variant="body1">
                  {intl.formatMessage({ id: 'DeviceCheck.browser' })}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.value} variant="subtitle2">{browserLabel}</Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </VerificationCheckCard>
  );
}
