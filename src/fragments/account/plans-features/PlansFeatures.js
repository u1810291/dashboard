import React from 'react';
import { useIntl } from 'react-intl';
import times from 'lodash/times';
import { Card, Items, H2, H3 } from 'components';

export default function PlansFeatures() {
  const intl = useIntl();
  return (
    <Card padding="4">
      <H2>
        {intl.formatMessage({ id: 'fragments.account.plans-features.title' })}
      </H2>
      <Items autoRows="1fr">
        {['identity-features', 'other-features'].map((key) => (
          <Items flow="row" key={key}>
            <H3 color="secondary">
              {intl.formatMessage({
                id: `fragments.account.plans-features.${key}.title`,
              })}
            </H3>
            <ul className="mgi-list mgi-list--check">
              {times(7).map((i) => (
                <li key={i}>
                  {intl.formatMessage({
                    id: `fragments.account.plans-features.${key}.${i}`,
                  })}
                </li>
              ))}
            </ul>
          </Items>
        ))}
      </Items>
    </Card>
  );
}
