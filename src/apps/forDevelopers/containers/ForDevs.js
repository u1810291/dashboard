import { Container, FormControl, IconButton, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import { VisibilityOff } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as RadioOff } from '../../../assets/icon-radio-off.svg';
import { ReactComponent as RadioOn } from '../../../assets/icon-radio-on.svg';
import { LoadableAdapter } from '../../../lib/Loadable.adapter';
import { TabID } from '../../../models/ForDevelopers.model';
import { selectMerchantFlowsModel } from '../../../state/merchant/merchant.selectors';
import { selectUserId } from '../../user/state/user.selectors';
import { TabsMenu } from '../components/TabsMenu/TabsMenu';

export const ForDevs = () => {
  const [selectedFlow, setSelectedFlow] = useState('');
  const [selectedTab, setSelectedTab] = useState(null);
  const merchantFlowList = useSelector(selectMerchantFlowsModel);
  const clientId = useSelector(selectUserId);

  const handleTabChange = useCallback((event) => {
    setSelectedTab(event.target.value);
  }, []);

  const handleSelectedFlow = useCallback((event) => {
    setSelectedFlow(event.target.value);
  }, []);

  return (
    <Container>
      <Paper>
        <Grid container justify="space-between">
          <Grid container xs={6}>
            <Typography>
              Client Details
            </Typography>
          </Grid>
          <Grid container xs={6}>
            <Grid item>
              <Typography>
                {clientId}
              </Typography>
              <IconButton>
                <VisibilityOff />
              </IconButton>
              client id
            </Grid>
            <Grid item>
              <Typography>5e9576d8ac2c70001ca9ee3d</Typography>
              <IconButton>
                <VisibilityOff />
              </IconButton>
              <IconButton>
                <VisibilityOff />
              </IconButton>
              <Grid item>
                <Typography>Client secret</Typography>
                <IconButton>
                  <VisibilityOff />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper>
        <Grid container direction="column">
          <Grid item>
            Integrations
          </Grid>
          <Grid container direction="row">
            <Grid item xs={3}>
              <Typography>Flow</Typography>
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
            <TabsMenu onChange={handleTabChange} />
          </Grid>
          {selectedTab === TabID.API && (<Grid>API</Grid>)}
          {selectedTab === TabID.SDK && (<Grid>SDK</Grid>)}
          {selectedTab === TabID.DIRECT_LINK && (<Grid>Direct Link</Grid>)}
        </Grid>
      </Paper>
    </Container>
  );
};
