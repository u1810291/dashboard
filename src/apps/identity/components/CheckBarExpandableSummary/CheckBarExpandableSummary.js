import { Grid, Box, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { FiCheckCircle } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, useStyles } from './CheckBarExpandableSummary.styles';

export function CheckBarExpandableSummary({ title, children }) {
  const classes = useStyles();
  const [expandIcon, setExpandIcon] = useState(null);
  const [expanded, setExpanded] = useState('');

  useEffect(() => {
    const icon = <ExpandMore />;
    setExpandIcon(icon);
  }, [
    setExpandIcon,
  ]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <ExpansionPanel
        expanded={expanded === 'panel'}
        onChange={handleChange('panel')}
        disabled={false}
      >
        <ExpansionPanelSummary
          expandIcon={expandIcon}
          aria-controls="panel-content"
          id="panel-header"
        >
          <Grid container alignItems="center" wrap="nowrap">
            <FiCheckCircle className={classes.labelIcon} />
            <Box ml={1}>
              <Typography className={classes.label} variant="subtitle2">
                {title}
              </Typography>
            </Box>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
}
