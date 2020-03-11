import React from 'react';
import { capitalize } from 'inflection';
import { useIntl } from 'react-intl';
import { getStepStatus, StepStatus } from 'models/Step.model';
import { Grid, Paper, Box, Typography } from '@material-ui/core';
import { FiHelpCircle } from 'react-icons/fi';
import { useStyles, MyTooltip, CheckBarChip } from './CheckBar.styles';
import { useStatusColors } from '../../../StatusColors.styles';
import { getCheckBarModel } from '../../models/CheckBar.model';
import { CheckBarIcon } from '../CheckBarIcon/CheckBarIcon';

export function CheckBarFlat({ step }) {
  const intl = useIntl();
  const colors = useStatusColors();
  const classes = useStyles();
  const checkStatus = getStepStatus(step.status, step.error);
  const hideTipMessage = ![StepStatus.Checking, StepStatus.Success].includes(checkStatus);
  const { icon, title, status, tipTitle, tipBody, tipMessage } = getCheckBarModel(step.id, checkStatus);

  function Tip() {
    return ([
      <Typography variant="h4" gutterBottom key="tip-title">{intl.formatMessage({ id: tipTitle })}</Typography>,
      <Box fontSize={12} mt={1} key="tip-body">{intl.formatMessage({ id: tipBody })}</Box>,
      hideTipMessage && (
      <Box fontSize={12} mt={1} key="tip-message">
        <Paper
          elevation={0}
          className={[
            classes.tipMessage,
            classes[`tipMessage${capitalize(checkStatus)}`],
          ].join(' ')}
        >
          {intl.formatMessage({ id: tipMessage })}
        </Paper>
      </Box>
      ),
    ]);
  }

  return (
    <Grid item xs={12} md={6}>
      <CheckBarChip
        icon={<CheckBarIcon icon={icon} status={checkStatus} />}
        label={[
          <Box fontWeight={600} key="title">{intl.formatMessage({ id: title })}</Box>,
          <Box className={colors[checkStatus]} key="status">{intl.formatMessage({ id: status })}</Box>,
        ]}
        onDelete={() => {}}
        deleteIcon={(
          <MyTooltip title={<Tip />} arrow placement="top" className={classes.tooltip}>
            <Box component="span"><FiHelpCircle /></Box>
          </MyTooltip>
          )}
      />
    </Grid>
  );
}
