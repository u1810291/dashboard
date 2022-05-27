import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import { useOverlay } from 'apps/overlay';
import { useDispatch, useSelector } from 'react-redux';
import { selectFlowBuilderHaveUnsavedChanges } from 'apps/flowBuilder';
import { TemplatesModal } from 'apps/SolutionCatalog';
import { notification } from 'apps/ui';
import { useFormatMessage } from 'apps/intl';
import { TemplateSelectAttemptModal } from '../TemplateSelectAttemptModal/TemplateSelectAttemptModal';
import { loadAndApplyTemplateToMetamap } from '../../store/Templates.actions';
import { useStyles } from './TemplatesButton.styles';

export const TemplatesButton = () => {
  const classes = useStyles();
  const formatMessage = useFormatMessage();
  const dispatch = useDispatch();
  const [createOverlay, closeOverlay] = useOverlay();
  const haveUnsavedChanges = useSelector<any, boolean>(selectFlowBuilderHaveUnsavedChanges);

  const handleTemplateCardClick = useCallback(async (templateId: string) => {
    try {
      await dispatch(loadAndApplyTemplateToMetamap(templateId));
      closeOverlay();
    } catch {
      notification.error(formatMessage('Error.common'));
    }
  }, [dispatch, closeOverlay, formatMessage]);

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
  }, [closeOverlay, createOverlay, handleTemplateCardClick, haveUnsavedChanges, handleTemplatesContinueButtonClick]);

  return (
    <Button
      className={classes.templatesButton}
      variant="outlined"
      disableElevation
      onClick={handleTemplatesButtonClick}
    >
      {formatMessage('Templates.builder.templatesButton')}
    </Button>
  );
};
