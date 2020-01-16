import React from 'react';
import { useIntl } from 'react-intl';
import { times } from 'lodash';
import { Items, Text, H1 } from 'components';

export function MatiNumbers() {
  const intl = useIntl();

  return (
    <Items justifyContent="center" gap="12">
      {times(3).map((i) => (
        <Items flow="row" gap={1} key={i}>
          <H1 color="active">
            { intl.formatHTMLMessage({ id: `MatiNumbers.${i}.title` },
              { lt: <span key={i}>{'<'}</span> },
            )}
          </H1>
          <Text color="active">
            { intl.formatHTMLMessage({ id: `MatiNumbers.${i}.description` }) }
          </Text>
        </Items>
      ))}
    </Items>
  );
}
