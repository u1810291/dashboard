import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as Arrow } from 'assets/line-arrow.svg';
import ImageButton from 'assets/information-mobile1.png';
import ImageUser from 'assets/information-mobile2.png';
import ImageResult from 'assets/information-mobile3.png';
import { useStyles } from './InformationImage.styles';

export const InformationImageMobile = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.wrapper}>
      <Grid item container direction="column" alignItems="center" justify="center" xs={12} lg={3}>
        <Box mt="auto">
          <img src={ImageButton} alt=""/>
        </Box>
        <Box pt={1} mt="auto" color="common.black75" align="center" fontSize={12} fontWeight="bold">
          {intl.formatMessage({ id: 'forDevs.informationPage.mobile.image.button' })}
        </Box>
      </Grid>
      <Grid item container xs={12} lg={1} alignItems="center" justify="center">
        <Box mt={{ xs: 2, lg: 0 }} mb={{ xs: 2, lg: 5 }} className={classes.arrow}>
          <Arrow />
        </Box>
      </Grid>
      <Grid item container direction="column" alignItems="center" justify="center" xs={12} lg={3}>
        <Box mt="auto">
          <img src={ImageUser} alt=""/>
        </Box>
        <Box pt={1} mt="auto" color="common.black75" align="center" fontSize={12} fontWeight="bold">
          {intl.formatMessage({ id: 'forDevs.informationPage.mobile.image.user' })}
        </Box>
      </Grid>
      <Grid item container xs={12} lg={1} alignItems="center" justify="center">
        <Box mt={{ xs: 2, lg: 0 }} mb={{ xs: 2, lg: 5 }} className={classes.arrow}>
          <Arrow />
        </Box>
      </Grid>
      <Grid item container direction="column" alignItems="center" justify="center" xs={12} lg={4}>
        <Box mt="auto">
          <img src={ImageResult} alt=""/>
        </Box>
        <Box pt={1} mt="auto" color="common.black75" align="center" fontSize={12} fontWeight="bold">
          {intl.formatMessage({ id: 'forDevs.informationPage.mobile.image.result' })}
        </Box>
      </Grid>
    </Grid>
  );
};
