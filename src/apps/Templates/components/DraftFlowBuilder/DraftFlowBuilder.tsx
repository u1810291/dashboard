import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
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
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useFlowListLoad } from 'apps/FlowList';
import { ProductTypes } from 'models/Product.model';
import { FlowInfoContainer, FlowProductsGraph, FlowBuilderProductDetails, ProductListSidebar, selectFlowBuilderChangeableFlowModel, selectFlowBuilderSelectedId, flowBuilderChangeableFlowUpdate, flowBuilderClearStore, flowBuilderChangeableFlowLoad, flowBuilderCreateEmptyFlow, selectFlowBuilderHaveUnsavedChanges, flowBuilderProductListInit } from 'apps/flowBuilder';
import { selectCurrentTemplateModel } from 'apps/Templates/store/Templates.selectors';
import { createDraftFromTemplate, getTemplate, toggleUnsavedChanges } from 'apps/Templates';
import { updateCurrentFlowId } from 'state/merchant/merchant.actions';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { useOverlay } from 'apps/overlay';
import { useFormatMessage } from 'apps/intl';
import { TemplatesModal } from 'apps/SolutionCatalog';
import { dagreGraphService, WorkflowBuilderIntegrationDetails } from 'apps/WorkflowBuilder';
import { ITemplate, DRAFT_INITIAL_STATE } from '../../model/Templates.model';
import { TemplateSelectAttemptModal } from '../TemplateSelectAttemptModal/TemplateSelectAttemptModal';
import { SaveAndPublishDraft } from '../SaveAndPublishDraft/SaveAndPublishDraft';
import { useStyles } from './DraftFlowBuilder.styles';

export function DraftFlowBuilder() {
  const classes = useStyles();
  const [createOverlay, closeOverlay] = useOverlay();
  const dispatch = useDispatch();
  const formatMessage = useFormatMessage();
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
  const haveUnsavedChanges = useSelector<any, boolean>(selectFlowBuilderHaveUnsavedChanges);

  useProduct();

  const isEditMode = !!id;

  useEffect(() => {
    if (isBuilderInitialized || !flowListModel.isLoaded || changeableFlowModel.isLoading) return;

    if (!isEditMode) {
      dispatch(flowBuilderClearStore());
      setIsBuilderInitiazed(true);
      const hasTemplate = currentTemplateModel.value;
      if (hasTemplate) {
        // create flow from templates modal
        dispatch(createDraftFromTemplate());
      } else {
        dispatch(flowBuilderCreateEmptyFlow(formatMessage, DRAFT_INITIAL_STATE));
        // create flow from 'new metamap' button
      }
    }

    if (isEditMode) {
      setIsBuilderInitiazed(true);
      dispatch(updateCurrentFlowId(id));
      if (LoadableAdapter.isPristine(changeableFlowModel)) {
        dispatch(flowBuilderClearStore());
        dispatch(flowBuilderChangeableFlowLoad());
      }
    }
  }, [dispatch, currentTemplateModel, isBuilderInitialized, id, isEditMode, changeableFlowModel, flowListModel.isLoaded]);

  useEffect(() => {
    dagreGraphService.createGraph();
  }, [dispatch, id, asMerchantId, flowListModel.isLoaded, changeableFlowModel]);

  const handleProductUpdate = useCallback((patch: Partial<IFlow>) => {
    dispatch(flowBuilderChangeableFlowUpdate(patch));
  }, [dispatch]);

  useEffect(() => {
    if (!isBuilderInitialized || !currentTemplateModel.value || !haveUnsavedChanges) return;

    const handleChangeTemplate = async () => {
      await dispatch(flowBuilderChangeableFlowUpdate({ ...currentTemplateModel.value.flow, _id: undefined }));
      await dispatch(flowBuilderProductListInit(currentTemplateModel.value.flow, true));
      closeOverlay();
    };
    handleChangeTemplate();
  }, [currentTemplateModel, isBuilderInitialized, dispatch, haveUnsavedChanges]);

  const handleTemplateCardClick = useCallback(async (templateId: string) => {
    await dispatch(getTemplate(templateId));
    dispatch(toggleUnsavedChanges(true));
  }, [dispatch]);

  const handleTemplatesContinueButtonClick = useCallback(() => {
    closeOverlay();
    createOverlay(<TemplatesModal handleCardClick={handleTemplateCardClick} />);
  }, [closeOverlay, createOverlay, handleTemplateCardClick]);

  const handleTemplatesButtonClick = useCallback(() => {
    if (haveUnsavedChanges) {
      createOverlay(<TemplateSelectAttemptModal handleContinue={handleTemplatesContinueButtonClick} closeOverlay={closeOverlay} />);
    } else {
      createOverlay(<TemplatesModal handleCardClick={handleTemplateCardClick} />);
    }
  }, [closeOverlay, createOverlay, handleTemplateCardClick, haveUnsavedChanges]);

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
              <Box mb={2} display="flex">
                <SaveAndPublishDraft isEditMode={isEditMode} />
                <Button
                  className={classes.templatesButton}
                  variant="outlined"
                  disableElevation
                  onClick={handleTemplatesButtonClick}
                >
                  {formatMessage('Templates.builder.templatesButton')}
                </Button>
              </Box>
            </Grid>
            <Grid container item xs={12} justify="space-between">
              <Grid item xs={12} container direction="column" alignItems="center" className={classes.content}>
                <Box mb={1.5} color="common.black90" fontWeight="bold" textAlign="center">
                  {formatMessage('FlowBuilder.graph.usersFlow')}
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
              text={formatMessage('FlowBuilder.placeholder')}
              icon={<EmptyBuilderIcon />}
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
}
