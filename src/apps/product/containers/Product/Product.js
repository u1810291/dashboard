import { Box, Container, Grid } from '@material-ui/core';
import { AdditionalChecks } from 'apps/checks';
import { Configuration } from 'apps/configuration';
import { GovCheckSetup } from 'apps/GovCheck';
import { Integration } from 'apps/integration';
import { Tab } from 'apps/ui';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Page404 } from 'apps/layout';
import { appLoad, updateCurrentFlowId } from 'state/merchant/merchant.actions';
import { MixPanelEvents } from '../../../../lib/mixpanel/MixPanel.model';
import { QATags } from '../../../../models/QA.model';
import { DemoButton } from '../../components/DemoButton/DemoButton';
import { VerificationFlowHeader } from '../../components/VerificationFlowHeader/VerificationFlowHeader';
import { useStyles } from './Product.styles';
import { selectCurrentFlow } from '../../../../state/merchant/merchant.selectors';

export function Product() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentFlow = useSelector(selectCurrentFlow);

  const [tabs] = useState([
    {
      mixPanelEvent: null,
      label: 'Product.tab.customization',
      qa: QATags.Product.Tab.Configuration,
      body: <Configuration />,
    },
    {
      mixPanelEvent: MixPanelEvents.NavIntegration,
      label: 'Product.tab.integration',
      qa: QATags.Product.Tab.Integration,
      body: <Integration />,
    },
    {
      mixPanelEvent: MixPanelEvents.NavGovChecks,
      label: 'Product.tab.govChecks',
      qa: QATags.Product.Tab.GovChecks,
      body: <GovCheckSetup />,
    },
    {
      mixPanelEvent: null,
      label: 'Product.tab.checks',
      body: <AdditionalChecks />,
    },
  ]);

  useEffect(() => {
    if (currentFlow?.id !== id) {
      dispatch(updateCurrentFlowId(id));
    }
  }, [currentFlow, dispatch, id]);

  useEffect((() => {
    dispatch(appLoad());
  }), [dispatch]);

  if (!currentFlow) {
    return <Page404 />;
  }

  return (
    <Container key="content" maxWidth={false}>
      <Box className={classes.content}>
        <Grid container spacing={2} justify="space-between" alignItems="flex-start" className={classes.gridContainer}>
          <Grid item className={classes.middleBlock}>
            <VerificationFlowHeader />
            <Box mt={2}>
              <Tab tabs={tabs} />
            </Box>
          </Grid>
          <Grid item className={classes.rightBlock}>
            <DemoButton />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
