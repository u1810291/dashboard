import { Card, H2, H3, InfoTooltip, Items } from 'components';
import { get, times } from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';

export default function PlansFeatures() {
  const intl = useIntl();

  return (
    <Card padding="4" gap="3">
      <H2 weight={2}>
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
                  {get(intl.messages, `fragments.account.plans-features.${key}.${i}.tip`)
                    && (
                      <InfoTooltip
                        title={intl.formatMessage({ id: `fragments.account.plans-features.${key}.${i}.tip` })}
                      />
                    )}
                </li>
              ))}
            </ul>
          </Items>
        ))}
      </Items>
    </Card>
  );
}
