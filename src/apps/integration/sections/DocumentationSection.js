import { Click, Items } from 'components';
import { CopyToClipboard } from 'components/clipboard';
import Icons from 'components/icons';
import { H2 } from 'components/text';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import CSS from './DocumentationSection.module.scss';

export default function DocumentationSection({ clientId = '', clientSecret = '' }) {
  return (
    <Items flow="column" templateColumns="1fr 1fr" gap="24">
      <Items flow="row">
        <H2 weight="2">
          <FormattedMessage id="apps.integration.documentation.cta" />
          <p>
            <FormattedMessage id="apps.integration.documentation.subtitle" />
          </p>
        </H2>
        <Items templateColumns="4fr 1fr">
          <Click
            as="a"
            href="https://docs.getmati.com"
            border="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.Paper />
            <FormattedMessage id="apps.integration.documentation.cta" />
          </Click>
        </Items>
      </Items>
      <Items flow="row" className={CSS.fullAreaRoot}>
        <Items flow="row">
          <H2 weight="2">Client ID</H2>
          <CopyToClipboard text={clientId}>
            <code>{clientId}</code>
          </CopyToClipboard>
        </Items>
        3
        <Items flow="row">
          <H2 weight="2">Client Secret</H2>
          <CopyToClipboard text={clientSecret}>
            <code>{(clientSecret).replace(/./g, '*')}</code>
          </CopyToClipboard>
        </Items>
      </Items>
    </Items>
  );
}
