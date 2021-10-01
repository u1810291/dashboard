import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { WebCodeSnippet } from 'apps/forDevelopers/components/WebCodeSnippet/WebCodeSnippet';
import { DirectLinkCopy } from 'apps/forDevelopers/components/DirectLinkCopy/DirectLinkCopy';
import { ButtonLink } from 'apps/ui/components/ButtonLink/ButtonLink';
import { urls, TabID, LinkButton } from 'models/Integration.model';
import { Logo } from 'apps/logo';
import { BoxBordered, Warning, WarningSize, WarningTypes } from 'apps/ui';
import { appPalette } from 'apps/theme/app.palette';

export function IntegrationSDK() {
  const intl = useIntl();

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
          link="https://docs.getmati.com/#web-sdk-overview"
          linkLabel="Documentation"
        />
      </BoxBordered>
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
        <Box mb={1}>
          <ButtonLink url={LinkButton.documentationURL}>
            {intl.formatMessage({ id: 'forDevs.documentationBanner.button' }, { platform: LinkButton.name })}
          </ButtonLink>
        </Box>
      </Box>
    </Box>
  );
}
