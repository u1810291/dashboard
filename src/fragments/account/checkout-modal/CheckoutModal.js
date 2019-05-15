/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { FormattedMessage } from 'react-intl'
import { Card, Items, Click, Text, Small } from 'components'
import MatiLogoURL from './Mati.svg'

function CheckoutModal({
  planId,
  planPrice,
  extraPrice,
  name,
  stripe,
  onSubmit = () => {}
}) {
  const [disabled, setDisabled] = useState(false)
  async function handleSubmit() {
    setDisabled(true)
    const { token } = await stripe.createToken({ name })
    await onSubmit(token)
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
        <Items
          flow="row"
          gap={0}
          css={css`
            line-height: 1.5;
          `}
        >
          <FormattedMessage id={`CheckoutModal.planName.${planId}`} />
          <Text color="active" size="4" weight="4">
            <FormattedMessage
              id="CheckoutModal.planPrice"
              values={{ planPrice }}
            />
          </Text>
          <Small>
            <FormattedMessage id="CheckoutModal.priceChargeNotice" />
          </Small>
          <span>
            <Text weight="4">
              <FormattedMessage id="currency" values={{ value: extraPrice }} />
            </Text>{' '}
            <FormattedMessage id="CheckoutModal.extraPriceNotice" />
          </span>
        </Items>
        <hr />
        <span>
          <CardElement />
        </span>
        <hr />
      </Items>
      <Items flow="row" justifyItems="center" gap={1}>
        <Items flow="row" gap="0" justifyItems="center">
          <FormattedMessage id="CheckoutModal.refund.0" />
          <FormattedMessage id="CheckoutModal.refund.1" />
        </Items>
        <Text weight="4">
          <FormattedMessage id="CheckoutModal.refund.2" />
        </Text>
      </Items>
      <Click background="active" onClick={handleSubmit} disabled={disabled}>
        <FormattedMessage id="CheckoutModal.submit" />
      </Click>
    </Card>
  )
}

export default injectStripe(CheckoutModal)
