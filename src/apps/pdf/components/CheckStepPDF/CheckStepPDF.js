import React from 'react';
import { Image, Text, View } from '@react-pdf/renderer';
import { useIntl } from 'react-intl';
import { CheckText } from 'apps/identity/components/CheckText/CheckText';
import { styles } from './CheckStepPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { GovCheckTextPDF } from '../GovCheckTextPDF/GovCheckTextPDF';
import { IconStatuses } from '../../assets';

export function CheckStepPDF({ step, isGovCheck = false }) {
  const intl = useIntl();

  return (
    <View style={[styles.card, commonStyles.mb05]}>
      <View style={commonStyles.labelContainer} wrap={false}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[step.checkStatus]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({
            id: `SecurityCheckStep.${step.id}.title`,
            defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
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
