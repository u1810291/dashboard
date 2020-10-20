import { Box, Typography } from '@material-ui/core';
import { appPalette } from 'apps/theme/app.palette';
import React from 'react';
import { FiAlertCircle, FiActivity } from 'react-icons/fi';
import { WarningSize, WarningTypes } from '../../models/Warning.model';
import { useStyles } from './Warning.styles';

const IconMap = {
  [WarningTypes.Warning]: FiAlertCircle,
  [WarningTypes.Success]: FiActivity,
  [WarningTypes.Error]: FiActivity,
};

const ColorMap = {
  [WarningTypes.Warning]: {
    color: appPalette.orange,
    titleColor: appPalette.orange,
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

export function Warning({ title, label, type = WarningTypes.Warning, size = WarningSize.Normal }) {
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
        <Box>
          {label}
        </Box>
      </Box>
    </Box>
  );
}
