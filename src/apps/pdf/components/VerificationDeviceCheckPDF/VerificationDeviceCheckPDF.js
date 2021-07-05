import React from 'react';
import { useIntl } from 'react-intl';
import { Image, Text, View } from '@react-pdf/renderer';
import { StepStatus } from 'models/Step.model';
import { VerificationSummaryTitleTypes } from 'models/Identity.model';
import { getDeviceBrowserLabel, getDeviceModel, getDeviceOSLabel, getDevicePlatformType, getDeviceType, PlatformTypes, getDeviceBrowserType, getDeviceOSType, BrowserTypes, DeviceTypes, OSTypes } from 'models/DeviceCheck.model';
import { styles } from './VerificationDeviceCheckPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { VerificationCheckCardPDF } from '../VerificationCheckCardPDF/VerificationCheckCardPDF';
import { VerificationSummaryTitlePDF } from '../VerificationSummaryTitlePDF/VerificationSummaryTitlePDF';
import ModelIcon from '../../assets/model-icon.png';
import { BrowserIcons, DeviceIcons, OSIcons } from '../../assets';

export function VerificationDeviceCheckPDF({ deviceFingerprint }) {
  const intl = useIntl();
  const platform = getDevicePlatformType(deviceFingerprint);

  const model = getDeviceModel(deviceFingerprint);
  const deviceType = getDeviceType(deviceFingerprint);
  const osLabel = getDeviceOSLabel(deviceFingerprint);
  const browserLabel = getDeviceBrowserLabel(deviceFingerprint);

  const DeviceIcon = DeviceIcons[deviceType] || DeviceIcons[DeviceTypes.Desktop];
  const OSIcon = OSIcons[getDeviceOSType(deviceFingerprint)] || OSIcons[OSTypes.Unknown];
  const BrowserIcon = BrowserIcons[getDeviceBrowserType(deviceFingerprint)] || BrowserIcons[BrowserTypes.Other];

  if (platform === PlatformTypes.Api) {
    return null;
  }

  return (
    <VerificationCheckCardPDF
      titleComponent={(
        <VerificationSummaryTitlePDF status={StepStatus.Success} type={VerificationSummaryTitleTypes.device}>
          {intl.formatMessage({ id: 'identity.summary.title.device' })}
        </VerificationSummaryTitlePDF>
      )}
    >
      <View>
        {/* model */}
        {platform === PlatformTypes.WebMobile && model && (
          <View style={[styles.wrapper, commonStyles.mb15]}>
            <View style={styles.col}>
              <View style={styles.wrapper}>
                <Image src={ModelIcon} style={styles.titleIcon} />
                <Text style={commonStyles.title}>{intl.formatMessage({ id: 'DeviceCheck.model' })}</Text>
              </View>
            </View>
            <View style={styles.col}>
              <Text style={styles.value}>{model}</Text>
            </View>
          </View>
        )}
        {/* device type */}
        {deviceType && (
          <View style={[styles.wrapper, commonStyles.mb15]}>
            <View style={styles.col}>
              <View style={styles.wrapper}>
                <Image src={DeviceIcon} style={styles.titleIcon} />
                <Text style={commonStyles.title}>
                  {intl.formatMessage({ id: 'DeviceCheck.deviceType.title' })}
                </Text>
              </View>
            </View>
            <View style={styles.col}>
              <Text style={styles.value}>
                {intl.formatMessage({ id: `DeviceCheck.deviceType.${deviceType}` })}
              </Text>
            </View>
          </View>
        )}
        {/* os */}
        <View style={[styles.wrapper, commonStyles.mb15]}>
          <View style={styles.col}>
            <View style={styles.wrapper}>
              <Image src={OSIcon} style={styles.titleIcon} />
              <Text style={commonStyles.title}>
                {intl.formatMessage({ id: 'DeviceCheck.os' })}
              </Text>
            </View>
          </View>
          <View style={styles.col}>
            <Text style={styles.value}>{osLabel}</Text>
          </View>
        </View>
        {/* browser */}
        {(platform === PlatformTypes.WebMobile || platform === PlatformTypes.WebDesktop) && (
          <View style={[styles.wrapper, commonStyles.mb15]}>
            <View style={styles.col}>
              <View style={styles.wrapper}>
                <Image src={BrowserIcon} style={styles.titleIcon} />
                <Text style={commonStyles.title}>
                  {intl.formatMessage({ id: 'DeviceCheck.browser' })}
                </Text>
              </View>
            </View>
            <View style={styles.col}>
              <Text style={styles.value}>{browserLabel}</Text>
            </View>
          </View>
        )}
      </View>
    </VerificationCheckCardPDF>
  );
}
