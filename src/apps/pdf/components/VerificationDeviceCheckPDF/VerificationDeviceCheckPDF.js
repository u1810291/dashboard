import React from 'react';
import { useIntl } from 'react-intl';
import { Image, Text, View } from '@react-pdf/renderer';
import { styles } from './VerificationDeviceCheckPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { VerificationCheckCardPDF } from '../VerificationCheckCardPDF/VerificationCheckCardPDF';
import { VerificationSummaryTitlePDF } from '../VerificationSummaryTitlePDF/VerificationSummaryTitlePDF';
import { StepStatus } from '../../../../models/Step.model';
import { getDeviceBrowserLabel, getDeviceModel, getDeviceOSLabel, getDevicePlatformType, getDeviceType, PlatformTypes, getDeviceBrowserType, getDeviceOSType } from '../../../../models/DeviceCheck.model';
import ModelIcon from '../../assets/model-icon.png';
import { BrowserIcons, DeviceIcons, OSIcons } from '../../assets';
import { VerificationSummaryTitleTypes } from '../../../../models/Identity.model';

export function VerificationDeviceCheckPDF({ identity }) {
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
