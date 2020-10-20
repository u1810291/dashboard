import { makeStyles } from '@material-ui/core';
import DocumentSuccess from 'assets/icon-document-success.svg';
import DocumentError from 'assets/icon-document-error.svg';
import DocumentWarning from 'assets/icon-document-warning.svg';
import LoadIcon from 'assets/icon-load.svg';
import OtherChecksSuccess from 'assets/icon-other-checks-success.svg';
import OtherChecksDisabled from 'assets/icon-other-checks-disabled.svg';
import OtherChecksWarning from 'assets/icon-other-checks-warning.svg';
import { StepStatus } from '../../../../models/Step.model';
import { LivenessStepStatus } from '../../../../models/Biometric.model';

export const useStyles = makeStyles((theme) => {
  const statuses = {
    [StepStatus.Success]: {
      document: {
        icon: DocumentSuccess,
        color: theme.palette.common.black75,
      },
      biometric: {
        icon: OtherChecksSuccess,
        color: theme.palette.common.black75,
      },
      ipCheck: {
        icon: OtherChecksSuccess,
        color: theme.palette.common.black75,
      },
    },
    [StepStatus.Failure]: {
      document: {
        icon: DocumentError,
        color: theme.palette.common.red,
      },
      biometric: {
        icon: OtherChecksWarning,
        color: '#FEC649',
      },
      ipCheck: {
        icon: OtherChecksWarning,
        color: '#FEC649',
      },
    },
    [StepStatus.Incomplete]: {
      document: {
        icon: DocumentWarning,
        color: '#FEC649',
      },
      biometric: {
        icon: OtherChecksWarning,
        color: '#FEC649',
      },
    },
    [StepStatus.Checking]: {
      document: {
        icon: LoadIcon,
        color: theme.palette.common.black75,
      },
      biometric: {
        icon: LoadIcon,
        color: theme.palette.common.black75,
      },
      ipCheck: {
        icon: LoadIcon,
        color: theme.palette.common.black75,
      },
    },
    [LivenessStepStatus.FewData]: {
      biometric: {
        icon: OtherChecksDisabled,
        color: theme.palette.common.black75,
      },
    },
    [LivenessStepStatus.Disabled]: {
      biometric: {
        icon: OtherChecksDisabled,
        color: theme.palette.common.black75,
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
        padding: [[0, 36]],
        textAlign: 'left',
      },
    }),
    resultTitle: ({ status, type }) => ({
      color: statuses[status][type].color,
    }),
    resultText: {
      color: theme.palette.common.black75,
      lineHeight: 1.1,
    },
  });
});
