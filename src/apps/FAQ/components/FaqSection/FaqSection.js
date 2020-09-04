import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './FaqSection.styles';

export function FaqSection({ children, footer, Icon, title }) {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paper}>
      <Box display="flex" flexDirection="row" justifyContent="stretch" flexWrap="nowrap">
        <Box className={classes.colWithIcon}>
          <Box flexGrow={0}>
            <Icon className={classes.icon} />
          </Box>
          <Box flexGrow={1} />
        </Box>
        <Box>
          <Grid container spacing={1} alignItems="flex-start" className={classes.section}>
            <Grid item xs>
              <Typography component="h3" className={classes.sectionCaption}>
                {title}
              </Typography>
              {children}
              {footer && (
              <Typography className={classes.footer}>
                { footer }
              </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}
