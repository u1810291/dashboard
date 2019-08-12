import React from 'react';
import { Card, Items, Text } from 'components';
import { Link } from 'react-router-dom';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';

import CSS from './VerificationsCard.module.scss';

export default function VerificationsCard({ count }) {
  return (
    <Card>
      <Items flow="row" className={CSS.verificationsCard}>
        <p className={CSS.text}>
          <FormattedHTMLMessage
            id="fragments.home.verification.card.text"
            values={{
              count,
              statusType: 'Check Needed',
            }}
          />
        </p>
        <p className={CSS.link}>
          <Link to="/verifications?status=reviewNeeded">
            <Text color="darkgray">
              <FormattedMessage id="fragments.home.verification.card.link"/>
            </Text>
          </Link>
        </p>
      </Items>
    </Card>
  );
}
