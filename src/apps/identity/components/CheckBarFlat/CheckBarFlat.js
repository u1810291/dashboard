import { Box, Typography } from '@material-ui/core';
import { CheckBarTip } from 'apps/identity/components/CheckBarTip/CheckBarTip';
import clsx from 'clsx';
import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useStatusLabel } from '../../hooks/step.hook';
import { useStatusColors } from '../StatusColors.styles';
import { CheckBarIconsMap } from './CheckBar.icons';
import { MyTooltip, useStyles } from './CheckBar.styles';

export function CheckBarFlat({ step, isShowExtra = true, tipPosition = 'top' }) {
  const intl = useIntl();
  const colors = useStatusColors();
  const classes = useStyles();
  const statusLabel = useStatusLabel(step);

  return (
    <Box className={clsx(classes.root, classes[step.checkStatus])}>
      {/* main status */}
      <Box display="flex">
        {/* icon */}
        <Box className={clsx(classes.icon, colors[step.checkStatus])}>
          {CheckBarIconsMap[step.id]}
        </Box>
        {/* content */}
        <Box flexGrow={1} ml={1} overflow="hidden">
          <Box display="flex">
            <Box fontWeight={600} flexGrow="1">
              {intl.formatMessage({ id: `SecurityCheckStep.${step.id}.title` })}
            </Box>
            {isShowExtra && step.labelExtra && (
              <Box ml={1} flexGrow={0}>
                {intl.formatMessage({ id: step.labelExtra, defaultMessage: ' ' }, step.labelExtraData)}
              </Box>
            )}
          </Box>
          {step.subtitle && (
            <Box mt={1} fontStyle="italic">
              {intl.formatMessage({ id: step.subtitle, defaultMessage: ' ' })}
            </Box>
          )}
          <Box mt={step.sub ? 0 : 1}>
            {statusLabel}
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
      </Box>
      {/* sub statuses */}
      {step.sub && step.sub.map((item) => (
        <Box className={clsx(classes.subStatus, classes[item.checkStatus])} key={item.id}>
          {/* icon */}
          <Box className={clsx(classes.subIcon, colors[item.checkStatus])}>
            {CheckBarIconsMap[item.id]}
          </Box>
          {/* content */}
          <Box flexGrow={1} ml={1} overflow="hidden">
            <Box display="flex">
              <Box flexGrow="1">
                <Typography color="textSecondary" variant="body1">
                  {intl.formatMessage({ id: `SecurityCheckStep.${item.id}.title` })}
                </Typography>
              </Box>
              {isShowExtra && item.labelExtra && (
                <Box ml={1} flexGrow={0}>
                  <Typography color="textSecondary" variant="body1">
                    {intl.formatMessage({ id: item.labelExtra, defaultMessage: ' ' }, item.labelExtraData)}
                  </Typography>
                </Box>
              )}
            </Box>
            {item.subtitle && (
              <Box mt={0.5} fontStyle="italic">
                {intl.formatMessage({ id: item.subtitle, defaultMessage: ' ' })}
              </Box>
            )}
            <Typography color="textSecondary" variant="body2">
              {intl.formatMessage({
                id: item.error
                  ? `SecurityCheckStep.${item.error.code}`
                  : `SecurityCheckStep.${item.id}.${item.checkStatus}`,
                defaultMessage: intl.formatMessage({ id: `SecurityCheckStep.${item.checkStatus}` }),
              })}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
