import { Image, Text, View } from '@react-pdf/renderer';
import { IReFacematchStep } from 'models/ReVerification.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { commonStyles } from '../../PDF.styles';
import { CheckResultLogoPDF } from '../CheckResultLogoPDF/CheckResultLogoPDF';
import { CheckStepPDF } from '../CheckStepPDF/CheckStepPDF';
import { styles } from './ReVerificationPDF.styles';

export function ReVerificationPDF({
  data: {
    reFacematch,
  },
}: {
  data: {
    reFacematch: IReFacematchStep,
  },
}) {
  const intl = useIntl();

  return (
    <View style={commonStyles.paper}>
      <View>
        {reFacematch?.data && (
          <View style={styles.info}>
            <View style={styles.mediaItem}>
              {reFacematch?.data?.currentPhotoUrl && (
                <View style={styles.itemWrapper}>
                  <Image style={styles.image} src={reFacematch?.data?.currentPhotoUrl} />
                  <View style={commonStyles.mt1}>
                    <Text style={styles.itemTitle}>{intl.formatMessage({ id: 'ReVerification.result.pdf.currentBiometrics' })}</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.mediaItem}>
              {reFacematch?.data?.previousPhotoUrl && (
                <View style={styles.itemWrapper}>
                  <Image style={styles.image} src={reFacematch?.data?.previousPhotoUrl} />
                  <View style={commonStyles.mt1}>
                    <Text style={styles.itemTitle}>{intl.formatMessage({ id: 'ReVerification.result.pdf.originBiometrics' })}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
        <View style={styles.itemWrapper}>
          <CheckResultLogoPDF status={reFacematch?.checkStatus} type="reFacematch" />
          <CheckStepPDF step={reFacematch} />
        </View>
      </View>
    </View>
  );
}
