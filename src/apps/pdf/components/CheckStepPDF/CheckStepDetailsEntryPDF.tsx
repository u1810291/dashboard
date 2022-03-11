import React from 'react';
import { useFormattedValue } from 'lib/formatValue.hook';
import { Image, Text, View } from '@react-pdf/renderer';
import { ChecksWithImage } from 'apps/checks';
import { getMediaURL } from 'lib/client/media';
import { useFormatMessage } from 'apps/intl';
import { includesPattern } from 'lib/string';
import { commonStyles } from '../../PDF.styles';
import { styles as stylesImage } from './CheckStepDetailsEntryPDF.styles';
import { styles } from './CheckStepPDF.styles';

const CheckStepDetailsImagePDF = (label: string, value: string) => (
  <View style={stylesImage.imageWrapper}>
    <Image style={stylesImage.image} src={getMediaURL(value)} />
  </View>
);

export function CheckStepDetailsEntryPDF({ label, value, style, isMarkedAsFailed }: {
  label: string;
  value: any;
  style?: any;
  isMarkedAsFailed?: boolean;
}) {
  const formatMessage = useFormatMessage();
  const formatted = useFormattedValue(label, value, ChecksWithImage, CheckStepDetailsImagePDF);
  return (
    <View style={[styles.card, commonStyles.mb05, style]}>
      {includesPattern(label, ChecksWithImage) ? formatted : (
        <Text style={isMarkedAsFailed ? style.valueEntryFailed : styles.valueEntrySuccess}>{formatted}</Text>
      )}
      <Text style={commonStyles.title}>
        {formatMessage(`identity.field.${label}`, { defaultMessage: label })}
      </Text>
    </View>
  );
}
