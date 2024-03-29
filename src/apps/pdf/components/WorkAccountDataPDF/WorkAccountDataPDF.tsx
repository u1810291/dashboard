import { StepStatus } from 'models/Step.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { Image, Text, View } from '@react-pdf/renderer';
import { IWorkAccountDataVerification } from 'apps/WorkAccountData';
import { styles } from './WorkAccountDataPDF.styles';
import { IconStatuses } from '../../assets';
import { commonStyles } from '../../PDF.styles';

export function WorkAccountDataPDF({ data }: { data: IWorkAccountDataVerification }) {
  const intl = useIntl();

  return (
    <View style={styles.wrapper}>
      <View style={commonStyles.labelContainer} wrap={false}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[data.success ? StepStatus.Success : StepStatus.Failure]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({ id: 'WorkAccountData.title' })}
        </Text>
      </View>
    </View>
  );
}
