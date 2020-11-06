import { Box, Button, Container, FormControl, Grid, MenuItem, Paper, Radio, Select, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronDown, FiExternalLink, FiSettings } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as RadioOff } from '../../../../assets/icon-radio-off.svg';
import { ReactComponent as RadioOn } from '../../../../assets/icon-radio-on.svg';
import { LoadableAdapter } from '../../../../lib/Loadable.adapter';
import { selectCurrentFlowId, selectMerchantFlowsModel } from '../../../../state/merchant/merchant.selectors';
import { ClientDetails } from '../../components/ClientDetails/ClientDetails';
import { Information } from '../../components/Information/Information';
import { TabsMenu } from '../../components/TabsMenu/TabsMenu';
import { useStyles } from './ForDev.styles';
import { updateCurrentFlowId } from '../../../../state/merchant/merchant.actions';
import { useOverlay } from '../../../overlay';
import { ForDevsWebhookModal } from '../../components/ForDevsWebhookModal/ForDevsWebhookModal';
import { TabID } from '../../../../models/ForDevelopers.model';

export const ForDevs = () => {
  const intl = useIntl();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(TabID.API);
  const merchantFlowList = useSelector(selectMerchantFlowsModel);
  const currentFlowId = useSelector(selectCurrentFlowId);
  const [selectedFlow, setSelectedFlow] = useState(currentFlowId);
  const [createOverlay, closeOverlay] = useOverlay();

  useEffect((() => {
    setSelectedFlow(currentFlowId);
  }), [currentFlowId, selectedFlow]);

  const handleTabChange = useCallback((newValue) => {
    setSelectedTab(newValue);
  }, []);

  const handleSelect = useCallback((event) => {
    const id = event.target.value;
    if (currentFlowId !== id) {
      setSelectedFlow(id);
      dispatch(updateCurrentFlowId(id));
    }
  }, [dispatch, currentFlowId]);

  const handleOpenWebhookModal = useCallback(() => {
    createOverlay(<ForDevsWebhookModal onClose={closeOverlay} />);
  }, [createOverlay, closeOverlay]);

  const handleRedirect = useCallback(() => {
    window.open('https://docs.getmati.com', '_blank');
  }, []);

  return (
    <Container maxWidth="initial">
      <Box pt={{
        xs: 2,
        lg: 4,
      }}
      >
        <Box mb={2}>
          <ClientDetails />
        </Box>
        <Paper>
          <Box p={2}>
            <Box mb={{
              xs: 4,
              lg: 2,
            }}
            >
              <Typography variant="h5">
                {intl.formatMessage({ id: 'forDevs.integrations' })}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={4}>
                <FormControl variant="outlined" fullWidth>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    onChange={handleSelect}
                    IconComponent={FiChevronDown}
                    className={classes.select}
                    value={selectedFlow}
                  >
                    {!LoadableAdapter.isPristine(merchantFlowList) && merchantFlowList.value.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        checked={selectedFlow === item.id}
                        control={<Radio color="default" checkedIcon={<RadioOn />} icon={<RadioOff />} />}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item container xs={12} lg={8} className={classes.wrapper}>
                <Grid item xs={12} lg={4}>
                  {/* Future Feature */}
                  {/* <Typography>Active</Typography>
                  <Box color="common.black75">{intl.formatMessage({ id: 'forDevs.webhook.status' })}</Box> */}
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    className={classes.buttonWebhook}
                    onClick={handleOpenWebhookModal}
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
              <Box
                px={{
                  xs: 2,
                  lg: 1,
                }}
                pt={{
                  xs: 0,
                  lg: 1,
                }}
                pb={{
                  xs: 3,
                  lg: 0,
                }}
              >
                <TabsMenu selected={selectedTab} onClick={handleTabChange} />
              </Box>
            </Grid>
            <Grid item xs={12} lg={9}>
              <Box
                p={{
                  xs: 2,
                  lg: 4,
                }}
                height="100%"
              >
                <Information selectedPage={selectedTab} />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};
