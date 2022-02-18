import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { flowBuilderSaveAndPublish, selectFlowBuilderChangeableFlow, selectFlowBuilderChangeableFlowModel, selectFlowBuilderHaveUnsavedChanges, selectFlowBuilderProductsInGraphModel } from 'apps/flowBuilder';
import { useProductsIssues } from 'apps/Product';
import { notification, TextBubble } from 'apps/ui';
import { useOverlay } from 'apps/overlay';
import React from 'react';
import { FiSave } from 'react-icons/fi';
import { Routes } from 'models/Router.model';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';
import { useHistory } from 'react-router-dom';
import { AddNewFlowModal } from 'apps/FlowList/components/AddNewFlowModal/AddNewFlowModal';
import { updateTemplate, createFlowFromTemplate } from '../../store/Templates.actions';
import { ITemplate } from '../../model/Templates.model';
import { selectCurrentTemplateModel } from '../../store/Templates.selectors';
import { selectMerchantFlowList } from 'state/merchant/merchant.selectors';
import { IFlow } from 'models/Flow.model';
import { flowNameValidator } from 'apps/FlowList/validators/FlowName.validator';
import { useStyles } from './SaveAndPublishDraft.style';

export function SaveAndPublishDraft({ isEditMode = false }: { isEditMode?: boolean}) {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const productsInGraphModel = useSelector<any, Loadable<ProductTypes[]>>(selectFlowBuilderProductsInGraphModel);
  const haveUnsavedChanges = useSelector<any, boolean>(selectFlowBuilderHaveUnsavedChanges);
  const haveIssues = useProductsIssues(productsInGraphModel.value);
  const [createOverlay] = useOverlay();
  const currentTemplateModel = useSelector<any, Loadable<ITemplate>>(selectCurrentTemplateModel);
  const merchantFlowList = useSelector<any, IFlow[]>(selectMerchantFlowList);

  const submitNewFlow = async (text) => {
    const value = (text || '').trim();

    const duplicate = merchantFlowList.find((item) => item.name === value);
    await flowNameValidator({ hasDuplicate: !!duplicate, name: value });
    const newFlow = await dispatch(createFlowFromTemplate(value));
    // @ts-ignore
    history.push(`${Routes.templates.draftFlow}/${newFlow.id}`);
  };

  const handleSaveFlow = () => {
    createOverlay(<AddNewFlowModal submitNewFlow={submitNewFlow} />);
  };

  const handleUpdateFlow = async () => {
    try {
      await dispatch(flowBuilderSaveAndPublish());
      notification.info(intl.formatMessage({ id: 'FlowBuilder.notification.saved' }));
    } catch (e) {
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    }
  };

  return (
    <Grid container>
      {haveIssues ? (
        <TextBubble className={classes.issues}>
          {intl.formatMessage({ id: 'FlowBuilder.notification.issues' })}
        </TextBubble>
      ) : haveUnsavedChanges && (
        <TextBubble>
          {intl.formatMessage({ id: 'FlowBuilder.notification.unsavedChanges' })}
        </TextBubble>
      )}
      <Button
        disabled={productsInGraphModel.value.length === 0 || !productsInGraphModel.isLoaded || (!haveUnsavedChanges && isEditMode) || haveIssues || currentTemplateModel.isLoading}
        className={classes.buttonSave}
        color="primary"
        variant="contained"
        onClick={isEditMode ? handleUpdateFlow : handleSaveFlow}
      >
        <FiSave />
        {intl.formatMessage({ id: 'FlowBuilder.button.saveAndPublish' })}
      </Button>
    </Grid>
  );
}
