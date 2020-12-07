import React from 'react';
import { useIntl } from 'react-intl';
import { Image, Text, View } from '@react-pdf/renderer';
import IconEmpty from '../../assets/icon-empty-photo.png';
import { StepStatus } from '../../../../models/Step.model';
import { VerificationCheckCardPDF } from '../VerificationCheckCardPDF/VerificationCheckCardPDF';
import { styles } from './VerificationBioCheckSummaryPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { getBiometricCheckStatus, LivenessStepStatus } from '../../../../models/Biometric.model';
import { VerificationSummaryChecksContainerPDF } from '../VerificationSummaryChecksContainerPDF/VerificationSummaryChecksContainerPDF';
import { VerificationSummaryTitlePDF } from '../VerificationSummaryTitlePDF/VerificationSummaryTitlePDF';
import { getMediaURL } from '../../../../lib/client/media';
import { VerificationSummaryTitleTypes } from '../../../../models/Identity.model';

export function VerificationBioCheckSummaryPDF({ biometric, identity }) {
  const intl = useIntl();
  const status = getBiometricCheckStatus(biometric);

  return (
    <VerificationCheckCardPDF
      titleComponent={(
        <VerificationSummaryTitlePDF status={status} type={VerificationSummaryTitleTypes.biometric}>
          {intl.formatMessage({ id: 'identity.summary.title.biometric' })}
        </VerificationSummaryTitlePDF>
      )}
      bottomComponent={
        status !== LivenessStepStatus.FewData && status !== LivenessStepStatus.Disabled ? (
          <VerificationSummaryChecksContainerPDF steps={biometric} />
        ) : (
          <VerificationSummaryTitlePDF status={status} type={VerificationSummaryTitleTypes.biometric} withIcon={false}>
            {intl.formatMessage({ id: `identity.summary.biometric.${status}` })}
          </VerificationSummaryTitlePDF>
        )
      }
    >
      <View style={styles.wrapper}>
        {/* Regular flow */}
        {status !== StepStatus.Checking && (
        <>
          <View style={styles.imageBiometric}>
            {/* Empty Photo */}
            {status === LivenessStepStatus.Disabled && (
              <View style={styles.imageDisabled}>
                <Image style={styles.imageEmpty} src={IconEmpty} />
                <Text style={styles.emptyCaption}>
                  {intl.formatMessage({ id: 'identity.summary.empty.img' })}
                </Text>
              </View>
            )}
            {/* Not Empty Photo */}
            {status !== LivenessStepStatus.Disabled && biometric[0]?.selfieUrl && (
              <View style={styles.imageNotDisabled}>
                <Image style={styles.image} src={getMediaURL(biometric[0].selfieUrl)} />
              </View>
            )}
          </View>
          <View style={styles.biometricText}>
            {identity.fullName
              ? (
                <Text style={[commonStyles.data, styles.data]}>
                  {identity.fullName}
                </Text>
              )
              : (
                <Text style={styles.emptyText}>
                  {intl.formatMessage({ id: 'identity.summary.empty.name' })}
                </Text>
              )}
            <Text style={[commonStyles.title, commonStyles.mb05]}>
              {intl.formatMessage({ id: 'identity.field.name' })}
            </Text>
          </View>
        </>
        )}
      </View>
    </VerificationCheckCardPDF>
  );
}
