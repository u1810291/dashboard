import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { useIntl } from 'react-intl';
import { Box } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { getStepStatus, SYSTEM_ERROR, LEGACY_ERROR } from 'models/Step.model';
import { expandableSteps } from '../../models/CheckBar.model';
import { StatusMessage } from './StatusMessage';
import {
  useStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from './CheckBarExpandable.styles';
import { CheckStepDetails } from '../CheckStepDetails/CheckStepDetails';
import { CheckBarIcon } from '../CheckBarIcon/CheckBarIcon';

export function CheckBarExpandable({ step: { id, error, status, data } }) {
  const intl = useIntl();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(null);
  const [disabledExpansion, setDisabledExpansion] = useState(false);
  const [expandIcon, setExpandIcon] = useState(null);
  const statusCode = getStepStatus(status, error);
  const logo = get(expandableSteps, `${id}.logo`);

  useEffect(() => {
    if (statusCode === 'checking') {
      setDisabledExpansion(true);
      setExpandIcon(null);
    } else {
      const isDisabled = [SYSTEM_ERROR, LEGACY_ERROR].includes((error || {}).type);
      const icon = disabledExpansion ? null : <ExpandMore />;
      setDisabledExpansion(isDisabled);
      setExpandIcon(icon);
    }
  }, [
    statusCode,
    setDisabledExpansion,
    setExpandIcon,
    error,
    disabledExpansion,
  ]);

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
        expandIcon={expandIcon}
        aria-controls={`panel-${id}-content`}
        id={`panel-${id}-header`}
      >
        {[
          <CheckBarIcon key="check-bar-icon" icon={logo} status={statusCode} />,
          <Box key="check-bar-title" className={classes.labelContainer}>
            <Box className={classes.label}>
              <Box fontWeight={600}>{intl.formatMessage({ id: `SecurityCheckStep.${id}.title` })}</Box>
              <StatusMessage status={statusCode} error={error} />
            </Box>
          </Box>,
        ]}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <CheckStepDetails id={id} data={data} error={error} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
