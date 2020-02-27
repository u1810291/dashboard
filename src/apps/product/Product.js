import { Box, Container, Grid } from '@material-ui/core';
import { Configuration, MatiButtonAside } from 'apps/configuration';
import { Integration } from 'apps/integration/Integration';
import { ProductTabs } from 'apps/product/Product.model';
import { Tab } from 'components';
import LegalServices from 'fragments/product/legal-services';
import { trackEvent } from 'lib/mixpanel/mixpanel';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { appLoad } from 'state/merchant/merchant.actions';
import { CompanyBar } from './CompanyBar';
import Footer from './Footer';

export function Product() {
  const dispatch = useDispatch();
  const [activeTabIndex, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(appLoad());
  }, [dispatch]);

  const changeActiveTabHandler = (tabIndex) => {
    const newTab = ProductTabs[tabIndex];
    if (newTab.mixPanelEvent) {
      trackEvent(newTab.mixPanelEvent);
    }
    setActiveTab(tabIndex);
  };

  return [
    <Container key="content">
      <Box p={2} mb={6}>
        <Grid container spacing={2} direction="column" wrap="nowrap">
          <Grid item>
            <CompanyBar />
          </Grid>
          <Grid item>
            <Tab
              withAside
              padding={2}
              active={activeTabIndex}
              onClick={changeActiveTabHandler}
              tabs={ProductTabs}
              contents={[
                <Configuration />,
                <Integration />,
                <LegalServices />,
              ]}
              aside={[
                <MatiButtonAside goToComplianceSection={() => changeActiveTabHandler(2)} />,
              ]}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>,
    <Footer key="footer" />,
  ];
}
