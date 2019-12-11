import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Typography,
} from '@material-ui/core';
import { ErrorOutline, ExpandMore } from '@material-ui/icons';
import { getStepStatus } from 'models/Step.model';
import { StatusMessage } from './StatusMessage';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  useStyles,
} from './CheckListExpandable.styles';
import { CheckStepDetails } from './CheckStepDetails';

export function CheckListExpandable({ step: { id, error, status, data } }) {
  const intl = useIntl();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(null);
  const statusCode = getStepStatus(status, error);
  const disabledExpansion = ['SystemError', 'LegacyError'].includes((error || {}).type);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <ExpansionPanel
      key={id}
      expanded={expanded === `panel-${id}`}
      onChange={handleChange(`panel-${id}`)}
      disabled={disabledExpansion}
    >
      <ExpansionPanelSummary
        expandIcon={disabledExpansion ? <ErrorOutline /> : <ExpandMore />}
        aria-controls={`panel-${id}-content`}
        id={`panel-${id}-header`}
      >
        <Typography className={classes.heading}>
          {intl.formatMessage({ id: `SecurityCheckStep.${id}.title` })}
        </Typography>
        <Typography>
          <StatusMessage status={statusCode} error={error} />
        </Typography>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails>
        <CheckStepDetails id={id} data={data} error={error} />
      </ExpansionPanelDetails>

    </ExpansionPanel>
  );
}
