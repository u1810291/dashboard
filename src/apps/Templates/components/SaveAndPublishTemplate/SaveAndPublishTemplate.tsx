import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { selectFlowBuilderHaveUnsavedChanges, selectFlowBuilderProductsInGraphModel } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { useProductsIssues } from 'apps/Product/hooks/ProductIssues.hook';
import { TextBubble } from 'apps/ui';
import { useOverlay } from 'apps/overlay';
import React from 'react';
import { FiSave } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Loadable } from 'models/Loadable.model';
import { ProductTypes } from 'models/Product.model';
import { TemplateSaveModal } from 'apps/Templates';
import { updateTemplate } from '../../store/Templates.actions';
import { ITemplate } from '../../model/Templates.model';
import { selectCurrentTemplateModel } from '../../store/Templates.selectors';
import { useStyles } from './SaveAndPublishTemplate.style';

export function SaveAndPublishTemplate({ isEditMode = false }: { isEditMode?: boolean}) {
  const classes = useStyles();
  const intl = useIntl();
  const productsInGraphModel = useSelector<any, Loadable<ProductTypes[]>>(selectFlowBuilderProductsInGraphModel);
  const haveUnsavedChanges = useSelector<any, boolean>(selectFlowBuilderHaveUnsavedChanges);
  const haveIssues = useProductsIssues(productsInGraphModel.value);
  const [createOverlay] = useOverlay();
  const dispatch = useDispatch();
  const currentTemplateModel = useSelector<any, Loadable<ITemplate>>(selectCurrentTemplateModel);

  const handleSaveFlow = () => {
    createOverlay(<TemplateSaveModal />);
  };

  const handleUpdateFlow = () => {
    dispatch(updateTemplate());
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
        disabled={!productsInGraphModel.isLoaded || !haveUnsavedChanges || haveIssues || currentTemplateModel.isLoading}
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
