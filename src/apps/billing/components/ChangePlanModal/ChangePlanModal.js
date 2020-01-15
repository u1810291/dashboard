import { Card, Click, Items, Text } from 'components';
import React, { useState } from 'react';
import { FormattedHTMLMessage, FormattedMessage, useIntl } from 'react-intl';
import { injectStripe } from 'react-stripe-elements';
import CSS from './ChangePlanModal.module.scss';
import MatiLogoURL from './Mati.svg';

function ChangePlanModal({ plan, onSubmit }) {
  const intl = useIntl();
  const [disabled, setDisabled] = useState(false);
  async function handleSubmit() {
    setDisabled(true);
    await onSubmit(plan);
    setDisabled(false);
  }

  return (
    <Card
      flow="row"
      gap={0}
      className={CSS.changePlanWrapper}
    >
      <Items justifyContent="center">
        <img
          src={MatiLogoURL}
          alt="mati"
        />
      </Items>
      <Items flow="row">
        <Items flow="row" gap={0}>
          <Text>{plan.name}</Text>
          <Text color="active" size="4" weight="4" lineHeight={2}>
            <FormattedMessage
              id="CardModal.planPrice"
              values={{
                planPrice: Math.floor(plan.subscriptionPrice / 100),
                period: plan.name === 'Yearly'
                  ? intl.formatMessage({ id: 'PricingPlans.pricePerYear' })
                  : intl.formatMessage({ id: 'PricingPlans.pricePerMonth' }),
              }}
            />
          </Text>
        </Items>
        <Items flow="row" gap={0}>
          <Text padding={2}>
            <FormattedHTMLMessage
              id="CardModal.limitation"
              values={{ extraPrice: (plan.extraPrice / 100).toFixed(2), amount: plan.includedVerifications }}
            />
          </Text>
        </Items>
        <Items flow="row" gap={0}>
          <Click background="active" onClick={handleSubmit} disabled={disabled}>
            <FormattedMessage id="CardModal.submit" />
          </Click>
        </Items>
      </Items>
    </Card>
  );
}

export default injectStripe(ChangePlanModal);
