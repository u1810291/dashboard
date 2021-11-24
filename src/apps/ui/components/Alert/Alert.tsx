import { Box, Typography } from '@material-ui/core';
import { appPalette } from 'apps/theme/app.palette';
import React from 'react';
import { AlertTypes } from '../../models/Alert.model';
import { useStyles } from './Alert.styles';

const ColorMap: Record<AlertTypes, { color: string; textColor: string; padding?: string }> = {
  [AlertTypes.Error]: {
    color: appPalette.lightRed,
    textColor: appPalette.red,
  },
  [AlertTypes.TransparentError]: {
    color: 'transparent',
    textColor: appPalette.red,
    padding: '0px',
  },
  [AlertTypes.TrasparentSuccess]: {
    color: 'transparent',
    textColor: appPalette.green,
    padding: '0px',
  },
};

export function Alert({ title = '', subTitle = '', type = AlertTypes.Error, textColor, className }: {
  title: string;
  subTitle?: string | React.ReactNode;
  type?: AlertTypes;
  textColor?: string;
  className?: string;
}) {
  const style = ColorMap[type];
  const classes = useStyles({ color: style.color, textColor: textColor || style.textColor, padding: style?.padding });

  return (
    <Box className={`${classes.root} ${className}`}>
      <Box className={classes.content}>
        <Typography variant="body1" gutterBottom className={classes.title}>
          {title}
        </Typography>
        {subTitle && (
          <Box className={classes.subTitle}>
            {subTitle}
          </Box>
        )}
      </Box>
    </Box>
  );
}
