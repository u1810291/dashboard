import React from 'react';
import { View } from '@react-pdf/renderer';
import { styles as localStyles } from './BoxBorderedPDF.styles';

export function BoxBorderedPDF({ styles, children }: {
  children: React.ReactNode;
  styles?: Record<string, string | number> | Record<string, string | number>[];
}) {
  return (
    <View style={[...(Array.isArray(styles) ? styles : [styles]), localStyles.wrapper]}>
      {children}
    </View>
  );
}
