import { appPalette } from 'apps/theme/app.palette';
import React from 'react';
import { Image, Text, View } from '@react-pdf/renderer';
import { WarningTypes } from 'apps/ui';
import { styles } from './WarningPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { WarningIcons } from '../../assets';

const ColorMap = {
  [WarningTypes.Warning]: appPalette.yellow,
  [WarningTypes.Error]: appPalette.red,
  [WarningTypes.Success]: appPalette.black75,
  [WarningTypes.Checking]: appPalette.whiteblue,
};

export function WarningPDF({ title, label, type = WarningTypes.Warning }: {
  label: string;
  type: WarningTypes;
  title?: string;
}) {
  const Icon = WarningIcons[type];
  const color = ColorMap[type];

  return (
    <View style={styles.root}>
      <View style={styles.icon}>
        <Image src={Icon} />
      </View>
      <View>
        {title && (
          <Text style={color}>
            {title}
          </Text>
        )}
        <Text style={commonStyles.title}>
          {label}
        </Text>
      </View>
    </View>
  );
}
