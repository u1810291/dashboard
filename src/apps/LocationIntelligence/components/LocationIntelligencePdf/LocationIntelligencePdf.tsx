import { useFormatMessage } from 'apps/intl';
import { ProductVerificationPdfProps } from 'models/PdfAdapter.model';
import { StepStatus } from 'models/Step.model';
import React from 'react';
import { getMediaURL } from 'lib/client/media';
import { Statuses, styles } from './LocationIntelligencePdf.styles';
import { getLocationIntelligenceUrl, IVerificationWithLocationIntelligence, LocationIntelligenceVerificationOutput } from '../../models/LocationIntelligence.model';

export function LocationIntelligencePdf({ pdfRendererAdapter, verification }: ProductVerificationPdfProps<IVerificationWithLocationIntelligence>) {
  const formatMessage = useFormatMessage();
  const { View, Text, Image, commonStyles, StyleSheet } = pdfRendererAdapter;
  const styleSheet = StyleSheet.create(styles);
  const output = verification?.blocks?.ip?.output || {} as LocationIntelligenceVerificationOutput;

  let status = output.safe ? StepStatus.Success : StepStatus.Failure;
  if (output.isRunning) {
    status = StepStatus.Checking;
  }
  const { icon, color } = Statuses[status];

  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBold, commonStyles.mb15]}>{formatMessage('IpCheckStep.title')}</Text>
      <View>
        {/* Google Map */}
        <View style={[commonStyles.mapBox, commonStyles.mb15]} wrap={false}>
          {/* @ts-ignore */}
          <Image style={commonStyles.map} src={getMediaURL(getLocationIntelligenceUrl(output), false)} />
        </View>
        {/* Detected location fields */}
        <View style={styleSheet.fieldsWrapper}>
          <View style={styleSheet.field}>
            <Text style={commonStyles.data}>
              {output.country}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {formatMessage('IpCheckStep.country')}
            </Text>
            <Text style={commonStyles.data}>
              {output.city}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {formatMessage('IpCheckStep.city')}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={commonStyles.data}>
              {output.region}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {formatMessage('IpCheckStep.province')}
            </Text>
            <Text style={commonStyles.data}>
              {output.postalCode || output.zip || '-'}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {formatMessage('IpCheckStep.zipCode')}
            </Text>
          </View>
        </View>

        {/* proxy usage banner */}
        <View style={commonStyles.mb15}>
          <View style={styles.result}>
            <Image style={styles.image} src={icon} />
            <Text style={[styles.resultTitle, { color }]}>
              {formatMessage(`Checks.result.ipCheck.${status}.title`)}
            </Text>
            <Text style={styles.resultText}>
              {formatMessage(`Checks.result.ipCheck.${status}.description`)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
