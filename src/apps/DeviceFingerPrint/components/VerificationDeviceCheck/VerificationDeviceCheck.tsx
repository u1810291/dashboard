import { Box, Grid, Typography } from '@material-ui/core';
import { BrowserIcons, DeviceIcons, getDeviceBrowserLabel, getDeviceBrowserType, getDeviceModel, getDeviceOSLabel, getDeviceOSType, getDevicePlatformType, getDeviceType, OSIcons, PlatformTypes, DeviceTypes, OSTypes } from 'models/DeviceCheck.model';
import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { ReactComponent as ModelIcon } from '../../../identity/icons/model-icon.svg';
import { DeviceFingerPrintInputData } from '../../models/DeviceFingerPrint.model';
import { useStyles } from './VerificationDeviceCheck.styles';

export function VerificationDeviceCheck({ input }: {
  input: DeviceFingerPrintInputData;
}) {
  const classes: any = useStyles();
  const intl = useIntl();
  const platform = getDevicePlatformType(input);

  const model = getDeviceModel(input);
  const deviceType = getDeviceType(input);
  const osType = getDeviceOSType(input);
  const osLabel = getDeviceOSLabel(input);
  const browserLabel = getDeviceBrowserLabel(input);

  const DeviceIcon = DeviceIcons[deviceType];
  const OSIcon = OSIcons[osType];
  const BrowserIcon = BrowserIcons[getDeviceBrowserType(input)];

  return (
    <Box className={classes.wrapper}>
      {/* model */}
      {platform === PlatformTypes.WebMobile && model && (
      <Grid container alignItems="center" className={classes.check}>
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
      <Grid container alignItems="center" className={classes.check}>
        <Grid item xs={6}>
          <Box className={classes.labelWrap}>
            <DeviceIcon className={classNames(classes.titleIcon, {
              [classes.whitePhoneIcon]: deviceType === DeviceTypes.Mobile,
              [classes.whiteIcon]: deviceType !== DeviceTypes.Mobile,
            })}
            />
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
      <Grid container alignItems="center" className={classes.check}>
        <Grid item xs={6}>
          <Box className={classes.labelWrap}>
            <OSIcon className={classNames(classes.titleIcon, { [classes.whiteIcon]: [OSTypes.Linux, OSTypes.MacOS, OSTypes.IOS].includes(osType) })} />
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
      <Grid container alignItems="center" className={classes.check}>
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
  );
}
