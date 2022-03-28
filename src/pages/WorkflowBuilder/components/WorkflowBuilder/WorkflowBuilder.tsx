import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { selectProductIsInited, useMerit } from 'apps/Product';
import { Loader, Placeholder } from 'apps/ui';
import { PreviewButton } from 'apps/WebSDKPreview';
import { ReactComponent as EmptyBuilderIcon } from 'assets/empty-flow-builder.svg';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { useQuery } from 'lib/url';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { dagreGraphService, SaveAndPublish, FlowProductsGraph, FlowInfoContainer, ProductListSidebar, FlowBuilderProductDetails, WorkflowBuilderIntegrationDetails, workflowBuilderChangeableFlowLoad, workflowBuilderChangeableFlowUpdate, workflowBuilderClearStore, workflowBuilderLoadWorkflow, selectWorkflowBuilderChangeableFlowModel, selectWorkflowBuilderLoadedWorkflowModel, selectWorkflowBuilderSelectedId } from 'apps/WorkflowBuilder';
import { IWorkflow } from 'models/Workflow.model';
import { updateCurrentFlowId } from 'pages/WorkflowList';
import { useStyles } from './WorkflowBuilder.styles';

export function WorkflowBuilder() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectedId = useSelector(selectWorkflowBuilderSelectedId);
  const changeableFlowModel = useSelector(selectWorkflowBuilderChangeableFlowModel);
  const loadedWorkflowModel = useSelector(selectWorkflowBuilderLoadedWorkflowModel);
  const isProductInited = useSelector(selectProductIsInited);
  const isBigScreen = useMediaQuery('(min-width:768px)', { noSsr: true });
  const isHoverableScreen = useMediaQuery('(hover:hover) and (pointer:fine)', { noSsr: true });
  const classes = useStyles();
  const intl = useIntl();
  const { asMerchantId } = useQuery();

  useMerit();

  useEffect(() => {
    if (!id || !LoadableAdapter.isPristine(loadedWorkflowModel)) {
      return;
    }
    dispatch(workflowBuilderLoadWorkflow(id));
  }, [dispatch, id, loadedWorkflowModel]);

  useEffect(() => () => {
    dispatch(workflowBuilderClearStore());
  }, [dispatch]);

  useEffect(() => {
    const isChangedId = changeableFlowModel?.value?.id !== id;
    if (loadedWorkflowModel.isLoading || !loadedWorkflowModel.isLoaded) {
      return;
    }
    if (isChangedId) {
      dispatch(updateCurrentFlowId(id));
    }
    if (isChangedId || LoadableAdapter.isPristine(changeableFlowModel)) {
      dispatch(workflowBuilderChangeableFlowLoad());
    }
    dagreGraphService.createGraph();
  }, [dispatch, id, asMerchantId, changeableFlowModel, loadedWorkflowModel.isLoading, loadedWorkflowModel.isLoaded]);

  const handleProductUpdate = useCallback((patch: Partial<IWorkflow>) => {
    dispatch(workflowBuilderChangeableFlowUpdate(patch));
  }, [dispatch]);

  if (!isProductInited && !loadedWorkflowModel.isLoaded) {
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
                <SaveAndPublish />
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
                <WorkflowBuilderIntegrationDetails />
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
