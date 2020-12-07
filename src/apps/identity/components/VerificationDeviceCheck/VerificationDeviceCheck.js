import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { FiSmartphone, FiTablet } from 'react-icons/fi';
import { VerificationCheckCard } from '../VerificationCheckCard/VerificationCheckCard';
import { VerificationSummaryTitle } from '../VerificationSummaryTitle/VerificationSummaryTitle';
import { useStyles } from './VerificationDeviceCheck.styles';
import { StepStatus } from '../../../../models/Step.model';
import {
  getDeviceBrowserLabel,
  getDeviceModel,
  getDeviceOSLabel,
  getDevicePlatformType,
  getDeviceType,
  PlatformTypes,
  BrowserTypes,
  getDeviceBrowserType,
  OSTypes,
  getDeviceOSType,
  DeviceTypes,
} from '../../../../models/DeviceCheck.model';
import { ReactComponent as ChromeIcon } from '../../icons/chome.svg';
import { ReactComponent as SafariIcon } from '../../icons/safari.svg';
import { ReactComponent as OperaIcon } from '../../icons/opera.svg';
import { ReactComponent as FirefoxIcon } from '../../icons/firefox.svg';
import { ReactComponent as SamsungIcon } from '../../icons/samsung.svg';
import { ReactComponent as BlueBoxIcon } from '../../icons/blue-box.svg';
import { ReactComponent as GreenBoxIcon } from '../../icons/green-box.svg';
import { ReactComponent as AndroidIcon } from '../../icons/android.svg';
import { ReactComponent as WindowsIcon } from '../../icons/windows.svg';
import { ReactComponent as AppleIcon } from '../../icons/apple.svg';
import { ReactComponent as LinuxIcon } from '../../icons/linux.svg';
import { ReactComponent as UbuntuIcon } from '../../icons/ubuntu.svg';
import { ReactComponent as FreeBSDIcon } from '../../icons/freeBSD.svg';
import { ReactComponent as ModelIcon } from '../../icons/model-icon.svg';
import { ReactComponent as DesktopIcon } from '../../icons/desktop.svg';
import { VerificationSummaryTitleTypes } from '../../../../models/Identity.model';

const DeviceIcons = {
  [DeviceTypes.Mobile]: FiSmartphone,
  [DeviceTypes.Tablet]: FiTablet,
  [DeviceTypes.Desktop]: DesktopIcon,
};

const OSIcons = {
  [OSTypes.Android]: AndroidIcon,
  [OSTypes.Windows]: WindowsIcon,
  [OSTypes.Unknown]: BlueBoxIcon,
  [OSTypes.MacOS]: AppleIcon,
  [OSTypes.IOS]: AppleIcon,
  [OSTypes.Linux]: LinuxIcon,
  [OSTypes.Ubuntu]: UbuntuIcon,
  [OSTypes.IPadOs]: AppleIcon,
  [OSTypes.FreeBSD]: FreeBSDIcon,
};

const BrowserIcons = {
  [BrowserTypes.Chrome]: ChromeIcon,
  [BrowserTypes.Unknown]: BlueBoxIcon,
  [BrowserTypes.Safari]: SafariIcon,
  [BrowserTypes.Opera]: OperaIcon,
  [BrowserTypes.Firefox]: FirefoxIcon,
  [BrowserTypes.Pylib]: GreenBoxIcon,
  [BrowserTypes.ThirdApp]: GreenBoxIcon,
  [BrowserTypes.Samsung]: SamsungIcon,
  [BrowserTypes.OKhttp]: GreenBoxIcon,
  [BrowserTypes.Java]: GreenBoxIcon,
  [BrowserTypes.Other]: BlueBoxIcon,
};

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
