import React from 'react';
import PropTypes from 'prop-types';
import snakeCase from 'lodash/snakeCase';
import { FormattedMessage } from 'react-intl';

import { Items, Card, Click, Text } from 'components';

export default function PricingPlans({
  subscriptionPrice,
  name,
  current = false,
  includedVerifications,
  extraPrice,
  onChoosePlan,
}) {
  return (
    <Card gap="4" autoRows="max-content 1fr">
      <Items flow="row" gap="2">
        <Text color="secondary">{name}</Text>
        <Items align="baseline" justifyContent="start" gap={0.25}>
          <Text size={8}>
$
            {Math.floor(subscriptionPrice / 100)}
          </Text>
          <Text>/</Text>
          <Text>
            <FormattedMessage id="PricingPlans.pricePerMonth" />
          </Text>
        </Items>
      </Items>

      <Items flow="row" gap="2">
        <Items flow="row" gap={0.5}>
          <Text>
            <FormattedMessage
              id="PricingPlans.verificationsPerMonth"
              values={{
                count: includedVerifications,
              }}
            />
          </Text>

          <Text size={1} color="secondary">
            {includedVerifications > 0 ? (
              <FormattedMessage
                id="PricingPlans.pricePerverification"
                values={{
                  amount: (
                    Math.floor(subscriptionPrice / includedVerifications) / 100
                  ).toFixed(2),
                }}
              />
            ) : (
              <span>&nbsp;</span>
            )}
          </Text>
        </Items>

        <Items flow="row" gap={0.5}>
          <Text>
            <FormattedMessage
              id="PricingPlans.pricePerverification"
              values={{
                amount: (extraPrice / 100).toFixed(2),
              }}
            />
          </Text>
          {includedVerifications > 0 && (
            <Text>
              <FormattedMessage
                id="PricingPlans.extraPrice"
                values={{
                  count: includedVerifications,
                }}
              />
            </Text>
          )}
        </Items>
      </Items>

      {current ? (
        <Items
          gap={0}
          flow="row"
          justifyContent="center"
          data-qa="pricing-planControl-current"
        >
          <Text uppercase color="active" lineHeight={2.5}>
            <FormattedMessage id="PricingPlans.currentPlan" />
          </Text>
        </Items>
      ) : (
        <Click
          background="active"
          onClick={onChoosePlan}
          data-qa={`pricing-planControl-${snakeCase(name)}`}
        >
          <Text uppercase>
            <FormattedMessage id="PricingPlans.start" />
          </Text>
        </Click>
      )}
    </Card>
  );
}

PricingPlans.propTypes = {
  current: PropTypes.bool,
  includedVerifications: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChoosePlan: PropTypes.func.isRequired,
  subscriptionPrice: PropTypes.number.isRequired,
  extraPrice: PropTypes.number.isRequired,
};

PricingPlans.defaultProps = {
  current: false,
};
