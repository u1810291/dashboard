import { Box, Container, Grid } from '@material-ui/core';
import { Configuration } from 'apps/configuration';
import { Integration } from 'apps/integration/Integration';
import { ProductTabs } from 'apps/product/Product.model';
import { Tab } from 'components';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLoad, merchantFlowsLoad } from 'state/merchant/merchant.actions';
import { selectMerchantFlowsModel } from 'state/merchant/merchant.selectors';
import { LoadableAdapter } from 'lib/Loadable.adapter';
// import { CompanyBar } from '../CompanyBar';
import { Spinner } from 'apps/layout';
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
  const merchantFlowList = useSelector(selectMerchantFlowsModel);

  useEffect((() => {
    dispatch(appLoad());
  }), [dispatch]);

  useEffect(() => {
    if (LoadableAdapter.isPristine(merchantFlowList)) {
      dispatch(merchantFlowsLoad());
    }
  }, [dispatch, merchantFlowList]);

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
        <Spinner size="large" />
      </Box>
    );
  }

  return [
    <Container key="content">
      <Box mt={2} mb={7}>
        <Grid container spacing={2} justify="space-between" className={classes.gridContainer}>
          <Grid item className={classes.leftBlock}>
            <VerificationFlowMenu
              flowList={merchantFlowList.value}
            />
          </Grid>
          <Grid item className={classes.middleBlock}>
            <VerificationFlowHeader />
            {/* <VerificationFlowSettings /> */}
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
                ]}
                aside={[]}
              />
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
