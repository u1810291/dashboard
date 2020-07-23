import { Box } from '@material-ui/core';
import { appPalette } from 'apps/theme/app.palette';
import React from 'react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { WarningSize, WarningTypes } from '../../models/Warning.model';
import { useStyles } from './Warning.styles';

const IconMap = {
  [WarningTypes.Warning]: FiAlertCircle,
  [WarningTypes.Success]: FiCheckCircle,
  [WarningTypes.Error]: FiAlertCircle,
};

const ColorMap = {
  [WarningTypes.Warning]: {
    color: appPalette.orange,
    text: appPalette.black,
  },
  [WarningTypes.Error]: {
    color: appPalette.red,
    text: appPalette.red,
  },
  [WarningTypes.Success]: {
    color: appPalette.green,
    text: appPalette.green,
  },
};

export function Warning({ label, type = WarningTypes.Warning, size = WarningSize.Normal }) {
  const classes = useStyles();

  const Icon = IconMap[type];
  const style = ColorMap[type];

  return (
    <Box className={classes.root} borderColor={style.color}>
      <Box className={classes.icon}>
        <Icon size={size} color={style.color} />
      </Box>
      <Box className={classes.content} color={style.text}>
        {label}
      </Box>
    </Box>
  );
}
