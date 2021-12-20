import { Box, Container, Grid } from '@material-ui/core';
import { AdditionalChecks } from 'apps/checks';
import { Configuration } from 'apps/configuration';
import { useFlowListLoad, VerificationFlowHeader } from 'apps/FlowList';
import { GovCheckSetup } from 'apps/GovCheck';
import { Page404 } from 'apps/layout';
import { Tabs, Loader } from 'apps/ui';
import { DemoButton } from 'apps/WebSDKPreview';
import { QATags } from 'models/QA.model';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateCurrentFlowId } from 'state/merchant/merchant.actions';
import { selectCurrentFlow } from 'state/merchant/merchant.selectors';
import { useStyles } from './Product.styles';

export function Product() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentFlow = useSelector(selectCurrentFlow);
  const flowListModel = useFlowListLoad();

  const [tabs] = useState([
    {
      id: 'config',
      label: 'Product.tab.customization',
      qa: QATags.Product.Tab.Configuration,
      body: <Configuration />,
    },
    {
      id: 'govCheck',
      label: 'Product.tab.govChecks',
      qa: QATags.Product.Tab.GovChecks,
      body: <GovCheckSetup />,
    },
    {
      id: 'additionalChecks',
      label: 'Product.tab.checks',
      body: <AdditionalChecks />,
    },
  ]);

  useEffect(() => {
    if (currentFlow?.id !== id) {
      dispatch(updateCurrentFlowId(id));
    }
  }, [currentFlow, dispatch, id]);

  if (!flowListModel.isLoaded) {
    return <Loader />;
  }

  if (!currentFlow) {
    return <Page404 />;
  }

  // noinspection PointlessBooleanExpressionJS
  return (
    <Container maxWidth={false}>
      <Box className={classes.content}>
        <Grid container spacing={2} justify="space-between" alignItems="flex-start" className={classes.gridContainer}>
          <Grid item className={classes.middleBlock}>
            <VerificationFlowHeader />
            <Box mt={2}>
              <Tabs tabs={tabs} />
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
