import React from 'react';
import { Box, Paper } from '@material-ui/core';
import { useStyles, TitleBadge, TitleIcon } from './Card.styles';

export function Card({
  title = '',
  body,
  badgeText,
  startIcon,
  endControl,
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Box className={classes.container}>
        {/* Header */}
        <Box className={classes.header}>
          { startIcon
            && <Box className={classes.icon}><TitleIcon icon={startIcon} /></Box> }
          <Box className={classes.titleText}>{title}</Box>
          { badgeText
            && <Box><TitleBadge label={badgeText} /></Box> }
        </Box>

        {/* Body */}
        <Box ml={startIcon && 2.5} className={classes.body}>
          <Box className={classes.text}>{body}</Box>
          { endControl
            && <Box className={classes.control}>{endControl}</Box> }
        </Box>
      </Box>
    </Paper>
  );
}
