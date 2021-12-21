import React from 'react';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled } from './CustomWatchlistValidatedInputsError.styles';

export const CustomWatchlistValidatedInputsError = () => (
  <AccordionStyled>
    <AccordionSummaryStyled
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>Error 1</Typography>
    </AccordionSummaryStyled>
    <AccordionDetailsStyled>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
        sit amet blandit leo lobortis eget.
      </Typography>
    </AccordionDetailsStyled>
  </AccordionStyled>
);
