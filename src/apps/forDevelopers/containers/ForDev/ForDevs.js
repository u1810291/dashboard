import { Paper, Box, Button, Container, Grid, FormControl, Radio, Select, MenuItem, Typography } from '@material-ui/core';
import { FiSettings, FiExternalLink, FiChevronDown } from 'react-icons/fi';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { ReactComponent as RadioOff } from '../../../../assets/icon-radio-off.svg';
import { ReactComponent as RadioOn } from '../../../../assets/icon-radio-on.svg';
import { LoadableAdapter } from '../../../../lib/Loadable.adapter';
import { TabID } from '../../../../models/ForDevelopers.model';
import { selectMerchantFlowsModel } from '../../../../state/merchant/merchant.selectors';
import { ClientDetails } from '../../components/ClientDetails/ClientDetails';
import { IOSPage } from '../../components/IOSPage/IOSPage';
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

  return (
    <Container>
      <Box pt={{ xs: 2, lg: 4 }}>
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
          <Grid container>
            <Grid container direction="column" xs={3}>
              <TabsMenu selected={selectedTab} onClick={handleTabChange} />
            </Grid>
            <Grid container xs={9}>
              {selectedTab === TabID.IOS && <IOSPage />}
              {selectedTab === TabID.API && (<Grid>API</Grid>)}
              {selectedTab === TabID.DIRECT_LINK && (<Grid>Direct Link</Grid>)}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};
