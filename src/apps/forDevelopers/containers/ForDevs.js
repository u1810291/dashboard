import { Container, FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as RadioOff } from '../../../assets/icon-radio-off.svg';
import { ReactComponent as RadioOn } from '../../../assets/icon-radio-on.svg';
import { LoadableAdapter } from '../../../lib/Loadable.adapter';
import { selectMerchantFlowsModel } from '../../../state/merchant/merchant.selectors';

export const ForDevs = () => {
  const [selectedFlow] = useState('');
  const merchantFlowList = useSelector(selectMerchantFlowsModel);

  return (
    <Container>
      <Paper>
        <Grid container>
          <Grid item>
            <Grid item>
              Flow
              <FormControl variant="outlined">
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
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
            <Grid item>
              Webhook status
            </Grid>
          </Grid>
          <Grid item>
            <Grid item>
              <Grid item>
                Client secret
              </Grid>
              <Grid item>
                client id
              </Grid>
            </Grid>
            <Grid item>
              <Button>Change secret</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
