import { Text, View } from '@react-pdf/renderer';
import { getIdentityStatusExplanation, getIdentityStatusLabel, getStatusById } from 'models/Status.model';
import React from 'react';
import { useIntl } from 'react-intl';
import { IdentityStatusesColorMap } from '../../models/pdf.model';
import { styles } from './StatusSelectorPDF.styles';

export function StatusSelectorPDF({ statusId }) {
  const intl = useIntl();
  const status = getStatusById(statusId);
  const statusWithColors = IdentityStatusesColorMap.find((item) => item.id === statusId);

  return (
    <View style={[styles.wrapper, { backgroundColor: statusWithColors?.color, color: statusWithColors?.textColor }]}>
      <Text style={styles.text}>
        {intl.formatMessage({ id: 'statusSelect.status' })}
      </Text>
      <Text style={styles.title}>
        {intl.formatMessage({ id: getIdentityStatusLabel(status?.id) })}
      </Text>
      <Text style={styles.text}>
        {intl.formatMessage({ id: getIdentityStatusExplanation(status?.id) })}
      </Text>
    </View>
  );
}
