import { Button, Grid } from '@material-ui/core';
import { selectFlowBuilderHaveUnsavedChanges, selectFlowBuilderProductsInGraphModel } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { useProductsIssues } from 'apps/Product/hooks/ProductIssues.hook';
import { TextBubble } from 'apps/ui';
import { useOverlay } from 'apps/overlay';
import React from 'react';
import { FiSave } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { TemplateSaveModal } from 'apps/Templates/components/TemplateSaveModal/TemplateSaveModal';
import { updateTemplate } from 'apps/Templates/store/Templates.actions';
import { useStyles } from './SaveAndPublishTemplate.style';

export function SaveAndPublishTemplate({ isEditMode = false }: { isEditMode?: boolean}) {
  const classes = useStyles();
  const intl = useIntl();
  const productsInGraphModel = useSelector(selectFlowBuilderProductsInGraphModel);
  const haveUnsavedChanges = useSelector<any, boolean>(selectFlowBuilderHaveUnsavedChanges);
  const haveIssues = useProductsIssues(productsInGraphModel.value);
  const [createOverlay] = useOverlay();
  const dispatch = useDispatch();

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
        disabled={!productsInGraphModel.isLoaded || !haveUnsavedChanges || haveIssues}
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
