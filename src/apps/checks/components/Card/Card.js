import React from 'react';
import { useIntl } from 'react-intl';
import { Box, Paper } from '@material-ui/core';
import { useStyles, TitleBadge, TitleIcon } from './Card.styles';

export function Card({
  title,
  text,
  badgeText,
  startIcon,
  endControl,
}) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Box className={classes.container}>
        {/* Header */}
        <Box className={classes.header}>
          { startIcon
            && <Box className={classes.icon}><TitleIcon icon={startIcon} /></Box> }
          <Box className={classes.titleText}>
            {intl.formatMessage({ id: title })}
          </Box>
          { badgeText
            && <Box><TitleBadge label={intl.formatMessage({ id: badgeText })} /></Box> }
        </Box>

        {/* Body */}
        <Box ml={startIcon && 2.5} className={classes.body}>
          <Box className={classes.text}>
            {intl.formatMessage({ id: text })}
          </Box>
          { endControl
            && <Box className={classes.control}>{endControl}</Box> }
        </Box>
      </Box>
    </Paper>
  );
}
