import React from 'react';
import { useIntl } from 'react-intl';
import { ButtonLink } from 'apps/ui/components/ButtonLink/ButtonLink';
import { urls, TabID } from 'models/Integration.model';

export function TemplateIntegrationAPI() {
  const intl = useIntl();
  return (
    <ButtonLink
      url={urls[TabID.Api].documentationURL}
    >
      {intl.formatMessage({ id: 'forDevs.documentationBanner.button' }, { platform: 'API' })}
    </ButtonLink>
  );
}
