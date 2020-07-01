import React from 'react';
import { capitalize } from 'inflection';
import { useIntl } from 'react-intl';
import { getStepStatus, StepStatus } from 'models/Step.model';
import { Grid, Paper, Box, Typography } from '@material-ui/core';
import { FiHelpCircle } from 'react-icons/fi';
import { useStyles, MyTooltip, BoxCheckBarRounded } from './CheckBar.styles';
import { useStatusColors } from '../../../StatusColors.styles';
import { CheckBarIcon } from '../CheckBarIcon/CheckBarIcon';
import { IconsMap } from './CheckBar.icons';

export function CheckBarFlat({ step, extras }) {
  const intl = useIntl();
  const colors = useStatusColors();
  const classes = useStyles();
  const checkStatus = getStepStatus(step.status, step.error);
  const hideTipMessage = ![StepStatus.Checking, StepStatus.Success].includes(checkStatus);

  function Tip() {
    return ([
      <Typography variant="h4" gutterBottom key="tip-title">{intl.formatMessage({ id: `SecurityCheckStep.${step.id}.title`, defaultMessage: ' ' })}</Typography>,
      <Box fontSize={12} mt={1} key="tip-body">{intl.formatMessage({ id: `SecurityCheckStep.${step.id}.tip.body`, defaultMessage: ' ' })}</Box>,
      hideTipMessage && (
      <Box fontSize={12} mt={1} key="tip-message">
        <Paper
          elevation={0}
          className={[
            classes.tipMessage,
            classes[`tipMessage${capitalize(checkStatus)}`],
          ].join(' ')}
        >
          {intl.formatMessage({ id: `SecurityCheckStep.${step.id}.tip.message.${checkStatus}`, defaultMessage: ' ' })}
        </Paper>
      </Box>
      ),
    ]);
  }

  return (
    <Grid item xs={12} md={6}>
      <BoxCheckBarRounded status={checkStatus}>
        <Grid container direction="row" spacing={1}>
          <Grid item className={colors[checkStatus]}>
            <CheckBarIcon icon={IconsMap[step.id]} status={checkStatus} />
          </Grid>
          <Grid item className={classes.fluid}>
            <Grid container direction="column" spacing={1}>
              <Grid item container direction="row">
                <Grid item className={classes.fluid}>
                  <Box fontWeight={600} key="title" flexGrow="1">
                    {intl.formatMessage({ id: `SecurityCheckStep.${step.id}.title`, defaultMessage: ' ' })}
                  </Box>
                </Grid>
                {extras && (
                  <Grid item>
                    <Box key="extra">
                      {intl.formatMessage({ id: `SecurityCheckStep.${step.id}.extras`, defaultMessage: ' ' }, extras)}
                    </Box>
                  </Grid>
                )}
              </Grid>
              <Grid item>
                <Box key="status">{intl.formatMessage({ id: `SecurityCheckStep.${step.id}.${checkStatus}`, defaultMessage: ' ' })}</Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <MyTooltip title={<Tip />} arrow placement="top" className={classes.tooltip}>
              <Box component="span"><FiHelpCircle /></Box>
            </MyTooltip>
          </Grid>
        </Grid>
      </BoxCheckBarRounded>
    </Grid>
  );
}
