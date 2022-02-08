import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { dagreGraphService, FlowInfoContainer, FlowProductsGraph, FlowBuilderProductDetails, FlowBuilderIntegrationDetails, ProductListSidebar, selectFlowBuilderChangeableFlowModel, selectFlowBuilderSelectedId, flowBuilderChangeableFlowUpdate, flowBuilderClearStore, flowBuilderCreateEmptyFlow } from 'apps/flowBuilder';
import { selectProductIsInited, useProduct } from 'apps/Product';
import { Loader, Placeholder } from 'apps/ui';
import { PreviewButton } from 'apps/WebSDKPreview';
import { ReactComponent as EmptyBuilderIcon } from 'assets/empty-flow-builder.svg';
import { IFlow } from 'models/Flow.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Loadable } from 'models/Loadable.model';
import { SaveAndPublishTemplate } from 'apps/Templates';
import { useFormatMessage } from 'apps/intl';
import { ProductTypes } from 'models/Product.model';
import { ITemplate } from '../../model/Templates.model';
import { clearCurrentTemplate, prepareTemplateToEdit, getTemplate } from '../../store/Templates.actions';
import { selectCurrentTemplateModelValue, selectCurrentTemplateModel } from '../../store/Templates.selectors';
import { useStyles } from './TemplateBuilder.styles';

export function TemplateBuilder() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedId = useSelector<any, ProductTypes>(selectFlowBuilderSelectedId);
  const changeableFlowModel = useSelector<any, Loadable<IFlow>>(selectFlowBuilderChangeableFlowModel);
  const isProductInited = useSelector<any, boolean>(selectProductIsInited);
  const isBigScreen = useMediaQuery('(min-width:768px)', { noSsr: true });
  const isHoverableScreen = useMediaQuery('(hover:hover) and (pointer:fine)', { noSsr: true });
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const currentTemplateModel = useSelector<any, Loadable<ITemplate>>(selectCurrentTemplateModel);
  const currentTemplate = useSelector<any, ITemplate>(selectCurrentTemplateModelValue);
  const [isBuilderInitialized, setIsBuilderInitiazed] = useState<boolean>(false);

  useProduct();

  const isEditMode = !!id;

  useEffect(() => {
    async function init() {
      if (isEditMode) {
        if (!isBuilderInitialized) {
          setIsBuilderInitiazed(true);
          dispatch(flowBuilderClearStore());
          dispatch(clearCurrentTemplate());
          await dispatch(getTemplate(id));
          dispatch(prepareTemplateToEdit());
        }
      } else {
        dispatch(clearCurrentTemplate());
        dispatch(flowBuilderClearStore());
        dispatch(flowBuilderCreateEmptyFlow());
      }
    }
    init();
  }, [dispatch, isEditMode, id, currentTemplate, isBuilderInitialized]);

  useEffect(() => {
    dagreGraphService.createGraph();
  }, []);

  const handleProductUpdate = useCallback((patch: Partial<IFlow>) => {
    dispatch(flowBuilderChangeableFlowUpdate(patch));
  }, [dispatch]);

  if (!isProductInited || (currentTemplateModel.isLoading && isEditMode)) {
    return <Loader />;
  }

  return (
    <Box p={2} className={classes.container}>
      {isBigScreen || isHoverableScreen ? (
        <Grid container spacing={2} className={classes.wrapper}>
          <Grid item container direction="column" wrap="nowrap" className={classes.sidebar}>
            <Box className={classes.flowInfo} px={0.5} py={2} mb={2}>
              <Box mb={2}>
                <FlowInfoContainer isTemplate />
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
                <SaveAndPublishTemplate isEditMode={isEditMode} />
              </Box>
            </Grid>
            <Grid container item xs={12} justifyContent="space-between">
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
              text={formatMessage('FlowBuilder.placeholder')}
              icon={<EmptyBuilderIcon />}
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
}
