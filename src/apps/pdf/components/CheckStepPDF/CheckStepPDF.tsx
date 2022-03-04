import React, { ReactNode } from 'react';
import { Image, Text, View } from '@react-pdf/renderer';
import { useIntl } from 'react-intl';
import { CheckText } from 'apps/identity';
import { IStep } from 'models/Step.model';
import { styles } from './CheckStepPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { IconStatuses } from '../../assets';

export function CheckStepPDF({ step, children, title }: {
  step: IStep;
  title?: string;
  children?: ReactNode;
}) {
  const intl = useIntl();

  return (
    <View style={[styles.card, commonStyles.mb05]}>
      <View style={commonStyles.labelContainer} wrap={false}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[step.checkStatus]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({
            id: title || `SecurityCheckStep.${step.id}.title`,
            defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
          })}
        </Text>
      </View>
      {children ? (
        <View style={styles.value}>
          {children}
        </View>
      ) : (
        <Text style={styles.value}>
          <CheckText step={step} />
        </Text>
      )}
    </View>
  );
}
