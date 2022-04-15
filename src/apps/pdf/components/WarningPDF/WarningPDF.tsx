import { appPalette } from 'apps/theme/app.palette';
import React from 'react';
import { Image, Text, View } from '@react-pdf/renderer';
import { WarningTypes } from 'apps/ui';
import { styles } from './WarningPDF.styles';
import { WarningIcons } from '../../assets';

const ColorMap = {
  [WarningTypes.Warning]: appPalette.yellow,
  [WarningTypes.ImportantWarning]: appPalette.red,
  [WarningTypes.Error]: appPalette.red,
  [WarningTypes.Success]: appPalette.black75,
  [WarningTypes.Checking]: appPalette.whiteblue,
  [WarningTypes.Notify]: appPalette.whiteblue,
};

export function WarningPDF({ title, label, type = WarningTypes.Warning, isIconExist, isLabelColored }: {
  label: string;
  type: WarningTypes;
  title?: string;
  isLabelColored?: boolean;
  isIconExist?: boolean;
}) {
  const Icon = WarningIcons[type];
  const color = ColorMap[type];

  return (
    <View style={styles.root}>
      {isIconExist && (
        <View style={styles.icon}>
          <Image src={Icon} />
        </View>
      )}
      <View style={styles.content}>
        {!!title && (
          <Text style={{ color }}>
            {title}
          </Text>
        )}
        <Text style={isLabelColored && styles.titleColor}>
          {label}
        </Text>
      </View>
    </View>
  );
}
