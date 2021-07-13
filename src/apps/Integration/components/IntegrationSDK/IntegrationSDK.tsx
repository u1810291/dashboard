import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { ColorPicker } from 'apps/ColorPicker';
import { WebCodeSnippet } from 'apps/forDevelopers/components/WebCodeSnippet/WebCodeSnippet';
import { DirectLinkCopy } from 'apps/forDevelopers/components/DirectLinkCopy/DirectLinkCopy';
import { selectFlowBuilderChangeableFlowStyle } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { ButtonLink } from 'apps/ui/components/ButtonLink/ButtonLink';
import { urls, TabID, LinkButtons } from 'models/Integration.model';
import { flowBuilderChangeableFlowUpdate } from 'apps/flowBuilder/store/FlowBuilder.action';
import { Logo } from 'apps/logo';

export function IntegrationSDK() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const changeableFlowStyle = useSelector(selectFlowBuilderChangeableFlowStyle);

  const handleChangeColor = useCallback((value) => {
    dispatch(flowBuilderChangeableFlowUpdate({ style: { color: value } }));
  }, [dispatch]);

  return (
    <Box>
      <Box mb={2.5}>
        <Typography variant="subtitle2" gutterBottom>
          {intl.formatMessage({ id: 'flow.logoStep.title' })}
        </Typography>
        <Logo />
      </Box>
      <Box mb={4}>
        <Typography variant="subtitle2" gutterBottom>
          {intl.formatMessage({ id: 'Product.configuration.buttonsColor' })}
        </Typography>
        <ColorPicker activeColor={changeableFlowStyle?.color} onChange={handleChangeColor} />
      </Box>
      <Box mb={2}>
        <WebCodeSnippet />
      </Box>
      <Box mb={4}>
        <ButtonLink
          url={urls[TabID.Web].documentationURL}
        >
          {intl.formatMessage({ id: 'forDevs.documentationBanner.button' }, { platform: 'WebSDK' })}
        </ButtonLink>
      </Box>
      <Box mb={4}>
        <DirectLinkCopy />
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>{intl.formatMessage({ id: 'FlowBuilder.integration.mobileHybridSDKsnippet.title' })}</Typography>
        <Box mb={2} color="common.black75">
          {intl.formatMessage({ id: 'FlowBuilder.integration.mobileHybridSDKsnippet.subtitle' })}
        </Box>
        {LinkButtons.map((id) => (
          <Box key={id} mb={1}>
            <ButtonLink url={urls[id].documentationURL}>
              {intl.formatMessage({ id: 'forDevs.documentationBanner.button' }, { platform: urls[id].name })}
            </ButtonLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
