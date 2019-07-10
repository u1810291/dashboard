/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState } from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { Card, Items, Click, Text } from 'components'
import MatiLogoURL from './Mati.svg'

function CheckoutModal({
  planId,
  planPrice,
  extraPrice,
  amount,
  name,
  stripe,
  onSubmit = () => {}
}) {
  const [disabled, setDisabled] = useState(false)
  async function handleSubmit() {
    setDisabled(true)
    const { token } = await stripe.createToken({ name })
    await onSubmit(token);
    setDisabled(false)
  }

  return (
    <Card
      flow="row"
      gap={3}
      css={css`
        max-width: 377px;
      `}
    >
      <Items justifyContent="center">
        <img
          src={MatiLogoURL}
          alt="mati"
          css={css`
            width: 64px;
          `}
        />
      </Items>
      <Items flow="row">
        <Items flow="row" gap={0}>
          <FormattedMessage id={`CheckoutModal.planName.${planId}`} />
          <Text color="active" size="4" weight="4">
            <FormattedMessage
              id="CheckoutModal.planPrice"
              values={{ planPrice }}
            />
          </Text>
        </Items>
        <Items flow="row" gap={0}>
          <FormattedHTMLMessage
            id="CheckoutModal.limitation"
            values={{ extraPrice, amount }}
          />
          <hr />
        </Items>

        <Items flow="row">
          <Items gap="1" flow="row">
            <strong>
              <FormattedMessage id="CheckoutModal.cardNumber" />
            </strong>
            <Card border="active" shadow="0" padding="1">
              <CardNumberElement />
            </Card>
          </Items>

          <Items templateColumns="1fr 1fr">
            <Items gap="1" flow="row">
              <strong>
                <FormattedMessage id="CheckoutModal.expDate" />
              </strong>
              <Card border="active" shadow="0" padding="1">
                <CardExpiryElement />
              </Card>
            </Items>
            <Items gap="1" flow="row">
              <strong>
                <FormattedMessage id="CheckoutModal.cvc" />
              </strong>
              <Card border="active" shadow="0" padding="1">
                <CardCVCElement />
              </Card>
            </Items>
          </Items>
        </Items>
        <hr />
      </Items>
      <Items flow="row" justifyItems="center" gap={1}>
        <FormattedMessage id="CheckoutModal.refund.1" />
        <FormattedMessage id="CheckoutModal.refund.2" />
      </Items>
      <Click background="active" onClick={handleSubmit} disabled={disabled}>
        <FormattedMessage id="CheckoutModal.submit" />
      </Click>
    </Card>
  )
}

export default injectStripe(CheckoutModal)
