import { StepStatus } from 'models/Step.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { Image, Text, View } from '@react-pdf/renderer';
import { styles } from './BankAccountDataPDF.styles';
import { IconStatuses } from '../../assets';
import { commonStyles } from '../../PDF.styles';
import { IBankAccountDataVerification } from 'apps/BankAccountData';

export function BankAccountDataPDF({ data }: { data: IBankAccountDataVerification }) {
  const intl = useIntl();

  return (
    <View style={styles.wrapper}>
      <View style={commonStyles.labelContainer} wrap={false}>
        <Image style={commonStyles.labelIcon} src={IconStatuses[data.success ? StepStatus.Success : StepStatus.Failure]} />
        <Text style={commonStyles.label}>
          {intl.formatMessage({ id: 'BankAccountData.title' })}
        </Text>
      </View>
    </View>
  );
}
