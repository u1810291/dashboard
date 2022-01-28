import { Button, Grid } from '@material-ui/core';
import { selectFlowBuilderHaveUnsavedChanges, selectFlowBuilderProductsInGraphModel } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { useProductsIssues } from 'apps/Product/hooks/ProductIssues.hook';
import { notification, TextBubble } from 'apps/ui';
import { useOverlay } from 'apps/overlay';
import React, { useCallback, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
// import { flowBuilderSaveAndPublish } from '../../store/FlowBuilder.action';
import { useStyles } from './SaveAndPublishTemplate.style';
import { TemplateSaveModal } from 'apps/Templates/components/TemplateSaveModal/TemplateSaveModal';

export function SaveAndPublishTemplate() {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();
  const productsInGraphModel = useSelector(selectFlowBuilderProductsInGraphModel);
  const haveUnsavedChanges = useSelector(selectFlowBuilderHaveUnsavedChanges);
  const haveIssues = useProductsIssues(productsInGraphModel.value);
  const [createOverlay] = useOverlay();

  console.log('iss ', haveIssues);

  // useEffect(() => {
  //   function handleBeforeUnload(event) {
  //     event.preventDefault();
  //     // eslint-disable-next-line no-param-reassign
  //     event.returnValue = '';
  //   }

  //   if (haveUnsavedChanges) {
  //     window.addEventListener('beforeunload', handleBeforeUnload);
  //   } else {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   }
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [haveUnsavedChanges]);

  const handleSaveFlow = () => {
    createOverlay(<TemplateSaveModal onSubmit={() => {}} />);
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
        onClick={handleSaveFlow}
      >
        <FiSave />
        {intl.formatMessage({ id: 'FlowBuilder.button.saveAndPublish' })}
      </Button>
    </Grid>
  );
}
