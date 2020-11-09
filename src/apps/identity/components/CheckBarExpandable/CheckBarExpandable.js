import { Box } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { getStepStatus, LEGACY_ERROR, SYSTEM_ERROR, StepStatus } from 'models/Step.model';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as IconDone } from 'assets/icon-identity-done.svg';
import { ReactComponent as IconError } from 'assets/icon-identity-error.svg';
import { ReactComponent as IconData } from 'assets/icon-identity-data.svg';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { CheckBarIcon } from '../CheckBarIcon/CheckBarIcon';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, useStyles } from './CheckBarExpandable.styles';

const IconStatuses = {
  [StepStatus.Success]: <CheckBarIcon key="check-bar-icon" icon={<IconDone />} />,
  [StepStatus.Failure]: <CheckBarIcon key="check-bar-icon" icon={<IconError />} />,
  [StepStatus.Incomplete]: <CheckBarIcon key="check-bar-icon" icon={<IconData />} />,
  [StepStatus.Checking]: <CheckBarIcon key="check-bar-icon" icon={<IconLoad />} />,
};

export function CheckBarExpandable({ step, children, title }) {
  const intl = useIntl();
  const classes = useStyles();
  const [disabledExpansion, setDisabledExpansion] = useState(false);
  const [expandIcon, setExpandIcon] = useState(null);
  const { id, error } = step;
  const [expanded, setExpanded] = useState('');
  const statusCode = getStepStatus(step);
  const isChecking = statusCode === StepStatus.Checking;

  useEffect(() => {
    if (isChecking) {
      setDisabledExpansion(true);
    } else {
      const isDisabled = [SYSTEM_ERROR, LEGACY_ERROR].includes((error || {}).type);
      setDisabledExpansion(isDisabled);
    }
    const icon = <ExpandMore />;
    setExpandIcon(icon);
  }, [
    statusCode,
    setDisabledExpansion,
    setExpandIcon,
    error,
    disabledExpansion,
    isChecking,
  ]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {!isChecking && (
        <ExpansionPanel
          key={id}
          expanded={expanded === `panel-${id}`}
          onChange={handleChange(`panel-${id}`)}
          disabled={false}
        >
          <ExpansionPanelSummary
            className={statusCode === StepStatus.Failure ? 'error' : ''}
            expandIcon={expandIcon}
            aria-controls={`panel-${id}-content`}
            id={`panel-${id}-header`}
          >
            {IconStatuses[statusCode]}
            <Box key="check-bar-title" className={classes.labelContainer}>
              <Box className={classes.label}>
                <Box fontWeight={600}>
                  {intl.formatMessage({
                    id: title || `SecurityCheckStep.${id}.title`,
                    defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${statusCode}` }),
                  })}
                </Box>
              </Box>
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {children}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
      {isChecking && (
        <Box display="flex" alignItems="center" width="100%" mb={1} py={0.4} pr={0.8} pl={0.2}>
          <Box width={17}>
            <CheckBarIcon key="check-bar-icon" icon={<IconLoad />} />
          </Box>
          <Box key="check-bar-title" className={classes.labelContainer}>
            <Box className={classes.label}>
              <Box fontWeight={600}>
                {' '}
                {intl.formatMessage({
                  id: title || `SecurityCheckStep.${id}.title`,
                  defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${statusCode}` }),
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
