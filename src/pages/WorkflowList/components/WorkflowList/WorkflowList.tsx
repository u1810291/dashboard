import { Box, Container, Grid, Tooltip, Typography, useMediaQuery } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useOverlay } from 'apps/overlay';
import { MAX_NUMBER_OF_FLOWS } from 'models/Flow.model';
// import { Routes } from 'models/Router.model';
import { PageLoader } from 'apps/layout';
import React, { useCallback, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { QATags } from 'models/QA.model';
import { flowNameValidator } from '../../validators/FlowName.validator';
import { AddNewFlowModal } from '../AddNewFlowModal/AddNewFlowModal';
import { selectWorkflowList } from '../../state/workflow.selectors';
import { WorkflowsTable } from '../WorkflowsTable/WorkflowsTable';
import { useWorkflowListLoad } from '../../hooks/loadWorkflows.hook';
import { useStyles } from './WorkflowList.styles';

export function WorkflowListPage() {
  const classes = useStyles();
  const intl = useIntl();
  const [createOverlay] = useOverlay();
  // const dispatch = useDispatch();
  //   const history = useHistory();
  const workflowList = useSelector(selectWorkflowList);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const canAddMoreFlows = (workflowList || []).length >= MAX_NUMBER_OF_FLOWS;
  const [open, setOpen] = useState(canAddMoreFlows && isMobile);
  const workflowListModel = useWorkflowListLoad();

  useEffect(() => {
    setOpen(canAddMoreFlows && isMobile);
  }, [isMobile, canAddMoreFlows]);

  const submitNewFlow = useCallback(async (text) => {
    const value = (text || '').trim();
    const duplicate = workflowList.find((item) => item.name === value);
    await flowNameValidator({ hasDuplicate: !!duplicate, name: value });
    // eslint-disable-next-line no-undef
    // const newFlow = await dispatch(createWorkflow({ name: value })) as unknown as IWorkflow;
    // TODO: (when datails page is complete) redirect to flow details page.
    // history.push({
    //   pathname: `${Routes.workflow.root}/${newFlow.id}`,
    // });
  }, [workflowList]);

  const handleAddNewFlow = useCallback(() => {
    createOverlay(<AddNewFlowModal submitNewFlow={submitNewFlow} />);
  }, [submitNewFlow, createOverlay]);

  const handleOpen = useCallback(() => {
    if (workflowList?.length >= MAX_NUMBER_OF_FLOWS) {
      setOpen(true);
    }
  }, [workflowList]);

  const handleClose = useCallback(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  if (!workflowListModel.isLoaded) {
    return <PageLoader />;
  }

  return (
    <Container key="content" maxWidth={false}>
      <Box pt={{ xs: 2, lg: 4 }}>
        <Box mb={canAddMoreFlows && isMobile ? 5.6 : 0}>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <Box mb={{ xs: 1.4, md: 0 }}>
                <Typography variant="h3">{intl.formatMessage({ id: 'VerificationFlow.page.title' })}</Typography>
              </Box>
            </Grid>
            <Grid item container xs={12} md={6} justifyContent="flex-end" className={classes.buttonWrapper}>
              {workflowList?.length > 0 && (
              <Tooltip
                enterTouchDelay={0}
                placement={isMobile ? 'bottom' : 'left'}
                arrow
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                classes={{
                  tooltip: classes.tooltip,
                  popper: classes.tooltipPopper,
                  arrow: classes.tooltipArrow,
                }}
                title={intl.formatMessage({ id: 'VerificationFlow.page.tooltip' })}
              >
                <span>
                  <Button
                    disabled={canAddMoreFlows}
                    variant="contained"
                    disableElevation
                    onClick={handleAddNewFlow}
                    className={classes.button}
                    data-qa={QATags.Flows.CreateNewFlowButton}
                  >
                    <FiPlus />
                    {intl.formatMessage({ id: 'VerificationFlow.page.button' })}
                  </Button>
                </span>
              </Tooltip>
              )}
            </Grid>
          </Grid>
        </Box>
        <Box py={{ xs: 2, lg: 0 }} className={classes.table}>
          <WorkflowsTable onAddNewFlow={handleAddNewFlow} />
        </Box>
      </Box>
    </Container>
  );
}
