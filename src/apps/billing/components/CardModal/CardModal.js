import { Card, Click, Items, Text } from 'components';
import WithAsideModal from 'fragments/account/with-aside-modal';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { CardCVCElement, CardExpiryElement, CardNumberElement, injectStripe } from 'react-stripe-elements';

function CardModal({
  plan,
  stripe,
  onSubmit,
}) {
  const [disabled, setDisabled] = useState(false);
  const [isError, setError] = useState(false);

  async function handleSubmit() {
    setDisabled(true);
    const { token, error } = await stripe.createToken({ name: plan.name });

    if (error) {
      setDisabled(false);
      setError(true);
      return;
    }

    await onSubmit(plan, token);
    setDisabled(false);
  }

  return (
    <WithAsideModal>
      <Items flow="row">
        <Items flow="row">
          <Items flow="row">
            <Text weight={4} size={4.5} lineHeight={1} padding="30px 0 0 0">
              <FormattedMessage id="CardModal.enterCard.1" />
            </Text>
            <Text size={1.5} padding="0 0 20px 0">
              <FormattedMessage id="CardModal.enterCard.2" />
            </Text>
          </Items>

          <Items gap={1} flow="row">
            <FormattedMessage id="CardModal.cardNumber" />
            <Card border={isError ? 'error' : 'active'} shadow="0" padding="1">
              <CardNumberElement />
            </Card>
          </Items>

          <Items templateColumns="1fr 1fr">
            <Items gap={1} flow="row">
              <FormattedMessage id="CardModal.expDate" />
              <Card border={isError ? 'error' : 'active'} shadow="0" padding="1">
                <CardExpiryElement />
              </Card>
            </Items>

            <Items gap={1} flow="row">
              <FormattedMessage id="CardModal.cvc" />
              <Card border={isError ? 'error' : 'active'} shadow="0" padding="1">
                <CardCVCElement />
              </Card>
            </Items>
          </Items>
        </Items>
        <Items flow="row" gap={0}>
          <Click background="active" onClick={handleSubmit} disabled={disabled}>
            <FormattedMessage id="CardModal.done" />
          </Click>
        </Items>
      </Items>
    </WithAsideModal>
  );
}

export default injectStripe(CardModal);
