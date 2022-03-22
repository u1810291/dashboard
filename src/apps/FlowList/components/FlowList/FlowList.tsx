import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import { useOverlay } from 'apps/overlay';
import { IFlow, MAX_NUMBER_OF_FLOWS } from 'models/Flow.model';
import { Routes } from 'models/Router.model';
import { PageLoader } from 'apps/layout';
import React, { useCallback, useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useFormatMessage } from 'apps/intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFlowListLoad } from 'apps/FlowList';
import { merchantCreateFlow } from 'state/merchant/merchant.actions';
import { selectMerchantFlowList, selectMerchantTags } from 'state/merchant/merchant.selectors';
import { QATags } from 'models/QA.model';
import { MerchantTags } from 'models/Merchant.model';
import { clearCurrentTemplate, toggleUnsavedChanges } from 'apps/Templates';
import { flowBuilderClearStore } from 'apps/flowBuilder';
import { FlowsTable } from '../FlowsTable/FlowsTable';
import { AddNewFlowModal } from '../AddNewFlowModal/AddNewFlowModal';
import { flowNameValidator } from '../../validators/FlowName.validator';
import { useStyles } from './FlowList.styles';

export function FlowList() {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const [createOverlay] = useOverlay();
  const dispatch = useDispatch();
  const history = useHistory();
  const merchantFlowList = useSelector<any, IFlow[]>(selectMerchantFlowList);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isButtonDisabled = (merchantFlowList || []).length >= MAX_NUMBER_OF_FLOWS;
  const [open, setOpen] = useState<boolean>(isButtonDisabled && isMobile);
  const flowListModel = useFlowListLoad();
  const merchantTags = useSelector(selectMerchantTags);
  const canUseTemplates = merchantTags.includes(MerchantTags.CanUseSolutionTemplates);

  useEffect(() => {
    setOpen(isButtonDisabled && isMobile);
  }, [isMobile, isButtonDisabled]);

  useEffect(() => {
    dispatch(clearCurrentTemplate());
    dispatch(flowBuilderClearStore());
    dispatch(toggleUnsavedChanges(false));
  }, [dispatch]);

  const submitNewFlow = useCallback(async (text) => {
    const value = (text || '').trim();
    const duplicate = merchantFlowList.find((item) => item.name === value);
    await flowNameValidator({ hasDuplicate: !!duplicate, name: value });
    const newFlow = await dispatch(merchantCreateFlow({ name: value })) as IFlow;
    history.push({
      pathname: `${Routes.flow.root}/${newFlow.id}`,
    });
  }, [merchantFlowList, dispatch, history]);

  const handleAddNewFlow = useCallback(() => {
    createOverlay(<AddNewFlowModal submitNewFlow={submitNewFlow} />);
  }, [submitNewFlow, createOverlay]);

  const handleOpen = useCallback(() => {
    if (merchantFlowList?.length >= MAX_NUMBER_OF_FLOWS) {
      setOpen(true);
    }
  }, [merchantFlowList]);

  const handleClose = useCallback(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleBuildMetamapButtonClick = useCallback(() => {
    if (canUseTemplates) {
      history.push(Routes.templates.draftFlow);
    } else {
      handleAddNewFlow();
    }
  }, [history, canUseTemplates, handleAddNewFlow]);

  if (!flowListModel.isLoaded) {
    return <PageLoader />;
  }

  return (
    <Container key="content" maxWidth={false}>
      <Box pt={{ xs: 2, lg: 4 }}>
        <Box mb={isButtonDisabled && isMobile ? 5.6 : 0}>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <Box mb={{ xs: 1.4, md: 0 }}>
                <Typography variant="h3">{formatMessage('VerificationFlow.page.title')}</Typography>
              </Box>
            </Grid>
            <Grid item container xs={12} md={6} justifyContent="flex-end" className={classes.buttonWrapper}>
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
                title={formatMessage('VerificationFlow.page.tooltip')}
              >
                {merchantFlowList?.length > 0 && (
                <span>
                  <Button
                    disabled={isButtonDisabled}
                    variant="contained"
                    disableElevation
                    onClick={handleBuildMetamapButtonClick}
                    className={classes.button}
                    data-qa={QATags.Flows.CreateNewFlowButton}
                  >
                    <FiPlus />
                    {formatMessage('VerificationFlow.page.button')}
                  </Button>
                </span>
                )}
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Box py={{ xs: 2, lg: 0 }} className={classes.table}>
          <FlowsTable onAddNewFlow={handleAddNewFlow} />
        </Box>
      </Box>
    </Container>
  );
}
