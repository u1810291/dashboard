import { Box, Typography } from '@material-ui/core';
import { appPalette } from 'apps/theme/app.palette';
import React from 'react';
import { FiActivity, FiAlertCircle } from 'react-icons/fi';
import { WarningSize, WarningTypes } from '../../models/Warning.model';
import { useStyles } from './Warning.styles';

const IconMap = {
  [WarningTypes.Warning]: FiAlertCircle,
  [WarningTypes.ImportantWarning]: FiAlertCircle,
  [WarningTypes.Success]: FiActivity,
  [WarningTypes.Error]: FiActivity,
};

const ColorMap = {
  [WarningTypes.Warning]: {
    color: appPalette.yellow,
    titleColor: appPalette.yellow,
  },
  [WarningTypes.ImportantWarning]: {
    color: appPalette.red,
    titleColor: appPalette.red,
  },
  [WarningTypes.Error]: {
    color: appPalette.red,
    titleColor: appPalette.red,
  },
  [WarningTypes.Success]: {
    color: appPalette.green,
    titleColor: appPalette.black75,
  },
};

export function Warning({ title, label, type = WarningTypes.Warning, size = WarningSize.Normal, isLabelColored }) {
  const classes = useStyles();

  const Icon = IconMap[type];
  const style = ColorMap[type];

  return (
    <Box className={classes.root}>
      <Box className={classes.icon}>
        <Icon size={size} color={style.color} />
      </Box>
      <Box className={classes.content}>
        {title && (
          <Typography variant="h4" gutterBottom style={{ color: style.titleColor }}>
            {title}
          </Typography>
        )}
        <Box style={{ color: isLabelColored && style.titleColor }}>
          {label}
        </Box>
      </Box>
    </Box>
  );
}
