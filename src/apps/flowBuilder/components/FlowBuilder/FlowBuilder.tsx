import { Box, Grid, Paper } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { selectProductIsInited, useProduct } from 'apps/Product';
import { Loader, Placeholder } from 'apps/ui';
import { SoftLaunchBanner } from 'apps/ui/components/SoftLaunchSwitch/SoftLaunchBanner';
import { SoftLaunchBanners } from 'apps/ui/models/SoftLaunchBanner.model';
import { PreviewButton } from 'apps/WebSDKPreview/components/PreviewButton/PreviewButton';
import { ReactComponent as EmptyBuilderIcon } from 'assets/empty-flow-builder.svg';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { IFlow } from 'models/Flow.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { updateCurrentFlowId } from 'state/merchant/merchant.actions';
import { flowBuilderChangeableFlowLoad, flowBuilderChangeableFlowUpdate, flowBuilderProductListClear } from '../../store/FlowBuilder.action';
import { selectFlowBuilderChangeableFlowModel, selectFlowBuilderSelectedId } from '../../store/FlowBuilder.selectors';
import { FlowBuilderIntegrationDetails } from '../FlowBuilderIntegrationDetails/FlowBuilderIntegrationDetails';
import { FlowBuilderProductDetails } from '../FlowBuilderProductDetails/FlowBuilderProductDetails';
import { FlowInfoContainer } from '../FlowInfoContainer/FlowInfoContainer';
import { FlowProductsGraph } from '../FlowProductsGraph/FlowProductsGraph';
import { ProductListSidebar } from '../ProductListSidebar/ProductListSidebar';
import { SaveAndPublish } from '../SaveAndPublish/SaveAndPublish';
import { useStyles } from './FlowBuilder.styles';

export function FlowBuilder() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectedId = useSelector(selectFlowBuilderSelectedId);
  const changeableFlowModel = useSelector(selectFlowBuilderChangeableFlowModel);
  const isProductInited = useSelector(selectProductIsInited);
  const isBigScreen = useMediaQuery('(min-width:1280px)', { noSsr: true });
  const classes = useStyles();
  const intl = useIntl();

  useProduct();

  useEffect(() => () => {
    // clear store on leaving page
    dispatch(flowBuilderProductListClear());
  }, [dispatch]);

  useEffect(() => {
    const isChangedId = changeableFlowModel?.value?.id !== id;
    if (isChangedId) {
      dispatch(updateCurrentFlowId(id));
    }
    if (isChangedId || LoadableAdapter.isPristine(changeableFlowModel)) {
      dispatch(flowBuilderChangeableFlowLoad());
    }
  }, [dispatch, id, changeableFlowModel]);

  const handleProductUpdate = useCallback((patch: Partial<IFlow>) => {
    dispatch(flowBuilderChangeableFlowUpdate(patch));
  }, [dispatch]);

  const handleSoftLaunchSwitch = useCallback(() => {
    // to initiate onbeforeunload (SaveAndPublish)
    window.location.assign(`${Routes.flows.root}/${changeableFlowModel.value.id}`);
  }, [changeableFlowModel.value.id]);

  if (!isProductInited && !changeableFlowModel.isLoaded) {
    return <Loader />;
  }

  return (
    <>
      <SoftLaunchBanner
        id={SoftLaunchBanners.New}
        onClick={handleSoftLaunchSwitch}
      />
      <Box p={2} className={classes.container}>
        {isBigScreen ? (
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
                  <SaveAndPublish />
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
            <Link to={Routes.flows.root} className={classes.buttonBack}>
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
    </>
  );
}
