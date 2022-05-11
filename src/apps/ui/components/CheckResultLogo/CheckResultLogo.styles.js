import { makeStyles } from '@material-ui/core';
import DocumentError from 'assets/icon-document-error.svg';
import DocumentSuccess from 'assets/icon-document-success.svg';
import DocumentWarning from 'assets/icon-document-warning.svg';
import DocumentSkipped from 'assets/icon-document-skipped.svg';
import LoadIcon from 'assets/icon-load.svg';
import OtherChecksDisabled from 'assets/icon-other-checks-disabled.svg';
import OtherChecksSuccess from 'assets/icon-other-checks-success.svg';
import OtherChecksWarning from 'assets/icon-other-checks-warning.svg';
import OtherChecksError from 'assets/icon-other-checks-error.svg';
import ipCheckGeoSuccess from 'assets/icon-geo-checks-success.svg';
import ipCheckGeoFailure from 'assets/icon-geo-checks-failure.svg';
import ipCheckDesktop from 'apps/LocationIntelligence/assets/icon-desktop.svg';
import ipCheckGeoposition from 'apps/LocationIntelligence/assets/icon-geoposition.svg';
import ipCheckGeorestriction from 'apps/LocationIntelligence/assets/icon-georestriction.svg';
import ipCheckHighAccuracy from 'apps/LocationIntelligence/assets/icon-highaccuracy.svg';
import ipCheckMobile from 'apps/LocationIntelligence/assets/icon-mobile.svg';
import ipCheckVpn from 'apps/LocationIntelligence/assets/icon-vpn.svg';
import { LivenessStepStatus } from 'models/Biometric.model';
import { StepStatus } from 'models/Step.model';
import { LocationIntelligenceIconTypes } from '../../../LocationIntelligence';

