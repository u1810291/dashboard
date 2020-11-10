import { Box, Grid, Container, Paper, Typography, Tooltip, useMediaQuery } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLoad, merchantCreateFlow } from 'state/merchant/merchant.actions';
import { selectMerchantFlowList } from 'state/merchant/merchant.selectors';
import { useIntl } from 'react-intl';
import Button from '@material-ui/core/Button';
import { FiPlusCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useStyles } from './VerificationFlows.styles';
import { FlowsTable } from '../../components/FlowsTable/FlowsTable';
import { flowNameValidator } from '../../validators/FlowName.validator';
import { AddNewFlowModal } from '../../components/AddNewFlowDialog/AddNewFlowModal';
import { useOverlay } from '../../../overlay';
import { MAX_NUMBER_OF_PRODUCTS } from '../../models/Product.model';
import { notification } from '../../../../components/notification';

export function VerificationFlows() {
  const classes = useStyles();
  const intl = useIntl();
  const [createOverlay] = useOverlay();
  const dispatch = useDispatch();
  const history = useHistory();
  const merchantFlowList = useSelector(selectMerchantFlowList);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isButtonDisabled = (merchantFlowList || []).length >= MAX_NUMBER_OF_PRODUCTS;
  const [open, setOpen] = useState(isButtonDisabled && isMobile);

  useEffect((() => {
    dispatch(appLoad());
  }), [dispatch]);

  useEffect(() => {
    setOpen(isButtonDisabled && isMobile);
  }, [isMobile, isButtonDisabled]);

  const submitNewFlow = useCallback(async (text) => {
    const duplicate = merchantFlowList.find((item) => item.name === text.trim());
    try {
      await flowNameValidator({ hasDuplicate: !!duplicate, name: text });
      const newFlow = await dispatch(merchantCreateFlow({ name: text.trim() }));
      history.push({
        pathname: `/flows/${newFlow.id}`,
      });
    } catch (e) {
      notification.error(intl.formatMessage({ id: 'VerificationFlow.page.notification.error' }));
    }
  }, [merchantFlowList, dispatch, intl, history]);

  const handleAddNewFlow = useCallback(() => {
    createOverlay(<AddNewFlowModal submitNewFlow={submitNewFlow} />);
  }, [submitNewFlow, createOverlay]);

  const handleOpen = useCallback(() => {
    if (merchantFlowList?.length >= MAX_NUMBER_OF_PRODUCTS) {
      setOpen(true);
    }
  }, [merchantFlowList]);

  const handleClose = useCallback(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <Container key="content" maxWidth="initial">
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
