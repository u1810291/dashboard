import { Box, Container, Grid, Paper, Tooltip, Typography, useMediaQuery } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { FlowsTable } from 'apps/flows/components/FlowsTable/FlowsTable';
import { useOverlay } from 'apps/overlay';
import { MAX_NUMBER_OF_FLOWS } from 'models/Flow.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { appLoad, merchantCreateFlow } from 'state/merchant/merchant.actions';
import { selectMerchantFlowList } from 'state/merchant/merchant.selectors';
import { QATags } from 'models/QA.model';
import { AddNewFlowModal } from '../../components/AddNewFlowDialog/AddNewFlowModal';
import { flowNameValidator } from '../../validators/FlowName.validator';
import { useStyles } from './VerificationFlows.styles';

export function VerificationFlows() {
  const classes = useStyles();
  const intl = useIntl();
  const [createOverlay] = useOverlay();
  const dispatch = useDispatch();
  const history = useHistory();
  const merchantFlowList = useSelector(selectMerchantFlowList);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isButtonDisabled = (merchantFlowList || []).length >= MAX_NUMBER_OF_FLOWS;
  const [open, setOpen] = useState(isButtonDisabled && isMobile);

  useEffect((() => {
    dispatch(appLoad());
  }), [dispatch]);

  useEffect(() => {
    setOpen(isButtonDisabled && isMobile);
  }, [isMobile, isButtonDisabled]);

  const submitNewFlow = useCallback(async (text) => {
    const value = (text || '').trim();
    const duplicate = merchantFlowList.find((item) => item.name === value);
    await flowNameValidator({ hasDuplicate: !!duplicate, name: value });
    const newFlow = await dispatch(merchantCreateFlow({ name: value }));
    history.push({
      pathname: `${Routes.flows.root}/${newFlow.id}`,
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

  return (
    <Container key="content" maxWidth={false}>
      <Box pt={{ xs: 2, lg: 4 }}>
        <Box mb={isButtonDisabled && isMobile ? 7.6 : 2}>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <Box mb={{ xs: 1.4, md: 0 }}>
                <Typography variant="h3">{intl.formatMessage({ id: 'VerificationFlow.page.title' })}</Typography>
              </Box>
            </Grid>
            <Grid item container xs={12} md={6} justify="flex-end" className={classes.buttonWrapper}>
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
                    disabled={isButtonDisabled}
                    variant="contained"
                    disableElevation
                    onClick={handleAddNewFlow}
                    className={classes.button}
                    data-qa={QATags.Flows.CreateNewFlowButton}
                  >
                    <FiPlusCircle />
                    {intl.formatMessage({ id: 'VerificationFlow.page.button' })}
                  </Button>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Paper className={`${classes.paper}`}>
          <Box py={1} mb={2} className={classes.table}>
            <FlowsTable onAddNewFlow={handleAddNewFlow} />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
