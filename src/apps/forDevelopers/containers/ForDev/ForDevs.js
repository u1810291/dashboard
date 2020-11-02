import { Box, Button, Container, FormControl, Grid, MenuItem, Paper, Radio, Select, Typography } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { FiChevronDown, FiExternalLink, FiSettings } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { ReactComponent as RadioOff } from '../../../../assets/icon-radio-off.svg';
import { ReactComponent as RadioOn } from '../../../../assets/icon-radio-on.svg';
import { LoadableAdapter } from '../../../../lib/Loadable.adapter';
import { MobileSDKTabs, TabID } from '../../../../models/ForDevelopers.model';
import { selectMerchantFlowsModel } from '../../../../state/merchant/merchant.selectors';
import { ClientDetails } from '../../components/ClientDetails/ClientDetails';
import { MobileSDKs } from '../../components/MobileSDKs/MobileSDKs';
import { TabsMenu } from '../../components/TabsMenu/TabsMenu';
import { useStyles } from './ForDev.styles';

export const ForDevs = () => {
  const intl = useIntl();
  const classes = useStyles();
  const [selectedFlow, setSelectedFlow] = useState('');
  const [selectedTab, setSelectedTab] = useState(null);
  const merchantFlowList = useSelector(selectMerchantFlowsModel);

  const handleTabChange = useCallback((newValue) => {
    setSelectedTab(newValue);
  }, []);

  const handleSelectedFlow = useCallback((event) => {
    setSelectedFlow(event.target.value);
  }, []);

  const checkIsMobileTab = useCallback((id) => MobileSDKTabs.includes(id), []);

  return (
    <Container>
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
            <Box mb={2}>
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
                    onChange={handleSelectedFlow}
                    IconComponent={FiChevronDown}
                    className={classes.select}
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
                  <Typography>Active</Typography>
                  <Box color="common.black75">{intl.formatMessage({ id: 'forDevs.webhook.status' })}</Box>
                </Grid>
                <Grid item xs={6} lg={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    className={classes.buttonWebhook}
                  >
                    <FiSettings />
                    {intl.formatMessage({ id: 'forDevs.webhook.button' })}
                  </Button>
                </Grid>
                <Grid item xs={6} lg={4}>
                  <Button
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
          <Grid container className={classes.tabsWrapper}>
            <Grid item container direction="column" xs={3}>
              <Box px={1} pt={1}>
                <TabsMenu selected={selectedTab} onClick={handleTabChange} />
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box p={4} height="100%">
                {selectedTab === TabID.API && (<Grid>API</Grid>)}
                {checkIsMobileTab(selectedTab) && <MobileSDKs selectedTab={selectedTab} />}
                {selectedTab === TabID.DIRECT_LINK && (<Grid>Direct Link</Grid>)}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};
