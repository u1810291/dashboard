import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, Items, Card } from 'components';
import { H2 } from 'components/text';
import { CopyToClipboard } from 'components/clipboard';
import { trimMiddle } from 'lib/string';
import { permalinkUrl } from 'lib/client/urls';

export default function PermalinkSection({ clientId }) {
  return (
    <Items align="center" templateColumns="1fr 1fr" gap="24">
      <H2 weight="2">
        <FormattedMessage id="apps.integration.permalink.title" />
        <p>
          <FormattedMessage id="apps.integration.permalink.subtitle" />
        </p>
      </H2>
      <Items templateColumns="4fr 1fr">
        <Card shadow="0">
          <CopyToClipboard text={permalinkUrl({ clientId })}>
            <Link
              href={permalinkUrl({ clientId })}
              target="_blank"
              rel="noopener noreferrer"
            >
              {trimMiddle(permalinkUrl({ clientId }), 20)}
            </Link>
          </CopyToClipboard>
        </Card>
      </Items>
    </Items>
  );
}
