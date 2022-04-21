import React from 'react';
import { useIntl } from 'react-intl';
import { Image, Text, View } from '@react-pdf/renderer';
import { StepStatus } from 'models/Step.model';
import { getIpCheckUrl } from 'models/IpCheckOld.model';
import { CheckResultLogoPDF } from '../CheckResultLogoPDF/CheckResultLogoPDF';
import { styles } from './IpCheckPDF.styles';
import { commonStyles } from '../../PDF.styles';

export function IpCheckPDF({ data = {}, isChecking }) {
  const intl = useIntl();

  let status = data.safe ? StepStatus.Success : StepStatus.Failure;
  if (isChecking) {
    status = StepStatus.Checking;
  }

  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBold, commonStyles.mb15]}>{intl.formatMessage({ id: 'IpCheckStep.title' })}</Text>
      <View>
        {/* Google Map */}
        <View style={[commonStyles.mapBox, commonStyles.mb15]} wrap={false}>
          <Image style={commonStyles.map} src={getIpCheckUrl(data)} />
        </View>
        {/* Detected location fields */}
        <View style={styles.fieldsWrapper}>
          <View style={styles.field}>
            <Text style={commonStyles.data}>
              {data.country}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {intl.formatMessage({ id: 'IpCheckStep.country' })}
            </Text>
            <Text style={commonStyles.data}>
              {data.city}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {intl.formatMessage({ id: 'IpCheckStep.city' })}
            </Text>
          </View>
          <View style={styles.field}>
            <Text style={commonStyles.data}>
              {data.region}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {intl.formatMessage({ id: 'IpCheckStep.province' })}
            </Text>
            <Text style={commonStyles.data}>
              {data.zip}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {intl.formatMessage({ id: 'IpCheckStep.zipCode' })}
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
