import { Box } from '@material-ui/core';
import classNames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { WarningBadge } from 'apps/ui/components/WarningBadge/WarningBadge';
import { ReactComponent as IconData } from 'assets/icon-identity-data.svg';
import { ReactComponent as IconDone } from 'assets/icon-identity-done.svg';
import { ReactComponent as IconError } from 'assets/icon-identity-error.svg';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { StepStatus } from 'models/Step.model';
import React, { useState, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { CheckBarIcon } from '../CheckBarIcon/CheckBarIcon';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, useStyles } from './CheckBarExpandable.styles';

const IconStatuses = {
  [StepStatus.Success]: <CheckBarIcon key="check-bar-icon" icon={<IconDone />} />,
  [StepStatus.Failure]: <CheckBarIcon key="check-bar-icon" icon={<IconError />} />,
  [StepStatus.Incomplete]: <CheckBarIcon key="check-bar-icon" icon={<IconData />} />,
  [StepStatus.Checking]: <CheckBarIcon key="check-bar-icon" icon={<IconLoad />} />,
};

export function CheckBarExpandable({ step, children, title, name, isError, isOpenByDefault = false, isNoBadge = false }: {
  step: any;
  isError?: boolean;
  children?: React.ReactElement;
  title?: string;
  name?: string;
  isOpenByDefault?: boolean;
  isNoBadge?: boolean;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const { id } = step;
  const [expanded, setExpanded] = useState<boolean>(isOpenByDefault);
  const isChecking = step.checkStatus === StepStatus.Checking;
  const isManualError = typeof isError === 'boolean';

  const handleChange = useCallback((_, isExpanded: boolean) => {
    setExpanded(isExpanded);
  }, []);

  return (
    <>
      {!isChecking && (
        <ExpansionPanel
          key={id}
          expanded={expanded}
          onChange={handleChange}
        >
          <ExpansionPanelSummary
            className={classNames({
              error: isManualError ? isError : step.checkStatus === StepStatus.Failure,
            })}
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${id}-content`}
            id={`panel-${id}-header`}
          >
            {!isManualError && IconStatuses[step.checkStatus]}
            {isManualError && IconStatuses[isError ? StepStatus.Failure : StepStatus.Success]}
            <Box key="check-bar-title" className={classes.labelContainer}>
              <Box className={classes.label}>
                <Box fontWeight={600}>
                  {!name ? intl.formatMessage({
                    id: title || `SecurityCheckStep.${id}.title`,
                    defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
                  }) : name}
                </Box>
              </Box>
            </Box>
            {!isNoBadge && (isManualError ? isError : step.checkStatus === StepStatus.Failure) && <Box className={classes.warning}><WarningBadge /></Box>}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {children}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
      {isChecking && (
        <Box display="flex" alignItems="center" width="100%" mb={1} py={0.4} px={1}>
          <Box width={17}>
            <CheckBarIcon key="check-bar-icon" icon={<IconLoad />} />
          </Box>
          <Box key="check-bar-title" className={classes.labelContainer}>
            <Box className={classes.label}>
              <Box fontWeight={600}>
                {' '}
                {intl.formatMessage({
                  id: title || `SecurityCheckStep.${id}.title`,
                  defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
