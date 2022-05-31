import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { DirectLinkCopy } from 'apps/forDevelopers/components/DirectLinkCopy/DirectLinkCopy';
import { ButtonLink } from 'apps/ui/components/ButtonLink/ButtonLink';
import { urls, TabID, LinkButton } from 'models/Integration.model';
import { Logo } from 'apps/logo';
import { BoxBordered, Warning, WarningSize, WarningTypes } from 'apps/ui';
import { appPalette } from 'apps/theme/app.palette';
import { TemplateWebCodeSnippet } from '../TemplateWebCodeSnippet/TemplateWebCodeSnippet';
import { ITemplate } from '../../model/Templates.model';
import { selectCurrentTemplateModelValue } from '../../store/Templates.selectors';

export function TemplateIntegrationSDK() {
  const intl = useIntl();
  const currentTemplate = useSelector<any, ITemplate>(selectCurrentTemplateModelValue);

  return (
    <Box>
      <Box mb={2.5}>
        <Typography variant="subtitle2" gutterBottom>
          {intl.formatMessage({ id: 'flow.logoStep.title' })}
        </Typography>
        <Logo />
      </Box>
      <BoxBordered borderColor={appPalette.yellow} mt={1} mb={1}>
        <Warning
          type={WarningTypes.Warning}
          size={WarningSize.Large}
          label={intl.formatMessage({ id: 'ColorPickerWarning' })}
          link="https://docs.metamap.com/docs/web"
          linkLabel={intl.formatMessage({ id: 'ColorPickerWarning.link' })}
        />
      </BoxBordered>
      <Box mb={2}>
        {currentTemplate?.flow?._id && <TemplateWebCodeSnippet />}
      </Box>
      <Box mb={4}>
        <ButtonLink
          url={urls[TabID.Web].documentationURL}
        >
          {intl.formatMessage({ id: 'forDevs.documentationBanner.button' }, { platform: 'WebSDK' })}
        </ButtonLink>
      </Box>
      <Box mb={4}>
        {currentTemplate?.flow && <DirectLinkCopy />}
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>{intl.formatMessage({ id: 'FlowBuilder.integration.mobileHybridSDKsnippet.title' })}</Typography>
        <Box mb={2} color="common.black75">
          {intl.formatMessage({ id: 'FlowBuilder.integration.mobileHybridSDKsnippet.subtitle' })}
        </Box>
        <Box mb={1}>
          <ButtonLink url={LinkButton.documentationURL}>
            {intl.formatMessage({ id: 'forDevs.documentationBanner.button' }, { platform: LinkButton.name })}
          </ButtonLink>
        </Box>
      </Box>
    </Box>
  );
}
