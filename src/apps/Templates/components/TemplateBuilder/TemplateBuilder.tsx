import { Box, Grid, Paper } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { dagreGraphService } from 'apps/flowBuilder/services/dagreGraph.service';
import { selectProductIsInited, useProduct } from 'apps/Product';
import { Loader, Placeholder } from 'apps/ui';
import { PreviewButton } from 'apps/WebSDKPreview';
import { ReactComponent as EmptyBuilderIcon } from 'assets/empty-flow-builder.svg';
import { IFlow } from 'models/Flow.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useStyles } from './TemplateBuilder.styles';
import { ProductListSidebar } from 'apps/flowBuilder/components/ProductListSidebar/ProductListSidebar';
import { FlowProductsGraph } from 'apps/flowBuilder/components/FlowProductsGraph/FlowProductsGraph';
import { FlowInfoContainer } from 'apps/flowBuilder/components/FlowInfoContainer/FlowInfoContainer';
import { FlowBuilderProductDetails } from 'apps/flowBuilder/components/FlowBuilderProductDetails/FlowBuilderProductDetails';
import { FlowBuilderIntegrationDetails } from 'apps/flowBuilder/components/FlowBuilderIntegrationDetails/FlowBuilderIntegrationDetails';
import { selectFlowBuilderChangeableFlowModel, selectFlowBuilderSelectedId } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { flowBuilderChangeableFlowUpdate, flowBuilderClearStore } from 'apps/flowBuilder/store/FlowBuilder.action';
import { createEmptyFlow } from 'apps/Templates/store/Templates.actions';
import { SaveAndPublishTemplate } from 'apps/Templates/components/SaveAndPublishTemplate/SaveAndPublishTemplate';

export function TemplateBuilder() {
  const dispatch = useDispatch();
  const selectedId = useSelector(selectFlowBuilderSelectedId);
  const changeableFlowModel = useSelector(selectFlowBuilderChangeableFlowModel);
  const isProductInited = useSelector(selectProductIsInited);
  const isBigScreen = useMediaQuery('(min-width:768px)', { noSsr: true });
  const isHoverableScreen = useMediaQuery('(hover:hover) and (pointer:fine)', { noSsr: true });
  const classes = useStyles();
  const intl = useIntl();

  useProduct();

  useEffect(() => {
    dispatch(flowBuilderClearStore());
    dispatch(createEmptyFlow());
  }, [dispatch]);

  useEffect(() => {
    dagreGraphService.createGraph();
  }, []);

  const handleProductUpdate = useCallback((patch: Partial<IFlow>) => {
    dispatch(flowBuilderChangeableFlowUpdate(patch));
  }, [dispatch]);

  if (!isProductInited) {
    return <Loader />;
  }

  return (
    <Box p={2} className={classes.container}>
      {isBigScreen || isHoverableScreen ? (
        <Grid container spacing={2} className={classes.wrapper}>
          <Grid item container direction="column" wrap="nowrap" className={classes.sidebar}>
            <Box className={classes.flowInfo} px={0.5} py={2} mb={2}>
              <Box mb={2}>
                <FlowInfoContainer />
              </Box>
              <Box ml={3}>
                <PreviewButton />
              </Box>
            </Box>
            <ProductListSidebar />
          </Grid>
          <Grid item container direction="column" wrap="nowrap" className={classes.content}>
            <Grid item container justifyContent="flex-end">
              <Box mb={2}>
                <SaveAndPublishTemplate />
              </Box>
            </Grid>
            <Grid container item xs={12} justifyContent="space-between">
              <Grid item xs={12} container direction="column" alignItems="center" className={classes.content}>
                <Box mb={1.5} color="common.black90" fontWeight="bold" textAlign="center">
                  {intl.formatMessage({ id: 'FlowBuilder.graph.usersFlow' })}
                </Box>
                <Grid container direction="column" alignItems="center" className={classes.graph}>
                  <FlowProductsGraph />
                </Grid>
              </Grid>
              <Grid item container direction="column" wrap="nowrap" className={classes.details}>
                {selectedId && (
                <FlowBuilderProductDetails
                  flow={changeableFlowModel.value}
                  productId={selectedId}
                  onUpdate={handleProductUpdate}
                />
                )}
                {!selectedId && (
                <FlowBuilderIntegrationDetails />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Box>
          <Link to={Routes.flow.root} className={classes.buttonBack}>
            <FiChevronLeft fontSize={20} />
          </Link>
          <Paper className={classes.placeholder}>
            <Placeholder
              text={intl.formatMessage({ id: 'FlowBuilder.placeholder' })}
              icon={<EmptyBuilderIcon />}
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
}
