import React from 'react';
import { View } from '@react-pdf/renderer';
import { commonStyles } from '../../PDF.styles';

export function VerificationCheckCardPDF({ children, titleComponent, bottomComponent, noWrap = false }) {
  return (
    <View style={commonStyles.paper} wrap={!noWrap}>
      <View>
        {titleComponent}
        <View>
          {children}
        </View>
      </View>
      <View>{bottomComponent}</View>
    </View>
  );
}
