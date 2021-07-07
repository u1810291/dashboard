import { makeStyles } from '@material-ui/core';
import DocumentError from 'assets/icon-document-error.svg';
import DocumentSuccess from 'assets/icon-document-success.svg';
import DocumentWarning from 'assets/icon-document-warning.svg';
import LoadIcon from 'assets/icon-load.svg';
import OtherChecksDisabled from 'assets/icon-other-checks-disabled.svg';
import OtherChecksSuccess from 'assets/icon-other-checks-success.svg';
import OtherChecksWarning from 'assets/icon-other-checks-warning.svg';
import OtherChecksError from 'assets/icon-other-checks-error.svg';
import ipCheckGeoSuccess from 'assets/icon-geo-checks-success.svg';
import ipCheckGeoFailure from 'assets/icon-geo-checks-failure.svg';
import { LivenessStepStatus } from 'models/Biometric.model';
import { StepStatus } from 'models/Step.model';

export const useStyles = makeStyles((theme) => {
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
    },
    [StepStatus.Failure]: {
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

  return ({
    result: ({ status, type }) => ({
      position: 'relative',
      margin: [[0, 'auto', 20]],
      padding: [[30, 20, 0]],
      textAlign: 'center',
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '50%',
        width: 22,
        height: 22,
        background: `url(${statuses[status][type].icon}) no-repeat center center`,
        transform: 'translateX(-50%)',
        [theme.breakpoints.up('md')]: {
          left: 0,
          transform: 'none',
        },
      },
      [theme.breakpoints.up('md')]: {
        margin: [[0, 0, 20]],
        padding: '0 0 0 34px',
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
  });
});
