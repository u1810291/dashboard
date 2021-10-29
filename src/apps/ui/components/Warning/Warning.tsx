import { Box, Link, Typography } from '@material-ui/core';
import { appPalette } from 'apps/theme/app.palette';
import React, { ReactNode } from 'react';
import { FiActivity, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { WarningSize, WarningTypes } from '../../models/Warning.model';
import { useStyles } from './Warning.styles';

const IconMap = {
  [WarningTypes.Warning]: FiAlertCircle,
  [WarningTypes.ImportantWarning]: FiAlertCircle,
  [WarningTypes.Success]: FiActivity,
  [WarningTypes.Error]: FiActivity,
  [WarningTypes.Notify]: FiLoader,
};

const ColorMap = {
  [WarningTypes.Warning]: {
    color: appPalette.yellow,
    titleColor: appPalette.yellow,
    iconColor: appPalette.yellow,
  },
  [WarningTypes.ImportantWarning]: {
    color: appPalette.red,
    titleColor: appPalette.red,
    iconColor: appPalette.red,
  },
  [WarningTypes.Error]: {
    color: appPalette.red,
    titleColor: appPalette.red,
    iconColor: appPalette.red,
  },
  [WarningTypes.Success]: {
    color: appPalette.green,
    titleColor: appPalette.black75,
    iconColor: appPalette.green,
  },
  [WarningTypes.Notify]: {
    color: appPalette.whiteblue,
    titleColor: appPalette.lightblue,
    iconColor: appPalette.lightblue,
  },
};

export function Warning({ title = '', label, type = WarningTypes.Warning, size = WarningSize.Normal, isLabelColored = false, bordered = false, className, filled, linkLabel = '', link = '' }: {
  title?: string;
  label: string | ReactNode;
  type?: WarningTypes;
  size?: WarningSize;
  filled?: boolean;
  className?: string;
  isLabelColored?: boolean;
  bordered?: boolean;
  linkLabel?: string;
  link?: string;
}) {
  const Icon = IconMap[type];
  const style = ColorMap[type];
  const classes = useStyles({ bordered, filled, color: style.color });

  return (
    <Box className={`${classes.root} ${className}`}>
      <Box className={classes.icon}>
        <Icon size={size} color={style.iconColor} />
      </Box>
      <Box className={classes.content}>
        {title && (
          <Typography variant="h4" gutterBottom style={{ color: style.titleColor }}>
            {title}
          </Typography>
        )}
        <Box style={{ color: isLabelColored && style.titleColor }}>
          {label}
          <Link underline="always" href={link}>{linkLabel}</Link>
        </Box>
        <Box style={{ color: isLabelColored && style.titleColor }}>
          <Link href={link}>{linkLabel}</Link>
        </Box>
      </Box>
    </Box>
  );
}
