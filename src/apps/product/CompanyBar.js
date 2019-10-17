import React from 'react';
import { FormattedMessage } from 'react-intl';
import { permalinkUrl } from 'lib/client/urls';
import { trimMiddle } from 'lib/string';
import { CopyToClipboard } from 'components/clipboard';
import { Items, Card, H2, Text, Link } from 'components';

export default function CompanyBar({ companyName, clientId }) {
  return (
    <Card flow="column" align="center" autoColumns="1fr max-content">
      <H2>
        {
          companyName
          || <FormattedMessage id="apps.product.companybar.companynameplaceholder" />
        }
      </H2>
      <Items flow="row" gap={1}>
        <Text>
          <FormattedMessage id="apps.product.companybar.permalink" />
        </Text>
        <CopyToClipboard text={permalinkUrl({ clientId })}>
          <Link
            href={permalinkUrl({ clientId })}
            target="_blank"
            rel="noopener noreferrer"
          >
            {trimMiddle(permalinkUrl({ clientId }))}
          </Link>
        </CopyToClipboard>
      </Items>
    </Card>
  );
}
