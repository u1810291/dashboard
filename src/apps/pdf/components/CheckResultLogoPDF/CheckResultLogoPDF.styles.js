import { StyleSheet } from '@react-pdf/renderer';
import OtherChecksSuccess from '../../assets/icon-other-checks-success.png';
import OtherChecksDisabled from '../../assets/icon-other-checks-disabled.png';
import OtherChecksWarning from '../../assets/icon-other-checks-warning.png';
import DocumentSuccess from '../../assets/icon-document-success.png';
import DocumentWarning from '../../assets/icon-document-warning.png';
import DocumentError from '../../assets/icon-document-error.png';
import LoadIcon from '../../assets/icon-load.png';
import { StepStatus } from '../../../../models/Step.model';
import { LivenessStepStatus } from '../../../../models/Biometric.model';
import { colors } from '../../PDF.theme.common';

export const Statuses = {
  [StepStatus.Success]: {
    document: {
      icon: DocumentSuccess,
      color: colors.black75,
    },
    biometric: {
      icon: OtherChecksSuccess,
      color: colors.black75,
    },
    ipCheck: {
      icon: OtherChecksSuccess,
      color: colors.black75,
    },
  },
  [StepStatus.Failure]: {
    document: {
      icon: DocumentError,
      color: colors.red,
    },
    biometric: {
      icon: OtherChecksWarning,
      color: colors.yellow,
    },
    ipCheck: {
      icon: OtherChecksWarning,
      color: colors.yellow,
    },
  },
  [StepStatus.Incomplete]: {
    document: {
      icon: DocumentWarning,
      color: colors.yellow,
    },
    biometric: {
      icon: OtherChecksWarning,
      color: colors.yellow,
    },
  },
  [StepStatus.Checking]: {
    document: {
      icon: LoadIcon,
      color: colors.black75,
    },
    biometric: {
      icon: LoadIcon,
      color: colors.black75,
    },
    ipCheck: {
      icon: LoadIcon,
      color: colors.black75,
    },
  },
  [LivenessStepStatus.FewData]: {
    biometric: {
      icon: OtherChecksDisabled,
      color: colors.black75,
    },
  },
  [LivenessStepStatus.Disabled]: {
    biometric: {
      icon: OtherChecksDisabled,
      color: colors.black75,
    },
  },
};

export const styles = StyleSheet.create({
  result: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: [[0, 'auto', 20]],
    padding: [[30, 20, 0]],
  },
  resultTitle: {
    width: '100%',
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black75,
    textAlign: 'center',
  },
  resultText: {
    width: '100%',
    marginBottom: 5,
    fontSize: 14,
    color: colors.black75,
    textAlign: 'center',
  },
  image: {
    width: 22,
    marginBottom: 10,
  },
});
