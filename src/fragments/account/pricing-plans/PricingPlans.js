import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Items, Card, Click, Text, H2 } from 'components';

export default function PricingPlans({
  subscriptionPrice,
  name,
  current = false,
  highlight = false,
  includedVerifications,
  onChoosePlan,
}) {
  const hasBorder = highlight || current;

  return (
    <Card gap={4} background="white" border={hasBorder ? 'blue' : 'transparent'} style={{ minWidth: '225px' }}>
      <Items flow="row" gap={2}>
        <H2>
          {name}
        </H2>
        <Text size={5} weight={1}>
          <FormattedMessage id="PricingPlans.upTo" />
        </Text>
        <Items gap={0} flow="row">
          <Text size={16} weight={4}>
            {includedVerifications}
          </Text>
          <Text size={4} weight="1">
            <FormattedMessage id="PricingPlans.verificationsPerMonth" />
          </Text>
        </Items>
      </Items>
      <Items justifyItems="center" flow="row" gap={1}>
        <section>
          <Text size={4} weight={4}>
            $
            {Math.floor(subscriptionPrice / 100)}
          </Text>
          <Text size={4}>
            <FormattedMessage id="PricingPlans.pricePerMonth" />
          </Text>
        </section>
        <Text weight={1} color="secondary" align="center">
          <FormattedMessage
            id="PricingPlans.limitationsNotice"
            values={{ amount: includedVerifications }}
          />
        </Text>
      </Items>
      {current && (
        <Items gap={0} flow="row" justifyContent="center">
          <Text uppercase color="active" lineHeight={2.5}>
            <FormattedMessage
              id="PricingPlans.currentPlan"
            />
          </Text>
        </Items>
      )}
      {!current && (
        <Click background="active" onClick={onChoosePlan}>
          <Text uppercase>
            <FormattedMessage
              id="PricingPlans.start"
            />
          </Text>
        </Click>
      )}
    </Card>
  );
}

PricingPlans.propTypes = {
  current: PropTypes.bool,
  highlight: PropTypes.bool,
  includedVerifications: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChoosePlan: PropTypes.func.isRequired,
  subscriptionPrice: PropTypes.number.isRequired,
};

PricingPlans.defaultProps = {
  current: false,
  highlight: false,
};
