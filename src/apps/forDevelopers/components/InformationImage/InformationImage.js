import { Box, Grid } from '@material-ui/core';
import ImageApi from 'assets/information-api.svg';
import ImageButton from 'assets/information-button.svg';
import ImageLink from 'assets/information-link.svg';
import ImageResult from 'assets/information-result.svg';
import ImageIosFlow from 'assets/information-user-ios.png';
import ImageMobileFlow from 'assets/information-user-mobile.png';
import ImageWebFlow from 'assets/information-user-web.svg';
import { ReactComponent as Arrow } from 'assets/line-arrow.svg';
import cn from 'classnames';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { InformationImageTypes } from '../../models/ForDevelopers.model';
import { useStyles } from './InformationImage.styles';

const images = {
  [InformationImageTypes.Mobile]: {
    entryPoint: ImageButton,
    flow: ImageMobileFlow,
  },
  [InformationImageTypes.Ios]: {
    entryPoint: ImageButton,
    flow: ImageIosFlow,
  },
  [InformationImageTypes.Web]: {
    entryPoint: ImageButton,
    flow: ImageWebFlow,
  },
  [InformationImageTypes.DirectLink]: {
    entryPoint: ImageLink,
    flow: ImageWebFlow,
  },
  [InformationImageTypes.Api]: {
    entryPoint: ImageApi,
    flow: ImageWebFlow,
  },
  [InformationImageTypes.Android]: {
    entryPoint: ImageButton,
    flow: ImageMobileFlow,
  },
};

export function InformationImage({ type = InformationImageTypes.Mobile }) {
  const intl = useIntl();
  const classes = useStyles();
  const ImageFlow = images[type].flow;
  const ImageEntryPoint = images[type].entryPoint;

  const getImageFlowClassName = useCallback(() => {
    if (type === InformationImageTypes.Mobile || type === InformationImageTypes.Ios || type === InformationImageTypes.Android) {
      return classes.mobileFlow;
    }
    return classes.webFlow;
  }, [classes, type]);

  return (
    <Grid container spacing={1} className={classes.wrapper}>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justify="center"
        xs={12}
        lg={3}
        className={cn({ [classes.wrapperApi]: type === InformationImageTypes.Api })}
      >
        <Box mt="auto">
          <img
            className={cn({
              [classes.imageResult]: type === InformationImageTypes.Api,
              [classes.imageEntryPoint]: type !== InformationImageTypes.Api,
            })}
            src={ImageEntryPoint}
            alt=""
          />
        </Box>
        <Box
          pt={1}
          minHeight={{ xs: 'auto', lg: 40 }}
          mt="auto"
          color="common.black75"
          align="center"
          fontSize={12}
          fontWeight="bold"
        >
          {intl.formatMessage({ id: `forDevs.informationPage.image.${type}.first` })}
        </Box>
      </Grid>
      <Grid item container xs={12} lg={1} alignItems="center" justify="center">
        <Box
          mt={{ xs: 2, lg: 0 }}
          mb={{ xs: 2, lg: 5 }}
          className={classes.arrow}
        >
          <Arrow />
        </Box>
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justify="center"
        xs={12}
        lg={3}
        className={cn({ [classes.wrapperApiFlow]: type === InformationImageTypes.Api })}
      >
        <Box mt="auto">
          <img src={ImageFlow} alt="" className={getImageFlowClassName()} />
        </Box>
        <Box
          pt={1}
          minHeight={{ xs: 'auto', lg: 40 }}
          mt="auto"
          color="common.black75"
          align="center"
          fontSize={12}
          fontWeight="bold"
        >
          {intl.formatMessage({ id: 'forDevs.informationPage.image.user' })}
        </Box>
      </Grid>
      <Grid item container xs={12} lg={1} alignItems="center" justify="center">
        <Box
          mt={{ xs: 2, lg: 0 }}
          mb={{ xs: 2, lg: 5 }}
          className={classes.arrow}
        >
          <Arrow />
        </Box>
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justify="center"
        xs={12}
        lg={4}
        className={cn({ [classes.wrapperApi]: type === InformationImageTypes.Api })}
      >
        <Box mt="auto">
          <img className={classes.imageResult} src={ImageResult} alt="" />
        </Box>
        <Box
          pt={1}
          minHeight={{ xs: 'auto', lg: 40 }}
          mt="auto"
          color="common.black75"
          align="center"
          fontSize={12}
          fontWeight="bold"
        >
          {intl.formatMessage({ id: `forDevs.informationPage.image.${type}.result` })}
        </Box>
      </Grid>
    </Grid>
  );
}
