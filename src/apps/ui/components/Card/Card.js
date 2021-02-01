import { Box, Paper } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { TitleBadge, TitleIcon, useStyles } from './Card.styles';

export function Card({
  title,
  text,
  badgeText,
  startIcon,
  endControl,
  endControlBlock,
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Box className={classes.container}>
        {/* Header */}
        <Box className={classes.header}>
          {startIcon
            && <Box className={classes.icon}><TitleIcon icon={startIcon} /></Box>}
          <Box className={classes.titleText}>
            {intl.formatMessage({ id: title })}
          </Box>
          {badgeText
            && <Box><TitleBadge label={intl.formatMessage({ id: badgeText })} /></Box>}
        </Box>

        {/* Body */}
        <Box ml={startIcon && 2.5} className={classes.body}>
          <Box className={classes.text}>
            {intl.formatMessage({ id: text })}
          </Box>
          {endControl && !endControlBlock
            && <Box className={classes.control}>{endControl}</Box>}
        </Box>
        {endControl && endControlBlock
          && <Box className={classes.control}>{endControl}</Box>}
      </Box>
    </Paper>
  );
}