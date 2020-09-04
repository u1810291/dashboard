import React from 'react';
import { Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, useStyles } from './FaqExpandable.styles';

export function FaqExpandable({ answer, children, question }) {
  const classes = useStyles();
  return (
    <Accordion elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        IconButtonProps={{ disableRipple: true }}
      >
        {question && (
        <Typography variant="h5" className={classes.question}>
          {question}
        </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails>{answer || children}</AccordionDetails>
    </Accordion>
  );
}
