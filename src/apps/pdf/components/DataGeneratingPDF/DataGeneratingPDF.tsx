import React from 'react';
import { Image, Text, View } from '@react-pdf/renderer';
import { useFormatMessage } from 'apps/intl';
import { commonStyles } from '../../PDF.styles';
import IconDocument from '../../assets/icon-document-undefined.png';
import { styles } from './DataGeneratingPDF.styles';

export function DataGeneratingPDF({ text }: { text?: string }) {
  const formatMessage = useFormatMessage();
  return (
    <View style={styles.wrap}>
      <Image src={IconDocument} style={styles.icon} />
      <Text style={[commonStyles.ml1, styles.title]}>
        {text ?? formatMessage('DataGenerating.label')}
      </Text>
    </View>
  );
}
