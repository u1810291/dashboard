import { Box, Button, Grid, Paper } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { FlowInfoContainer } from 'apps/flowBuilder/components/FlowInfoContainer/FlowInfoContainer';
import { FlowProductsGraph } from 'apps/flowBuilder/components/FlowProductsGraph/FlowProductsGraph';
import { ProductListSidebar } from 'apps/flowBuilder/components/ProductListSidebar/ProductListSidebar';
import { flowBuilderChangeableFlowLoad, flowBuilderChangeableFlowUpdate, flowBuilderProductListClear, flowBuilderSaveAndPublish } from 'apps/flowBuilder/store/FlowBuilder.action';
import { selectProductIsInited } from 'apps/Product';
import { productInit } from 'apps/Product/store/Product.actions';
import { Loader, Placeholder } from 'apps/ui';
import { PreviewButton } from 'apps/WebSDKPreview/components/PreviewButton/PreviewButton';
import { ReactComponent as EmptyBuilderIcon } from 'assets/empty-flow-builder.svg';
import { LoadableAdapter } from 'lib/Loadable.adapter';
import { IFlow } from 'models/Flow.model';
import { Routes } from 'models/Router.model';
import React, { useCallback, useEffect } from 'react';
import { FiChevronLeft, FiSave } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { updateCurrentFlowId } from 'state/merchant/merchant.actions';
import { selectFlowBuilderChangeableFlowModel, selectFlowBuilderSelectedId } from '../../store/FlowBuilder.selectors';
import { FlowBuilderProductDetails } from '../FlowBuilderProductDetails/FlowBuilderProductDetails';
import { useStyles } from './FlowBuilder.styles';

export function FlowBuilder() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectedId = useSelector(selectFlowBuilderSelectedId);
  // TODO @dkchv: move to selector default value
  const changeableFlowModel = useSelector(selectFlowBuilderChangeableFlowModel);
  const isProductInited = useSelector(selectProductIsInited);
  const isBigScreen = useMediaQuery('(min-width:1280px)', { noSsr: true });
  const classes = useStyles();
  const intl = useIntl();

  useEffect(() => () => {
    // clear store on leaving page
    dispatch(flowBuilderProductListClear());
  }, [dispatch]);

  useEffect(() => {
    if (!isProductInited) {
      dispatch(productInit());
    }
  }, [isProductInited, dispatch, id]);

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

  const handleSaveFlow = useCallback(() => {
    dispatch(flowBuilderSaveAndPublish());
  }, [dispatch]);

  if (!isProductInited && !changeableFlowModel.isLoaded) {
    return <Loader />;
  }

  return (
    <Box px={4} py={2} className={classes.container}>
      {isBigScreen ? (
        <Grid container spacing={2} className={classes.wrapper}>
          <Grid item xs={12} className={classes.sidebar}>
            <Box mb={2}>
              <FlowInfoContainer />
            </Box>
            <ProductListSidebar />
          </Grid>
          <Grid item xs={12} container direction="column" alignItems="center" className={classes.content}>
            <FlowProductsGraph />
            <Box mt="auto" mx="auto">
              <PreviewButton />
            </Box>
          </Grid>
          <Grid item xs={12} container direction="column" className={classes.sidebar}>
            <Box ml="auto" mt={2.5}>
              <Button className={classes.buttonSave} color="primary" variant="contained" onClick={handleSaveFlow}>
                <FiSave />
                {intl.formatMessage({ id: 'FlowBuilder.saveAndPublish' })}
              </Button>
            </Box>
            {selectedId && (
              <Box mt={4.5}>
                <FlowBuilderProductDetails
                  flow={changeableFlowModel.value}
                  productId={selectedId}
                  onUpdate={handleProductUpdate}
                />
              </Box>
            )}
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
  );
}
