import { Box } from '@material-ui/core';
import { CheckBarTip } from 'apps/identity/components/DocumentStep/CheckBar/components/CheckBarTip/CheckBarTip';
import { DocumentMxSteps } from 'models/Step.model';
import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useStatusColors } from '../../../StatusColors.styles';
import { CheckBarIcon } from '../CheckBarIcon/CheckBarIcon';
import { CheckBarIconsMap } from './CheckBar.icons';
import { BoxCheckBarRounded, MyTooltip, useStyles } from './CheckBar.styles';

export function CheckBarFlat({ step, isShowExtra = true, tipPosition = 'top' }) {
  const intl = useIntl();
  const colors = useStatusColors();
  const classes = useStyles();

  return (
    <BoxCheckBarRounded status={step.checkStatus}>
      {/* icon */}
      <Box flexShrink={0} className={colors[step.checkStatus]}>
        <CheckBarIcon icon={CheckBarIconsMap[step.id]} status={step.checkStatus} />
      </Box>
      {/* content */}
      <Box flexGrow={1} ml={1} overflow="hidden">
        <Box display="flex">
          <Box fontWeight={600} flexGrow="1">
            {intl.formatMessage({ id: `SecurityCheckStep.${step.id}.title`, defaultMessage: ' ' })}
          </Box>
          {isShowExtra && step.labelExtra && (
            <Box ml={1} flexGrow={0}>
              {intl.formatMessage({ id: step.labelExtra, defaultMessage: ' ' }, step.labelExtraData)}
            </Box>
          )}
        </Box>
        <Box mt={1}>
          {DocumentMxSteps.includes(step.id)
            ? intl.formatMessage({ id: `SecurityCheckStep.${step.error.code}` })
            : intl.formatMessage({ id: `SecurityCheckStep.${step.id}.${step.checkStatus}`, defaultMessage: ' ' }, step.labelStatusData)}
        </Box>
      </Box>

      {/* tip */}
      {step.isTip && (
        <Box flexShrink={0} ml={1}>
          <MyTooltip
            title={<CheckBarTip step={step} />}
            arrow
            placement={tipPosition}
            className={classes.tooltip}
          >
            <Box component="span"><FiHelpCircle /></Box>
          </MyTooltip>
        </Box>
      )}
    </BoxCheckBarRounded>
  );
}
