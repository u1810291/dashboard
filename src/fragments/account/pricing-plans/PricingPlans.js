import React from 'react';
import PropTypes from 'prop-types';
import snakeCase from 'lodash/snakeCase';
import { FormattedMessage, useIntl } from 'react-intl';

import { Box } from '@material-ui/core';
import { Items, Card, Click, Text } from 'components';
import CSS from './PricingPlans.module.scss';

import DiscordLogo from './icons/discord-logo.png';
import SlackLogo from './icons/slack-logo.png';

export default function PricingPlans({
  subscriptionPrice,
  name,
  current = false,
  includedVerifications,
  extraPrice,
  onChoosePlan,
  supportLevel,
}) {
  const intl = useIntl();
  const planNamesMapper = {
    'Pay as you go': intl.formatMessage({ id: 'PricingPlans.asYouGo' }),
    Starter: intl.formatMessage({ id: 'PricingPlans.starter' }),
    Regular: intl.formatMessage({ id: 'PricingPlans.regular' }),
    Growth: intl.formatMessage({ id: 'PricingPlans.growth' }),
  };

  const Block = ({ ...props }) => (
    <Card gap="4" autoRows="max-content 1fr" {...props}>
      <Items flow="row" gap="2">
        <div>
          <Box fontSize={18} fontWeight={600}>
            {name}
          </Box>
          <Box fontSize={12} color="text.secondary">
            {planNamesMapper[name] || name}
          </Box>
        </div>
        <Items align="baseline" justifyContent="start" gap={0.25}>
          <Text size={8}>
            {`$${Math.floor(subscriptionPrice / 100)}`}
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

          <Text size={1.5} color="secondary" weight={4}>
            {includedVerifications > 0 ? (
              <FormattedMessage
                id="PricingPlans.pricePerverification"
                values={{
                  amount: (name === 'Growth') ? 0.99
                    : (subscriptionPrice / includedVerifications / 100).toFixed(2),
                }}
              />
            ) : (
              <FormattedMessage
                id="PricingPlans.pricePerverification"
                values={{ amount: '2.50' }}
              />
            )}
          </Text>
        </Items>

        <Items flow="row" gap={0.5}>
          <Text color="secondary" size={1}>
            {name !== 'Pay as you go' ? (
              <FormattedMessage
                id="PricingPlans.pricePerverification"
                values={{
                  amount: (extraPrice / 100).toFixed(2),
                }}
              />
            ) : (<span>&nbsp;</span>)}
          </Text>
          {includedVerifications > 0 && (
            <Text color="secondary" size={1}>
              <FormattedMessage
                id="PricingPlans.extraPrice"
                values={{
                  count: includedVerifications,
                }}
              />
            </Text>
          )}
        </Items>
        {(supportLevel === 1)
          && (
            <Items flow="row" gap={0.5} justifyItems="center">
              <div>
                <img src={DiscordLogo} alt="Discord" width="30" />
                <img src={SlackLogo} alt="Slack" width="30" />
              </div>
              <Text color="secondary" size={1}>
                {intl.formatMessage({ id: 'PricingPlans.support' })}
              </Text>
            </Items>
          )}
      </Items>

      {current ? (
        <Items
          gap={0}
          flow="row"
          justifyContent="center"
          data-qa="pricing-planControl-current"
        >
          <Text uppercase color="active" lineHeight={2.5} className={CSS.blockNowrap}>
            <FormattedMessage id="PricingPlans.currentPlan" />
          </Text>
        </Items>
      ) : (
        <Click
          background="active"
          onClick={onChoosePlan}
          data-qa={`pricing-planControl-${snakeCase(name)}`}
        >
          <Text>
            <FormattedMessage id="PricingPlans.start" />
          </Text>
        </Click>
      )}
    </Card>
  );

  return name === 'Regular'
    ? (
      <Card className={CSS.wrapperClass} padding={0} gap={0}>
        <Text color="white" lineHeight={2.2} weight={4} padding="0 0 0 10px">
          {intl.formatMessage({ id: 'PricingPlans.mostPopular' })}
        </Text>
        <Block className={CSS.selectedPlan} />
      </Card>
    ) : (<Block className={CSS.otherPlans} />);
}

PricingPlans.propTypes = {
  current: PropTypes.bool,
  includedVerifications: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChoosePlan: PropTypes.func.isRequired,
  subscriptionPrice: PropTypes.number.isRequired,
  extraPrice: PropTypes.number.isRequired,
  supportLevel: PropTypes.number.isRequired,
};

PricingPlans.defaultProps = {
  current: false,
};
