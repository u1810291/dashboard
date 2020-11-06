import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as Arrow } from 'assets/line-arrow.svg';
import ImageButton from 'assets/information-link.svg';
import ImageUser from 'assets/information-user-web.svg';
import ImageResult from 'assets/information-result.png';
import { useStyles } from './InformationImage.styles';

export const InformationImageDirect = () => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.wrapper}>
      <Grid item container direction="column" alignItems="center" justify="center" xs={12} lg={3}>
        <Box mt="auto">
          <img className={classes.imageButton} src={ImageButton} alt="" />
        </Box>
        <Box pt={1} minHeight={{ xs: 'auto', lg: 40 }} mt="auto" color="common.black75" align="center" fontSize={12} fontWeight="bold">
          {intl.formatMessage({ id: 'forDevs.informationPage.image.link' })}
        </Box>
      </Grid>
      <Grid item container xs={12} lg={1} alignItems="center" justify="center">
        <Box
          mt={{
            xs: 2,
            lg: 0,
          }}
          mb={{
            xs: 2,
            lg: 5,
          }}
          className={classes.arrow}
        >
          <Arrow />
        </Box>
      </Grid>
      <Grid item container direction="column" alignItems="center" justify="center" xs={12} lg={3}>
        <Box mt="auto">
          <img className={classes.imageUserWeb} src={ImageUser} alt="" />
        </Box>
        <Box pt={1} minHeight={{ xs: 'auto', lg: 40 }} mt="auto" color="common.black75" align="center" fontSize={12} fontWeight="bold">
          {intl.formatMessage({ id: 'forDevs.informationPage.image.user' })}
        </Box>
      </Grid>
      <Grid item container xs={12} lg={1} alignItems="center" justify="center">
        <Box
          mt={{
            xs: 2,
            lg: 0,
          }}
          mb={{
            xs: 2,
            lg: 5,
          }}
          className={classes.arrow}
        >
          <Arrow />
        </Box>
      </Grid>
      <Grid item container direction="column" alignItems="center" justify="center" xs={12} lg={4}>
        <Box mt="auto">
          <img className={classes.imageResult} src={ImageResult} alt="" />
        </Box>
        <Box pt={1} minHeight={{ xs: 'auto', lg: 40 }} mt="auto" color="common.black75" align="center" fontSize={12} fontWeight="bold">
          {intl.formatMessage({ id: 'forDevs.informationPage.image.result.webhook' })}
        </Box>
      </Grid>
    </Grid>
  );
};
