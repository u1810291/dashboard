import React from 'react';
import { Image, Text, View } from '@react-pdf/renderer';
import { StepStatus } from 'models/Step.model';
import { getLocationIntelligenceUrl } from 'apps/LocationIntelligenceOld';
import { getMediaURL } from 'lib/client/media';
import { useFormatMessage } from 'apps/intl';
import { LocationIntelligenceVerificationOutput } from 'apps/LocationIntelligence';
import { CheckResultLogoPDF } from '../CheckResultLogoPDF/CheckResultLogoPDF';
import { styles } from './LocationIntelligeinceOldPDF.styles';
import { commonStyles } from '../../PDF.styles';

export function LocationIntelligenceOldPDF({ data }: {data: LocationIntelligenceVerificationOutput}) {
  let status = data.safe ? StepStatus.Success : StepStatus.Failure;
  if (data.isRunning) {
    status = StepStatus.Checking;
  }
  const formatMessage = useFormatMessage();
  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBold, commonStyles.mb15]}>{formatMessage('IpCheckStep.title')}</Text>
      <View>
        {/* Google Map */}
        <View style={[commonStyles.mapBox, commonStyles.mb15]} wrap={false}>
          <Image style={commonStyles.map} src={getMediaURL(getLocationIntelligenceUrl(data), false)} />
        </View>

        {/* Detected location fields */}
        <View style={styles.fieldsWrapper}>
          <View style={styles.field}>
            <Text style={commonStyles.data}>
              {data.country}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {formatMessage('IpCheckStep.country')}
            </Text>
            <Text style={commonStyles.data}>
              {data.city || '-'}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {formatMessage('IpCheckStep.city')}
            </Text>
            <Text style={commonStyles.data}>
              {data.region || '-'}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {formatMessage('IpCheckStep.province')}
            </Text>
            <Text style={commonStyles.data}>
              {data.postalCode || data?.zip || '-'}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {formatMessage('IpCheckStep.zipCode')}
            </Text>
            <Text style={commonStyles.data}>
              {data.address || '-'}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {formatMessage('LocIntStep.address')}
            </Text>
            <Text style={commonStyles.data}>
              {`${data?.latitude?.toFixed(4)}° N, ${data?.longitude?.toFixed(4)}° E`}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {formatMessage('IpCheckStep.latLong')}
            </Text>
          </View>
        </View>

        {/* proxy usage banner */}
        <View style={commonStyles.mb15}>
          <CheckResultLogoPDF type="ipCheck" status={status} />
        </View>
      </View>
    </View>
  );
}
