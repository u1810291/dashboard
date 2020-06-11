import { Image, Text, View } from '@react-pdf/renderer';
import AlertPNG from 'apps/pdf/assets/alert-circle.png';
import SuccessPNG from 'apps/pdf/assets/check-circle.png';
import { styles } from 'apps/pdf/PDF.styles';
import React from 'react';

export function PDFChip({ label, isSuccess }) {
  const borderColor = isSuccess ? styles.chipSuccess : styles.chipError;
  const textColor = isSuccess ? styles.success : styles.error;
  const icon = isSuccess ? SuccessPNG : AlertPNG;

  return (
    <View style={[styles.chip, borderColor]}>
      <View style={styles.icon}>
        <Image style={styles.icon} src={icon} />
      </View>
      <Text style={[styles.normal, textColor, styles.ml05]}>
        {label}
      </Text>
    </View>
  );
}
