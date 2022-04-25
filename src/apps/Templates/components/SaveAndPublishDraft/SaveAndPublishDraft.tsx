import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { flowBuilderSaveAndPublish, selectFlowBuilderHaveUnsavedChanges, selectFlowBuilderProductsInGraphModel } from 'apps/flowBuilder';
import { useProductsIssues } from 'apps/Product';
import { notification, TextBubble } from 'apps/ui';
import { useOverlay } from 'apps/overlay';
import { useQuery } from 'lib/url';
import React, { useCallback } from 'react';
import { FiSave } from 'react-icons/fi';
import { Routes } from 'models/Router.model';
import { useSelector, useDispatch } from 'react-redux';
import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';
import { useHistory } from 'react-router-dom';
import { selectMerchantFlowList, selectCurrentFlow } from 'state/merchant/merchant.selectors';
import { IFlow } from 'models/Flow.model';
import { useFormatMessage } from 'apps/intl';
import { AddNewFlowModal, flowNameValidator } from 'pages/WorkflowList';
import { createFlowFromTemplate } from '../../store/Templates.actions';
import { ITemplate } from '../../model/Templates.model';
import { selectCurrentTemplateModel } from '../../store/Templates.selectors';
import { useStyles } from './SaveAndPublishDraft.style';

export function SaveAndPublishDraft({ isEditMode = false }: { isEditMode?: boolean}) {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const history = useHistory();
  const { asMerchantId } = useQuery();
  const productsInGraphModel = useSelector<any, Loadable<ProductTypes[]>>(selectFlowBuilderProductsInGraphModel);
  const haveUnsavedChanges = useSelector<any, boolean>(selectFlowBuilderHaveUnsavedChanges);
  const haveIssues = useProductsIssues(productsInGraphModel.value);
  const [createOverlay] = useOverlay();
  const currentTemplateModel = useSelector<any, Loadable<ITemplate>>(selectCurrentTemplateModel);
  const merchantFlowList = useSelector<any, IFlow[]>(selectMerchantFlowList);
  const currentFlow = useSelector(selectCurrentFlow);

  const newFlowSubmit = useCallback(async (text: string) => {
    const value = (text || '').trim();
    const duplicate = merchantFlowList.find((item) => item.name === value);
    await flowNameValidator({ hasDuplicate: !!duplicate, name: value });
    const newFlow = await dispatch(createFlowFromTemplate(value, asMerchantId));
    // @ts-ignore
    history.push(`${Routes.templates.draftFlow}/${newFlow.id}`);
  }, [dispatch, history, asMerchantId, merchantFlowList]);

  const handleFlowSave = () => {
    createOverlay(<AddNewFlowModal submitNewFlow={newFlowSubmit} />);
  };

  const handleFlowUpdate = async () => {
    try {
      await dispatch(flowBuilderSaveAndPublish(currentFlow.name));
      notification.info(formatMessage('FlowBuilder.notification.saved'));
    } catch (e) {
      notification.error(formatMessage('Error.common'));
    }
  };

  return (
    <Grid container>
      {haveIssues ? (
        <TextBubble className={classes.issues}>
          {formatMessage('FlowBuilder.notification.issues')}
        </TextBubble>
      ) : haveUnsavedChanges && (
        <TextBubble>
          {formatMessage('FlowBuilder.notification.unsavedChanges')}
        </TextBubble>
      )}
      <Button
        disabled={productsInGraphModel.value.length === 0 || !productsInGraphModel.isLoaded || (!haveUnsavedChanges && isEditMode) || haveIssues || currentTemplateModel.isLoading}
        className={classes.buttonSave}
        color="primary"
        variant="contained"
        onClick={isEditMode ? handleFlowUpdate : handleFlowSave}
      >
        <FiSave />
        {formatMessage('FlowBuilder.button.saveAndPublish')}
      </Button>
    </Grid>
  );
}
