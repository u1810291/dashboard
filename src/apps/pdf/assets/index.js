import { WarningTypes } from 'apps/ui';
import { LivenessStepStatus } from 'models/Biometric.model';
import { BrowserTypes, DeviceTypes, OSTypes } from 'models/DeviceCheck.model';
import { VerificationSummaryTitleTypes } from 'models/Identity.model';
import { StepStatus } from 'models/Step.model';
import { colors } from '../PDF.theme.common';
import AndroidIcon from './android.png';
import AppleIcon from './apple.png';
import BlueViewIcon from './blue-box.png';
import ChromeIcon from './chrome.png';
import DesktopIcon from './desktop.png';
import EdgeIcon from './edge.png';
import FirefoxIcon from './firefox.png';
import FreeBSDIcon from './freeBSD.png';
import GreenViewIcon from './green-box.png';
import AdditionalChecksDisabled from './icon-additional-disabled.png';
import AdditionalChecksError from './icon-additional-error.png';
import AdditionalChecksSuccess from './icon-additional-success.png';
import AdditionalChecksWarning from './icon-additional-warning.png';
import ChecksWarning from './icon-alert-warning.png';
import DeviceDisabled from './icon-device-disabled.png';
import DeviceError from './icon-device-error.png';
import DeviceSuccess from './icon-device-success.png';
import DeviceWarning from './icon-device-warning.png';
import DocumentDisabled from './icon-document-disabled.png';
import DocumentError from './icon-document-error.png';
import DocumentSuccess from './icon-document-success.png';
import DocumentWarning from './icon-document-warning.png';
import IconData from './icon-identity-data.png';
import IconDone from './icon-identity-done.png';
import IconError from './icon-identity-error.png';
import IconLoad from './icon-load.png';
import OtherChecksDisabled from './icon-other-checks-disabled.png';
import OtherChecksError from './icon-other-checks-error.png';
import OtherChecksSuccess from './icon-other-checks-success.png';
import OtherChecksWarning from './icon-other-checks-warning.png';
import LinuxIcon from './linux.png';
import OperaIcon from './opera.png';
import SafariIcon from './safari.png';
import SamsungIcon from './samsung.png';
import SmartphoneIcon from './smartphone.png';
import UbuntuIcon from './ubuntu.png';
import WindowsIcon from './windows.png';
import YandexIcon from './yandex.png';

export const IconStatuses = {
  [StepStatus.Success]: IconDone,
  [StepStatus.Failure]: IconError,
  [StepStatus.Incomplete]: IconData,
  [StepStatus.Checking]: IconLoad,
};

export const DeviceIcons = {
  [DeviceTypes.Mobile]: SmartphoneIcon,
  [DeviceTypes.Tablet]: SmartphoneIcon,
  [DeviceTypes.Desktop]: DesktopIcon,
};

export const OSIcons = {
  [OSTypes.Android]: AndroidIcon,
  [OSTypes.Windows]: WindowsIcon,
  [OSTypes.Unknown]: BlueViewIcon,
  [OSTypes.MacOS]: AppleIcon,
  [OSTypes.IOS]: AppleIcon,
  [OSTypes.Linux]: LinuxIcon,
  [OSTypes.Ubuntu]: UbuntuIcon,
  [OSTypes.IPadOs]: AppleIcon,
  [OSTypes.FreeBSD]: FreeBSDIcon,
};

export const BrowserIcons = {
  [BrowserTypes.Chrome]: ChromeIcon,
  [BrowserTypes.Unknown]: BlueViewIcon,
  [BrowserTypes.Safari]: SafariIcon,
  [BrowserTypes.Opera]: OperaIcon,
  [BrowserTypes.Firefox]: FirefoxIcon,
  [BrowserTypes.Pylib]: GreenViewIcon,
  [BrowserTypes.ThirdApp]: GreenViewIcon,
  [BrowserTypes.Samsung]: SamsungIcon,
  [BrowserTypes.OKhttp]: GreenViewIcon,
  [BrowserTypes.Java]: GreenViewIcon,
  [BrowserTypes.Other]: BlueViewIcon,
  [BrowserTypes.Edge]: EdgeIcon,
  [BrowserTypes.Yandex]: YandexIcon,
};

export const WarningIcons = {
  [WarningTypes.Warning]: ChecksWarning,
  [WarningTypes.Success]: OtherChecksSuccess,
  [WarningTypes.Error]: OtherChecksError,
};

export const VerificationSummaryTitleStatuses = {
  [StepStatus.Success]: {
    [VerificationSummaryTitleTypes.biometric]: {
      icon: OtherChecksSuccess,
    },
    [VerificationSummaryTitleTypes.document]: {
      icon: DocumentSuccess,
    },
    [VerificationSummaryTitleTypes.additional]: {
      icon: AdditionalChecksSuccess,
    },
    [VerificationSummaryTitleTypes.device]: {
      icon: DeviceSuccess,
    },
    colorText: colors.black75,
  },
  [StepStatus.Failure]: {
    [VerificationSummaryTitleTypes.biometric]: {
      icon: OtherChecksError,
    },
    [VerificationSummaryTitleTypes.document]: {
      icon: DocumentError,
    },
    [VerificationSummaryTitleTypes.additional]: {
      icon: AdditionalChecksError,
    },
    [VerificationSummaryTitleTypes.device]: {
      icon: DeviceError,
    },
    colorText: colors.red,
  },
  [StepStatus.Incomplete]: {
    [VerificationSummaryTitleTypes.biometric]: {
      icon: OtherChecksWarning,
    },
    [VerificationSummaryTitleTypes.document]: {
      icon: DocumentWarning,
    },
    [VerificationSummaryTitleTypes.additional]: {
      icon: AdditionalChecksWarning,
    },
    [VerificationSummaryTitleTypes.device]: {
      icon: DeviceWarning,
    },
    colorText: colors.yellow,
  },
  [StepStatus.Checking]: {
    [VerificationSummaryTitleTypes.biometric]: {
      icon: OtherChecksDisabled,
    },
    [VerificationSummaryTitleTypes.document]: {
      icon: DocumentDisabled,
    },
    [VerificationSummaryTitleTypes.additional]: {
      icon: AdditionalChecksDisabled,
    },
    [VerificationSummaryTitleTypes.device]: {
      icon: DeviceDisabled,
    },
    colorText: colors.black75,
  },
  [LivenessStepStatus.Disabled]: {
    [VerificationSummaryTitleTypes.biometric]: {
      icon: OtherChecksDisabled,
    },
    [VerificationSummaryTitleTypes.document]: {
      icon: DocumentDisabled,
    },
    [VerificationSummaryTitleTypes.additional]: {
      icon: AdditionalChecksDisabled,
    },
    [VerificationSummaryTitleTypes.device]: {
      icon: DeviceDisabled,
    },
    colorText: colors.black75,
  },
  [LivenessStepStatus.FewData]: {
    [VerificationSummaryTitleTypes.biometric]: {
      icon: OtherChecksDisabled,
    },
    [VerificationSummaryTitleTypes.document]: {
      icon: DocumentDisabled,
    },
    [VerificationSummaryTitleTypes.additional]: {
      icon: AdditionalChecksDisabled,
    },
    [VerificationSummaryTitleTypes.device]: {
      icon: DeviceDisabled,
    },
    colorText: colors.black75,
  },
};
