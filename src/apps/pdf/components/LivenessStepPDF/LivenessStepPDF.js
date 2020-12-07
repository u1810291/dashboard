import { getBiometricCheckStatus, LivenessStepStatus } from 'models/Biometric.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { Image, Text, View } from '@react-pdf/renderer';
import { CheckResultLogoPDF } from '../CheckResultLogoPDF/CheckResultLogoPDF';
import { styles } from './LivenessStepPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { CheckStepPDF } from '../CheckStepPDF/CheckStepPDF';
import { getMediaURL } from '../../../../lib/client/media';

export function LivenessStepPDF({ steps }) {
  const intl = useIntl();
  const checkStatus = getBiometricCheckStatus(steps);

  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>{intl.formatMessage({ id: 'LivenessStep.Checks.status.title' })}</Text>
      <View>
        {checkStatus !== LivenessStepStatus.Disabled && (
          <View style={styles.info}>
            {checkStatus !== LivenessStepStatus.FewData && steps.map((item) => (
              <View>
                {/* video */}
                {item.videoUrl && (
                  <View
                    key={item.id}
                    style={styles.mediaItem}
                  >
                    <View style={styles.itemWrapper}>
                      <Image style={styles.image} src={getMediaURL(item.selfieUrl)} />
                      <View style={commonStyles.mt1}>
                        <Text style={styles.itemTitle}>{intl.formatMessage({ id: `LivenessStep.Checks.${item.id}.title` })}</Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            ))}
            <View style={styles.mediaItem}>
              {/* image */}
              {steps[0].selfieUrl && (
                <View style={styles.itemWrapper}>
                  <Image style={styles.image} src={getMediaURL(steps[0].selfieUrl)} />
                  <View style={commonStyles.mt1}>
                    <Text style={styles.itemTitle}>{intl.formatMessage({ id: 'LivenessStep.Checks.selfie.title' })}</Text>
                    {steps[0].videoUrl && (
                      <Text style={styles.subtitle}>{intl.formatMessage({ id: 'LivenessStep.Checks.selfieExtracted.title' })}</Text>
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
        <View style={styles.itemWrapper}>
          <CheckResultLogoPDF status={checkStatus} type="biometric" />
          <View>
            {steps.map((step) => (
              <CheckStepPDF step={step} key={step.id} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
