import { Box, Button, Container, FormControl, Grid, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import { PageLoader } from 'apps/layout';
import { useOverlay } from 'apps/overlay';
import { CopyToClipboard } from 'apps/ui';
import { QATags } from 'models/QA.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronDown, FiExternalLink, FiSettings } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentFlowId } from 'state/merchant/merchant.actions';
import { selectCurrentFlowId, selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { useFlowListLoad } from 'apps/FlowList';
import { DOCS_BASE_URL } from 'models/Documentation.model';
import { useStyles } from './ForDev.styles';
import { ClientDetails } from '../../components/ClientDetails/ClientDetails';
import { ForDevsWebhookModal } from '../../components/ForDevsWebhookModal/ForDevsWebhookModal';
import { Information } from '../../components/Information/Information';
import { TabsMenu } from '../../components/TabsMenu/TabsMenu';
import { TabID } from '../../models/ForDevelopers.model';

export function ForDevs() {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(TabID.Api);
  const merchantFlowList = useSelector(selectMerchantFlowsModel);
  const currentFlowId = useSelector(selectCurrentFlowId);
  const [selectedFlow, setSelectedFlow] = useState(currentFlowId);
  const [createOverlay] = useOverlay();
  const [fade, setFade] = useState(true);
  const flowListModel = useFlowListLoad();

  useEffect((() => {
    setSelectedFlow(currentFlowId);
  }), [currentFlowId, selectedFlow]);

  const handleTabChange = useCallback((newValue) => {
    setSelectedTab(newValue);
  }, []);

  const handleSelect = useCallback(async (event) => {
    const id = event.target.value;
    if (currentFlowId !== id) {
      try {
        setFade(false);
        setSelectedFlow(id);
        await dispatch(updateCurrentFlowId(id));
        setFade(true);
      } catch (error) {
        setFade(true);
        console.error(error);
      }
    }
  }, [dispatch, currentFlowId]);

  const handleOpenWebhookModal = useCallback(() => {
    createOverlay(<ForDevsWebhookModal />);
  }, [createOverlay]);

  const handleRedirect = useCallback(() => {
    window.open(DOCS_BASE_URL, '_blank');
  }, []);

  return (
    <Container maxWidth={false}>
      <Box pt={{ xs: 2, lg: 4 }}>
        <Box mb={2}>
          <ClientDetails />
        </Box>
        <Paper>
          <Box p={2}>
            <Box mb={{ xs: 4, lg: 2 }}>
              <Typography variant="h5">
                {intl.formatMessage({ id: 'forDevs.integrations' })}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <FormControl variant="outlined" fullWidth>
                  {flowListModel.isLoaded ? (
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      onChange={handleSelect}
                      IconComponent={FiChevronDown}
                      className={classes.select}
                      value={selectedFlow}
                      data-qa={QATags.Integration.FlowSelector}
                    >
                      {merchantFlowList.value.map((item) => (
                        <MenuItem
                          key={item.id}
                          value={item.id}
                          checked={selectedFlow === item.id}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <PageLoader />
                  )}
                </FormControl>
              </Grid>
              <Grid item container xs={12} lg={8} className={classes.wrapper}>
                <Grid item container xs={12} lg={4} direction="column" justify="center">
                  <Box maxWidth="100%">
                    <Typography variant="subtitle2">
                      <CopyToClipboard text={currentFlowId} qa={QATags.Integration.FlowId.Copy}>
                        <code data-qa={QATags.Integration.FlowId.Value}>{currentFlowId}</code>
                      </CopyToClipboard>
                    </Typography>
                  </Box>
                  <Box color="common.black75">
                    {intl.formatMessage({ id: 'forDevs.flowId' })}
                  </Box>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    className={classes.buttonWebhook}
                    onClick={handleOpenWebhookModal}
                    data-qa={QATags.Webhook.Configure}
                  >
                    <FiSettings />
                    {intl.formatMessage({ id: 'forDevs.webhook.button' })}
                  </Button>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Button
                    onClick={handleRedirect}
                    variant="contained"
                    fullWidth
                    className={classes.buttonDocument}
                    data-qa={QATags.Integration.Doc.Mati}
                  >
                    {intl.formatMessage({ id: 'forDevs.documentation.button' })}
                    <FiExternalLink />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Grid container className={classes.tabsItemsWrapper}>
            <Grid item container direction="column" xs={12} lg={3} className={classes.tabsWrapper}>
              <Box px={{ xs: 2, lg: 1 }} pt={{ xs: 0, lg: 1 }} pb={{ xs: 3, lg: 0 }}>
                <TabsMenu selectedId={selectedTab} onClick={handleTabChange} />
              </Box>
            </Grid>
            <Fade in={fade} timeout={fade && 1000}>
              <Grid item xs={12} lg={9}>
                <Box p={{ xs: 2, lg: 4 }} height="100%">
                  <Information selectedPage={selectedTab} />
                </Box>
              </Grid>
            </Fade>
          </Grid>
        </Paper>
      </Box>
      {!merchantFlowList.isLoaded && (<PageLoader />)}
    </Container>
  );
}
