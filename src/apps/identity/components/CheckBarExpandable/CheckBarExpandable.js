import { Box } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { CheckBarIconsMap } from 'apps/identity/components/CheckBarFlat/CheckBar.icons';
import { getStepStatus, LEGACY_ERROR, SYSTEM_ERROR } from 'models/Step.model';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { CheckBarIcon } from '../CheckBarIcon/CheckBarIcon';
import { CheckStepDetails } from '../CheckStepDetails/CheckStepDetails';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, useStyles } from './CheckBarExpandable.styles';
import { StatusMessage } from '../StatusMessage/StatusMessage';

export function CheckBarExpandable({ step }) {
  const intl = useIntl();
  const classes = useStyles();
  const [disabledExpansion, setDisabledExpansion] = useState(false);
  const [expandIcon, setExpandIcon] = useState(null);
  const { id, error, data } = step;
  const [expanded, setExpanded] = useState(`panel-${id}`);
  const statusCode = getStepStatus(step);
  const logo = CheckBarIconsMap[id];

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
        <CheckStepDetails data={data} error={error} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
