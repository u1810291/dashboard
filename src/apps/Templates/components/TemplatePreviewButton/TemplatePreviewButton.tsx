import { Box } from '@material-ui/core';
import { flowBuilderSubscribeToTemporaryWebhook, selectFlowBuilderChangeableFlowStyle } from 'apps/flowBuilder';
import { notification } from 'apps/ui';
import { Loadable } from 'models/Loadable.model';
import React, { useCallback, useEffect, useRef } from 'react';
import { useFormatMessage } from 'apps/intl';
import { useDispatch, useSelector } from 'react-redux';
import { templateBuilderGetTemporaryFlowId } from 'apps/Templates';
import { selectClientIdModel, selectCurrentFlowId } from 'state/merchant/merchant.selectors';
import { IFlowStyle } from 'models/Workflow.model';
import { useStyles } from './TemplatePreviewButton.styles';

export function TemplatePreviewButton() {
  const flowStyle = useSelector<any, IFlowStyle>(selectFlowBuilderChangeableFlowStyle);
  const clientIdModel = useSelector<any, Loadable<string>>(selectClientIdModel);
  const flowId = useSelector<any, string>(selectCurrentFlowId);
  const dispatch = useDispatch();
  const classes = useStyles();
  const buttonContainerRef = useRef(null);
  const buttonRef = useRef(null);
  const formatMessage = useFormatMessage();

  const handleClick = useCallback(async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (buttonRef.current) {
      try {
        const button = buttonRef.current.cloneNode(true);
        const temporaryFlowId = await dispatch(templateBuilderGetTemporaryFlowId());
        // @ts-ignore
        await dispatch(flowBuilderSubscribeToTemporaryWebhook(temporaryFlowId));
        button.setAttribute('flowId', temporaryFlowId);
        document.body.appendChild(button);
        button.click();
        button.remove();
      } catch {
        notification.error(formatMessage('Error.common'));
      }
    }
  }, [buttonRef, dispatch, formatMessage]);

  useEffect(() => {
    const buttonContainer = buttonContainerRef.current;
    if (buttonContainer) {
      buttonContainer.addEventListener('click', handleClick, true);
    }
    return () => buttonContainer && buttonContainer.removeEventListener('click', handleClick, true);
  }, [buttonContainerRef, handleClick]);

  return (
    <Box>
      <div ref={buttonContainerRef}>
        {clientIdModel.isLoaded && flowStyle && clientIdModel.value && (
          // @ts-ignore
          <mati-button
            ref={buttonRef}
            class={classes.button}
            color={flowStyle.color}
            clientId={clientIdModel.value}
            language={flowStyle.language}
            apiHost={process.env.REACT_APP_API_URL}
            signupHost={process.env.REACT_APP_SIGNUP_URL}
            flowId={flowId}
          />
        )}
      </div>
    </Box>
  );
}
