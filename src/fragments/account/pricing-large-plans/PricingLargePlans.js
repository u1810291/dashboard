import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { camelCase } from 'lodash';
import { Items, Card, Text, Click } from 'components';

import CSS from './PricingLargePlans.module.scss';

function Plan({ title, price, verificationPrice, isOnePlan, onClick }) {
  return (
    <Card justifyItems="center" padding={2} className={classNames({ [CSS.singlePlan]: isOnePlan, [CSS.plan]: true })}>
      <Text size="7" weight="1">
        {title}
      </Text>
      <Text size="4" weight={4} padding="20px 0 30px 0" align="center">
        {
        price || <FormattedMessage id={`PricingPlans.${camelCase(title)}.description`} />
      }
      </Text>
      { verificationPrice && (
      <Text size="2" weight={1}>
        <FormattedMessage
          id={`PricingPlans.${camelCase(title)}.notation`}
          values={{ verificationCost: (verificationPrice / 100).toFixed(2) }}
        />
      </Text>
      )}
      <Click background={price || verificationPrice ? 'active' : ''} hoverShadow={false} onClick={onClick}>
        <Text color={price || verificationPrice ? '' : 'active'} uppercase>
          <FormattedMessage id={price || verificationPrice ? 'PricingPlans.start' : 'PricingPlans.contactUs'} />
        </Text>
      </Click>
    </Card>
  );
}

export default function PricingLargePlans({
  name,
  subscriptionPrice,
  verificationPrice,
  isOnePlan,
  onClick = () => {},
}) {
  return (
    <Items>
      <Plan
        title={name}
        price={+subscriptionPrice
          ? <FormattedMessage id="CardModal.planPrice" values={{ planPrice: (subscriptionPrice / 100).toFixed(2) }} />
          : subscriptionPrice}
        verificationPrice={verificationPrice}
        isOnePlan={isOnePlan}
        onClick={onClick}
      />
    </Items>
  );
}

Plan.propTypes = {
  isOnePlan: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  verificationPrice: PropTypes.number || undefined,
  price: PropTypes.number,
  title: PropTypes.string.isRequired,
};

PricingLargePlans.propTypes = {
  isOnePlan: PropTypes.bool.isRequired,
  verificationPrice: PropTypes.number || undefined,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  subscriptionPrice: PropTypes.number || undefined,
};

PricingLargePlans.defaultProps = {
  onClick: () => {},
  verificationPrice: undefined,
  subscriptionPrice: undefined,
};

Plan.defaultProps = {
  price: undefined,
  verificationPrice: undefined,
};
