import React from 'react';
import { View } from '@react-pdf/renderer';

export function VerificationCheckCardPDF({ children, titleComponent, bottomComponent }) {
  return (
    <View>
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
