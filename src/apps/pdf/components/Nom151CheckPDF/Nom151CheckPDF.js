import React from 'react';
import { useIntl } from 'react-intl';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './Nom151CheckPDF.styles';
import { commonStyles } from '../../PDF.styles';

export function Nom151CheckPDF({ data = {}, nom151FileContent = '...' }) {
  const intl = useIntl();

  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>
        {intl.formatMessage({ id: 'Product.checks.nom151Check.title' })}
      </Text>
      <View style={styles.wrapper}>
        <Text style={styles.link}>
          {nom151FileContent}
        </Text>
      </View>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>
        {intl.formatMessage({ id: 'Product.checks.nom151Check.id' })}
      </Text>
      <View style={styles.wrapper}>
        <Text style={commonStyles.code}>
          {data.hash}
        </Text>
      </View>
    </View>
  );
}
