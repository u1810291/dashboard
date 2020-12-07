import { appPalette } from 'apps/theme/app.palette';
import React from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import { styles } from './WarningPDF.styles';
import { commonStyles } from '../../PDF.styles';
import { WarningTypes } from '../../../ui/models/Warning.model';
import { WarningIcons } from '../../assets';

const ColorMap = {
  [WarningTypes.Warning]: appPalette.yellow,
  [WarningTypes.Error]: appPalette.red,
  [WarningTypes.Success]: appPalette.black75,
};

export function WarningPDF({ title, label, type = WarningTypes.Warning }) {
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
