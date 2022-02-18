import { Box, Grid, Paper } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { selectProductIsInited, useProduct } from 'apps/Product';
import { Loader, Placeholder } from 'apps/ui';
import { PreviewButton } from 'apps/WebSDKPreview';
import { ReactComponent as EmptyBuilderIcon } from 'assets/empty-flow-builder.svg';
import { useQuery } from 'lib/url';
import { IFlow } from 'models/Flow.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect, useState } from 'react';
import { Loadable } from 'models/Loadable.model';
import { FiChevronLeft } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useFlowListLoad } from 'apps/FlowList';
import { ProductTypes } from 'models/Product.model';
import { dagreGraphService, FlowInfoContainer, FlowProductsGraph, FlowBuilderProductDetails, FlowBuilderIntegrationDetails, ProductListSidebar, selectFlowBuilderChangeableFlowModel, selectFlowBuilderSelectedId, flowBuilderChangeableFlowUpdate, flowBuilderClearStore, flowBuilderChangeableFlowLoad, flowBuilderCreateEmptyFlow, selectFlowBuilderChangeableFlow } from 'apps/flowBuilder';
import { useStyles } from './DraftFlowBuilder.styles';
import { ITemplate } from '../../model/Templates.model';
import { selectCurrentTemplateModel } from 'apps/Templates/store/Templates.selectors';
import { createDraftFromTemplate } from 'apps/Templates';
import { SaveAndPublishDraft } from '../SaveAndPublishDraft/SaveAndPublishDraft';
import { updateCurrentFlowId } from 'state/merchant/merchant.actions';
import { LoadableAdapter } from 'lib/Loadable.adapter';

export function DraftFlowBuilder() {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectedId = useSelector<any, ProductTypes>(selectFlowBuilderSelectedId);
  const isProductInited = useSelector<any, boolean>(selectProductIsInited);
  const isBigScreen = useMediaQuery('(min-width:768px)', { noSsr: true });
  const isHoverableScreen = useMediaQuery('(hover:hover) and (pointer:fine)', { noSsr: true });
  const { asMerchantId } = useQuery();
  const flowListModel = useFlowListLoad();
  const currentTemplateModel = useSelector<any, Loadable<ITemplate>>(selectCurrentTemplateModel);
  const [isBuilderInitialized, setIsBuilderInitiazed] = useState<boolean>(false);
  const changeableFlowModel = useSelector<any, Loadable<IFlow>>(selectFlowBuilderChangeableFlowModel);

  useProduct();

  const isEditMode = !!id;

  useEffect(() => {
    if (isBuilderInitialized) return;
    console.log('init flowb ', isBuilderInitialized);
    setIsBuilderInitiazed(true);
    dispatch(flowBuilderClearStore());

    if (!isEditMode) {
      const hasTemplate = currentTemplateModel.value;
      console.log(currentTemplateModel);

      if (hasTemplate) {
        // create flow from templates modal
        dispatch(createDraftFromTemplate());
      } else {
        dispatch(flowBuilderCreateEmptyFlow({ name: 'Untitled' }));
        // create flow from 'new metamap' button
      }
    } else {
      // open  flow from list
      console.log('edit mode ', id, LoadableAdapter.isPristine(changeableFlowModel), changeableFlowModel);
      if (LoadableAdapter.isPristine(changeableFlowModel)) {
        dispatch(updateCurrentFlowId(id));
        dispatch(flowBuilderChangeableFlowLoad());
      }
    }
  }, [dispatch, currentTemplateModel, isBuilderInitialized, id, isEditMode, changeableFlowModel]);

  useEffect(() => {
    dagreGraphService.createGraph();
  }, [dispatch, id, asMerchantId, flowListModel.isLoaded, changeableFlowModel]);

  const handleProductUpdate = useCallback((patch: Partial<IFlow>) => {
    dispatch(flowBuilderChangeableFlowUpdate(patch));
  }, [dispatch]);

  if (!isProductInited && !flowListModel.isLoaded) {
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
            <Grid item container justify="flex-end">
              <Box mb={2}>
                <SaveAndPublishDraft isEditMode={isEditMode} />
              </Box>
            </Grid>
            <Grid container item xs={12} justify="space-between">
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
