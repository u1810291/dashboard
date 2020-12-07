import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { getFileContents } from 'lib/client/checks';
import { Text, View } from '@react-pdf/renderer';
import { styles } from './Nom151CheckPDF.styles';
import { commonStyles } from '../../PDF.styles';

export function Nom151CheckPDF({ data = {} }) {
  const intl = useIntl();
  const [fileContent, setFileContent] = useState('...');
  useEffect(() => {
    async function fetchData() {
      // TODO: do this with identity load
      try {
        const file = await getFileContents(data.publicUrl);
        setFileContent(file.data);
      } catch {
        setFileContent(data.publicUrl);
      }
    }
    fetchData();
  }, [data]);

  return (
    <View style={commonStyles.paper}>
      <Text style={[commonStyles.titleBoldMain, commonStyles.mb15]}>
        {intl.formatMessage({ id: 'Product.checks.nom151Check.title' })}
      </Text>
      <View style={styles.wrapper}>
        <Text style={styles.link}>
          {fileContent}
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
