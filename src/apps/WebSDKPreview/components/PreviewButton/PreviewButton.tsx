import { Box } from '@material-ui/core';
import { flowBuilderChangeableFlowUpdate, flowBuilderGetTemporaryFlowId, flowBuilderSubscribeToTemporaryWebhook } from 'apps/flowBuilder/store/FlowBuilder.action';
import { notification } from 'apps/ui';
import React, { useCallback, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectFlowBuilderChangeableFlowStyle } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { selectClientIdModel, selectCurrentFlowId } from 'state/merchant/merchant.selectors';
import { useStyles } from './PreviewButton.styles';
import { flowStyleUpdate } from 'state/merchant/merchant.actions';
import { isColorValid } from 'models/SupportedColors.model';

export function PreviewButton() {
  const flowStyle = useSelector(selectFlowBuilderChangeableFlowStyle);
  const clientIdModel = useSelector(selectClientIdModel);
  const flowId = useSelector(selectCurrentFlowId);
  const dispatch = useDispatch();
  const classes = useStyles();
  const buttonContainerRef = useRef(null);
  const buttonRef = useRef(null);
  const intl = useIntl();

  const handleClick = useCallback(async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (buttonRef.current) {
      try {
        await dispatch(flowBuilderChangeableFlowUpdate({ style: { color: isColorValid(buttonRef.current.color) } }));
        await dispatch(flowStyleUpdate({ color: isColorValid(buttonRef.current.color) }));
        const button = buttonRef.current.cloneNode(true);
        const temporaryFlowId = await dispatch(flowBuilderGetTemporaryFlowId());
        // @ts-ignore
        await dispatch(flowBuilderSubscribeToTemporaryWebhook(temporaryFlowId));
        button.setAttribute('flowId', temporaryFlowId);
        document.body.appendChild(button);
        button.click();
        button.remove();
      } catch (e) {
        notification.error(intl.formatMessage({ id: 'Error.common' }));
      }
    }
  }, [buttonRef, dispatch, intl]);

  useEffect(() => {
    const buttonContainer = buttonContainerRef.current;
    if (buttonContainer) {
      buttonContainer.addEventListener('click', handleClick, true);
    }
    return () => buttonContainer && buttonContainer.removeEventListener('click', handleClick, true);
  }, [buttonContainerRef, handleClick]);

  return (
    <Box>
      {clientIdModel.isLoaded && flowStyle && clientIdModel.value && (
        <div ref={buttonContainerRef}>
          {/* @ts-ignore */}
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
        </div>
      )}
    </Box>
  );
}