export const useStyles = makeStyles((theme) => {
  const commonStyle = {
    color: theme.palette.common.black75,
    background: theme.palette.common.green,
    backgroundSize: '80%',
    borderRadius: '50%',
    size: 32,
    top: 5,
    padding: '0 0 0 44px',
    margin: '0 auto',
    textAlign: 'left',
    left: '0',
    transform: 'none',
  };
  const iconStyle = {
    [LocationIntelligenceIconTypes.Mobile]: {
      icon: ipCheckMobile,
      ...commonStyle,
      color: theme.palette.common.black75,
      background: theme.palette.common.black75,
    },
    [LocationIntelligenceIconTypes.Desktop]: {
      icon: ipCheckDesktop,
      ...commonStyle,
      color: theme.palette.common.black75,
      background: theme.palette.common.black75,
    },
    [LocationIntelligenceIconTypes.LatLong]: {
      icon: ipCheckGeoposition,
      ...commonStyle,
    },
    [LocationIntelligenceIconTypes.HighAccuracy]: {
      icon: ipCheckHighAccuracy,
      ...commonStyle,
    },
    [LocationIntelligenceIconTypes.VpnDetect]: {
      icon: ipCheckVpn,
      ...commonStyle,
    },
    [LocationIntelligenceIconTypes.GeoRestriction]: {
      icon: ipCheckGeorestriction,
      ...commonStyle,
    },
  };

  function getIconCommonStyle(styles = {}) {
    const commonStyles = {};

    Object.keys(iconStyle).forEach((key) => {
      commonStyles[key] = {
        ...iconStyle[key],
        ...styles,
      };
    });

    return commonStyles;
  }
  const statuses = {
    [StepStatus.Success]: {
      document: {
        icon: DocumentSuccess,
        color: theme.palette.text.main,
      },
      biometric: {
        icon: OtherChecksSuccess,
        color: theme.palette.text.main,
      },
      reFacematch: {
        icon: OtherChecksSuccess,
        color: theme.palette.text.main,
      },
      ipCheckVpn: {
        icon: ipCheckGeoSuccess,
        color: theme.palette.text.main,
      },
      ipCheckGeo: {
        icon: ipCheckGeoSuccess,
        color: theme.palette.text.main,
      },
      ipCheckGeoWithVpn: {
        icon: ipCheckGeoSuccess,
        color: theme.palette.text.main,
      },
      ...getIconCommonStyle(),
    },
    [StepStatus.Failure]: {
      ...getIconCommonStyle({ background: theme.palette.common.red }),
      document: {
        icon: DocumentError,
        color: theme.palette.common.red,
      },
      biometric: {
        icon: OtherChecksWarning,
        color: theme.palette.common.yellow,
      },
      reFacematch: {
        icon: OtherChecksError,
        color: theme.palette.common.red,
      },
      ipCheckVpn: {
        icon: OtherChecksError,
        color: theme.palette.common.red,
      },
      ipCheckGeo: {
        icon: ipCheckGeoFailure,
        color: theme.palette.common.red,
      },
      ipCheckGeoWithVpn: {
        icon: ipCheckGeoFailure,
        color: theme.palette.common.red,
      },
    },
    [StepStatus.Incomplete]: {
      ...getIconCommonStyle({ background: theme.palette.common.yellow }),
      document: {
        icon: DocumentWarning,
        color: theme.palette.common.yellow,
      },
      biometric: {
        icon: OtherChecksWarning,
        color: theme.palette.common.yellow,
      },
    },
    [StepStatus.Checking]: {
      ...getIconCommonStyle({ background: theme.palette.text.main }),
      document: {
        icon: LoadIcon,
        color: theme.palette.text.main,
      },
      biometric: {
        icon: LoadIcon,
        color: theme.palette.text.main,
      },
      reFacematch: {
        icon: LoadIcon,
        color: theme.palette.text.main,
      },
      ipCheckVpn: {
        icon: LoadIcon,
        color: theme.palette.text.main,
      },
      ipCheckGeo: {
        icon: LoadIcon,
        color: theme.palette.text.main,
      },
      ipCheckGeoWithVpn: {
        icon: LoadIcon,
        color: theme.palette.text.main,
      },
    },
    [StepStatus.Skipped]: {
      ...getIconCommonStyle({ background: theme.palette.text.main }),
      document: {
        icon: DocumentSkipped,
        color: theme.palette.text.main,
      },
    },
    [StepStatus.Default]: {
      ...getIconCommonStyle({ background: theme.palette.text.main }),
    },
    [LivenessStepStatus.FewData]: {
      biometric: {
        icon: OtherChecksDisabled,
        color: theme.palette.text.main,
      },
    },
    [LivenessStepStatus.Disabled]: {
      biometric: {
        icon: OtherChecksDisabled,
        color: theme.palette.text.main,
      },
    },
  };
  // TODO When the redesign is completed, remove the conditions associated with "||"
  return ({
    result: ({ status, type }) => ({
      position: 'relative',
      margin: statuses[status][type]?.margin || '0 auto 20',
      padding: statuses[status][type]?.padding || '30 20 0',
      textAlign: statuses[status][type]?.borderRadius || 'center',
      '&:after': {
        content: '""',
        position: 'absolute',
        top: statuses[status][type]?.top || 0,
        left: statuses[status][type]?.left ?? '50%',
        width: statuses[status][type]?.size || 22,
        height: statuses[status][type]?.size || 22,
        background: `url(${statuses[status][type].icon}) no-repeat center center`,
        backgroundColor: statuses[status][type]?.background || '',
        backgroundSize: statuses[status][type]?.backgroundSize || '',
        borderRadius: statuses[status][type]?.borderRadius || '',
        transform: statuses[status][type]?.transform || 'translateX(-50%)',
        [theme.breakpoints.up('md')]: {
          left: 0,
          transform: 'none',
        },
      },
      [theme.breakpoints.up('md')]: {
        margin: statuses[status][type]?.margin || [[0, 0, 20]],
        padding: statuses[status][type]?.padding || '0 0 0 34px',
        textAlign: 'left',
      },
    }),
    resultTitle: ({ status, type }) => ({
      color: statuses[status][type].color,
    }),
    resultText: {
      color: theme.palette.text.main,
      lineHeight: 1.1,
    },
    resultTitleNew: ({ status, type }) => ({
      color: statuses[status][type].color,
      fontWeight: 400,
      fontSize: 14,
    }),
    resultTextNew: ({ status, type }) => ({
      color: statuses[status][type].color,
      lineHeight: 1.1,
      fontWeight: 700,
      fontSize: 14,
    }),
  });
});
