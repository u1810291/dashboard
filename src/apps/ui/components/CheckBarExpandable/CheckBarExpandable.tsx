import { Box } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { WarningBadge } from 'apps/ui/components/WarningBadge/WarningBadge';
import { ReactComponent as IconData } from 'assets/icon-identity-data.svg';
import { ReactComponent as IconDone } from 'assets/icon-identity-done.svg';
import { ReactComponent as IconError } from 'assets/icon-identity-error.svg';
import { ReactComponent as IconLoad } from 'assets/icon-load.svg';
import { LEGACY_ERROR, StepStatus, SYSTEM_ERROR } from 'models/Step.model';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { CheckBarIcon } from '../CheckBarIcon/CheckBarIcon';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, useStyles } from './CheckBarExpandable.styles';

const IconStatuses = {
  [StepStatus.Success]: <CheckBarIcon key="check-bar-icon" icon={<IconDone />} />,
  [StepStatus.Failure]: <CheckBarIcon key="check-bar-icon" icon={<IconError />} />,
  [StepStatus.Incomplete]: <CheckBarIcon key="check-bar-icon" icon={<IconData />} />,
  [StepStatus.Checking]: <CheckBarIcon key="check-bar-icon" icon={<IconLoad />} />,
};

export function CheckBarExpandable({ step, children, title, isOpenByDefault = false, isNoBadge = false }: {
  step: any;
  children?: React.ReactElement;
  title?: string;
  isOpenByDefault?: boolean;
  isNoBadge?: boolean;
}) {
  const intl = useIntl();
  const classes = useStyles();
  const [disabledExpansion, setDisabledExpansion] = useState(false);
  const [expandIcon, setExpandIcon] = useState(null);
  const { id, error } = step;
  const [expanded, setExpanded] = useState<boolean>(isOpenByDefault);
  const isChecking = step.checkStatus === StepStatus.Checking;

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
    step.checkStatus,
    setDisabledExpansion,
    setExpandIcon,
    error,
    disabledExpansion,
    isChecking,
  ]);

  const handleChange = (_, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <>
      {!isChecking && (
        <ExpansionPanel
          key={id}
          expanded={expanded}
          onChange={handleChange}
          disabled={false}
        >
          <ExpansionPanelSummary
            className={step.checkStatus === StepStatus.Failure ? 'error' : ''}
            expandIcon={expandIcon}
            aria-controls={`panel-${id}-content`}
            id={`panel-${id}-header`}
          >
            {IconStatuses[step.checkStatus]}
            <Box key="check-bar-title" className={classes.labelContainer}>
              <Box className={classes.label}>
                <Box fontWeight={600}>
                  {intl.formatMessage({
                    id: title || `SecurityCheckStep.${id}.title`,
                    defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${step.checkStatus}` }),
                  })}
                </Box>
              </Box>
            </Box>
            {!isNoBadge && step.checkStatus === StepStatus.Failure && <Box className={classes.warning}><WarningBadge /></Box>}
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
