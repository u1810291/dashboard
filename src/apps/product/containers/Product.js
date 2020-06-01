import { Box, Container, Grid, Fade } from '@material-ui/core';
import { Configuration } from 'apps/configuration';
import { AdditionalChecks } from 'apps/checks';
import { Integration } from 'apps/integration/Integration';
import { ProductTabs } from 'apps/product/Product.model';
import { Tab } from 'components';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLoad } from 'state/merchant/merchant.actions';
import { selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { VerificationFlowMenu } from '../components/VerificationFlowMenu/VerificationFlowMenu';
import { VerificationFlowHeader } from '../components/VerificationFlowHeader/VerificationFlowHeader';
// import { VerificationFlowSettings } from '../components/VerificationFlowSettings/VerificationFlowSettings';
import { DemoButton } from '../components/DemoButton/DemoButton';
import { useStyles } from './Product.styles';
import Footer from '../Footer';

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
      <Box mt={2} mb={7}>
        <Grid container spacing={2} justify="space-between" className={classes.gridContainer}>
          <Grid item className={classes.leftBlock}>
            <VerificationFlowMenu setFade={setFade} />
          </Grid>
          <Grid item className={classes.middleBlock}>
            <Fade in={fade} timeout={200}>
              <VerificationFlowHeader />
            </Fade>
            {/* <VerificationFlowSettings /> */}
            <Box mt={2}>
              <Fade in={fade} timeout={200}>
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
              </Fade>
            </Box>
          </Grid>
          <Grid item className={classes.rightBlock}>
            <DemoButton />
          </Grid>
        </Grid>
      </Box>
    </Container>,
    <Footer key="footer" />,
  ];
}
