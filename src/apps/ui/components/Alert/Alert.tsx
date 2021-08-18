import { Box, Typography } from '@material-ui/core';
import { appPalette } from 'apps/theme/app.palette';
import React from 'react';
import { AlertTypes } from '../../models/Alert.model';
import { useStyles } from './Alert.styles';

const ColorMap = {
  [AlertTypes.Error]: {
    color: appPalette.lightRed,
    textColor: appPalette.red,
  },
};

export function Alert({ title = '', subTitle = '', type = AlertTypes.Error, className }: {
  title: string;
  subTitle?: string | React.ReactNode;
  type?: AlertTypes;
  className?: string;
}) {
  const style = ColorMap[type];
  const classes = useStyles({ color: style.color, textColor: style.textColor });

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
