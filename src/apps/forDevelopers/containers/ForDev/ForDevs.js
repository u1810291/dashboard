import { Box, Container, FormControl, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as RadioOff } from '../../../../assets/icon-radio-off.svg';
import { ReactComponent as RadioOn } from '../../../../assets/icon-radio-on.svg';
import { LoadableAdapter } from '../../../../lib/Loadable.adapter';
import { TabID } from '../../../../models/ForDevelopers.model';
import { selectMerchantFlowsModel } from '../../../../state/merchant/merchant.selectors';
import { ClientDetails } from '../../components/ClientDetails/ClientDetails';
import { IOSPage } from '../../components/IOSPage/IOSPage';
import { TabsMenu } from '../../components/TabsMenu/TabsMenu';

export const ForDevs = () => {
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
            <Grid container direction="column">
              <Grid item>
                Integrations
              </Grid>
              <Grid container direction="row">
                <Grid item xs={3}>
                  <FormControl variant="outlined">
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      onChange={handleSelectedFlow}
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
                <Grid item xs={3}>
                  <Typography>Active</Typography>
                  <Typography> Webhook status</Typography>
                </Grid>
                <Button>
                  <SettingsIcon />
                  Webhooks
                </Button>
                <Button>Mati Documentation</Button>
              </Grid>
            </Grid>
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
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
