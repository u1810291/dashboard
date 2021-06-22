import { selectFlowBuilderChangeableFlow } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import React from 'react';
import { Box, Grid, Button } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { FiTrash2 } from 'react-icons/fi';
import { StepStatusList } from 'apps/ui/components/StepStatusList/StepStatusList';
import { FlowInfo } from '../FlowInfo/FlowInfo';
import { FlowSettingsSwitches } from '../FlowSettingsSwitches/FlowSettingsSwitches';
import { stepStatusesStub } from '../../models/FlowBuilder.model';
import { useStyles } from './FlowSettings.styles';

export function FlowSettings() {
  const intl = useIntl();
  const classes = useStyles();
  const { id: flowId } = useSelector(selectFlowBuilderChangeableFlow);

  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12}>
        <Box color="common.black90" fontWeight="bold">
          {intl.formatMessage({ id: 'FlowBuilder.settings.title.settings' })}
        </Box>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box mb={3}>
          <FlowInfo />
        </Box>
        <Box mb={3}>
          <Box color="common.black90" mb={0.5}>{flowId}</Box>
          <Box color="common.black75">{intl.formatMessage({ id: 'FlowBuilder.settings.title.flowId' })}</Box>
        </Box>
        <FlowSettingsSwitches />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box p={2} className={classes.wrapper}>
          <Box mb={2} color="common.black90" fontWeight="bold">
            {`${intl.formatMessage({ id: 'FlowBuilder.settings.title.outputChecks' })}:`}
          </Box>
          <StepStatusList steps={stepStatusesStub} />
        </Box>
      </Grid>
      <Grid container item xs={12} className={classes.buttonsWrapper}>
        <Button variant="outlined" className={classNames(classes.button, classes.buttonDelete)}>
          <FiTrash2 fontSize={17} />
          <Box ml={1}>
            {intl.formatMessage({ id: 'FlowBuilder.settings.button.delete' })}
          </Box>
        </Button>
        <Button className={classNames(classes.button, classes.buttonSave)}>
          {intl.formatMessage({ id: 'FlowBuilder.settings.button.save' })}
        </Button>
      </Grid>
    </Grid>
  );
}
