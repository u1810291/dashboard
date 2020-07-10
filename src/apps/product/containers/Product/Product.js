import { Box, CircularProgress, Container, Fade, Grid } from '@material-ui/core';
import { AdditionalChecks } from 'apps/checks';
import { Configuration } from 'apps/configuration';
import { Integration } from 'apps/integration';
import { ProductTabs } from 'apps/product/models/Product.model';
import { Tab } from 'components';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLoad } from 'state/merchant/merchant.actions';
import { selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { DemoButton } from '../../components/DemoButton/DemoButton';
import { Footer } from '../../components/Footer/Footer';
import { VerificationFlowHeader } from '../../components/VerificationFlowHeader/VerificationFlowHeader';
import { VerificationFlowMenu } from '../../components/VerificationFlowMenu/VerificationFlowMenu';
import { useStyles } from './Product.styles';

export function Product() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeTabIndex, setActiveTab] = useState(0);
  const [fade, setFade] = useState(true);
  const merchantFlowList = useSelector(selectMerchantFlowsModel);

  useEffect((() => {
    dispatch(appLoad());
  }), [dispatch]);

  const changeActiveTabHandler = (tabIndex) => {
    const newTab = ProductTabs[tabIndex];
    if (newTab.mixPanelEvent) {
      trackEvent(newTab.mixPanelEvent);
    }
    setActiveTab(tabIndex);
  };

  if (!merchantFlowList.isLoaded) {
    return (
      <Box display="flex" alignItems="center" mt={3}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return [
    <Container key="content">
      <Box className={classes.content}>
        <Grid container spacing={2} justify="space-between" className={classes.gridContainer}>
          <Grid item className={classes.leftBlock}>
            <VerificationFlowMenu setFade={setFade} />
          </Grid>
          <Fade in={fade} timeout={200}>
            <Grid item className={classes.middleBlock}>
              <VerificationFlowHeader />
              <Box mt={2}>
                <Tab
                  withAside
                  padding={2}
                  active={activeTabIndex}
                  onClick={changeActiveTabHandler}
                  tabs={ProductTabs}
                  contents={[
                    <Configuration />,
                    <Integration />,
                    <AdditionalChecks />,
                  ]}
                  aside={[]}
                />
              </Box>
            </Grid>
          </Fade>
          <Grid item className={classes.rightBlock}>
            <DemoButton />
          </Grid>
        </Grid>
      </Box>
    </Container>,
    <Footer key="footer" />,
  ];
}
