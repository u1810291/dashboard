import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View } from '@react-pdf/renderer';
import { CustomField } from 'apps/CustomField';
import { styles } from './CustomFieldPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { CheckResultLogoPDF } from '../CheckResultLogoPDF/CheckResultLogoPDF';

export function CustomFieldPDF({ input }: { input: {data: CustomField[] }}) {
  const intl = useIntl();
  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBold, commonStyles.mb15]}>{intl.formatMessage({ id: 'IpCheckStep.title' })}</Text>
      <View>
        <View style={styles.fieldsWrapper}>
          <View style={styles.field}>
            <Text style={commonStyles.data}>
              {/* {data.country} */}
            </Text>
            <Text style={[commonStyles.title, commonStyles.mb15]}>
              {intl.formatMessage({ id: 'IpCheckStep.country' })}
            </Text>
          </View>
        </View>
        {/* proxy usage banner */}
        {/* <View style={commonStyles.mb15}> */}
        {/*   <CheckResultLogoPDF type="ipCheck" status={status} /> */}
        {/* </View> */}
      </View>
    </View>
  );
}
