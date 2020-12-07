import React from 'react';
import { Image, Text, View } from '@react-pdf/renderer';
import { useIntl } from 'react-intl';
import { styles } from './CheckStepPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { getStepStatus } from '../../../../models/Step.model';
import { GovCheckTextPDF } from '../GovCheckTextPDF/GovCheckTextPDF';
import { IconStatuses } from '../../assets';
import { CheckText } from '../../../identity/components/CheckText/CheckText';

export function CheckStepPDF({ step, isGovCheck = false }) {
  const intl = useIntl();
  const statusCode = getStepStatus(step);

  return (
    <View style={[styles.card, commonStyles.mb1]}>
      <View style={commonStyles.labelContainer}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[statusCode]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({
            id: `SecurityCheckStep.${step.id}.title`,
            defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${statusCode}` }),
          })}
        </Text>
      </View>
      {isGovCheck ? (
        <View style={styles.value}>
          <GovCheckTextPDF step={step} />
        </View>
      ) : (
        <Text style={styles.value}>
          <CheckText step={step} />
        </Text>
      )}
    </View>
  );
}
