import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, Card } from 'components';
import { H2 } from 'components/text';
import { CopyToClipboard } from 'components/clipboard';
import { trimMiddle } from 'lib/string';
import { permalinkUrl } from 'lib/client/urls';

export default function PermalinkSection({ clientId }) {
  return (
    <Card flow="column" align="center" templateColumns="2fr 1fr" shadow="2">
      <H2 weight="2">
        <FormattedMessage id="apps.integration.permalink.title" />
        <p>
          <FormattedMessage id="apps.integration.permalink.subtitle" />
        </p>
      </H2>
      <Card shadow="0">
        <CopyToClipboard text={permalinkUrl({ clientId })}>
          <Link
            href={permalinkUrl({ clientId })}
            target="_blank"
            rel="noopener noreferrer"
          >
            {trimMiddle(permalinkUrl({ clientId }))}
          </Link>
        </CopyToClipboard>
      </Card>
    </Card>
  );
}
