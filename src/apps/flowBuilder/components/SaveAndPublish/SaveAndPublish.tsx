import { Button, Grid } from '@material-ui/core';
import { useProductsIssues } from 'apps/Product/hooks/ProductIssues.hook';
import { notification, TextBubble } from 'apps/ui';
import React, { useCallback, useEffect } from 'react';
import { FiSave } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { flowBuilderSaveAndPublish } from '../../store/FlowBuilder.action';
import { selectFlowBuilderHaveUnsavedChanges, selectFlowBuilderProductsInGraphModel } from '../../store/FlowBuilder.selectors';
import { useStyles } from './SaveAndPublish.styles';
import { QATags } from '../../../../models/QA.model';

export function SaveAndPublish() {
  const classes = useStyles();
  const intl = useIntl();
  const dispatch = useDispatch();
  const productsInGraphModel = useSelector(selectFlowBuilderProductsInGraphModel);
  const haveUnsavedChanges = useSelector(selectFlowBuilderHaveUnsavedChanges);
  const haveIssues = useProductsIssues(productsInGraphModel.value);

  useEffect(() => {
    function handleBeforeUnload(event) {
      event.preventDefault();
      // eslint-disable-next-line no-param-reassign
      event.returnValue = '';
    }

    if (haveUnsavedChanges) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [haveUnsavedChanges]);

  const handleSaveFlow = useCallback(async () => {
    try {
      await dispatch(flowBuilderSaveAndPublish());
      notification.info(intl.formatMessage({ id: 'FlowBuilder.notification.saved' }));
    } catch (e) {
      notification.error(intl.formatMessage({ id: 'Error.common' }));
    }
  }, [dispatch, intl]);

  return (
    <Grid container>
      {haveIssues ? (
        <TextBubble className={classes.issues} qaTag={QATags.Flows.SaveButtonIssue}>
          {intl.formatMessage({ id: 'FlowBuilder.notification.issues' })}
        </TextBubble>
      ) : haveUnsavedChanges && (
        <TextBubble className={classes.unsavedChanges}>
          {intl.formatMessage({ id: 'FlowBuilder.notification.unsavedChanges' })}
        </TextBubble>
      )}
      <Button
        disabled={!productsInGraphModel.isLoaded || productsInGraphModel.value.length === 0 || !haveUnsavedChanges || haveIssues}
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
