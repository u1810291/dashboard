import { useIntl } from 'react-intl';
import React from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import { styles } from './VerificationSummaryChecksContainerPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { StepStatus } from '../../../../models/Step.model';
import IconDone from '../../assets/icon-identity-done.png';
import IconError from '../../assets/icon-identity-error.png';

export function VerificationSummaryChecksContainerPDF({ steps }) {
  const intl = useIntl();
  const passedSteps = steps.filter((step) => step.checkStatus === StepStatus.Success);
  const passedStepsCount = passedSteps.length;
  const failedSteps = steps.filter((step) => step.checkStatus === StepStatus.Failure);
  return (
    <>
      {passedStepsCount > 0 && (
        <View style={commonStyles.mt1}>
          <View style={commonStyles.labelContainer} wrap={false}>
            <Image src={IconDone} style={commonStyles.labelIcon} />
            <Text style={commonStyles.label}>
              {intl.formatMessage({ id: 'verificationDetails.summary.checksPassed.title' }, { count: passedStepsCount })}
            </Text>
          </View>
          {passedSteps.map((step) => (
            <View key={step.id} style={styles.selectContainer}>
              <Image src={IconDone} style={commonStyles.labelIcon} />
              <Text style={commonStyles.title}>
                {intl.formatMessage({ id: `SecurityCheckStep.${step.id}.title` })}
              </Text>
            </View>
          ))}
        </View>
      )}
      {failedSteps.map((step) => (
        <View style={styles.errorContainer} key={step.id}>
          <Image src={IconError} style={commonStyles.labelIcon} />
          <Text style={styles.errorTitle}>{intl.formatMessage({ id: `SecurityCheckStep.${step.id}.title` })}</Text>
        </View>
      ))}
    </>
  );
}
