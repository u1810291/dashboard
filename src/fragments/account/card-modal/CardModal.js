/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements'
import { FormattedMessage } from 'react-intl'
import { Card, Items, Click, Text } from 'components'

import WithAsideModal from '../with-aside-modal'

function CardModal({
 name,
 stripe,
 onSubmit = () => {}
}) {
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit() {
    setDisabled(true)
    const {token, error} = await stripe.createToken({ name })

    if (error) {
      setDisabled(false)
      setError(true)
      return;
    }

    await onSubmit(token);
    setDisabled(false)
  }

  return (
    <WithAsideModal>
      <Items flow="row">
        <Items flow="row">
          <Items flow="row">
            <Text weight={4} size={4.5} lineHeight={0} padding="30px 0 0 0">
              <FormattedMessage id="CardModal.enterCard.1" />
            </Text>
            <Text size={1.5} padding="0 0 20px 0">
              <FormattedMessage id="CardModal.enterCard.2" />
            </Text>
          </Items>

          <Items gap={1} flow="row">
            <FormattedMessage id="CardModal.cardNumber" />
            <Card border={error ? 'error' : 'active'} shadow="0" padding="1">
              <CardNumberElement />
            </Card>
          </Items>

          <Items templateColumns="1fr 1fr">
            <Items gap={1} flow="row">
              <FormattedMessage id="CardModal.expDate" />
              <Card border={error ? 'error' : 'active'} shadow="0" padding="1">
                <CardExpiryElement />
              </Card>
            </Items>

            <Items gap={1} flow="row">
              <FormattedMessage id="CardModal.cvc" />
              <Card border={error ? 'error' : 'active'} shadow="0" padding="1">
                <CardCVCElement />
              </Card>
            </Items>
          </Items>
        </Items>
        <Items flow="row" justifyItems="center">
          <Text className={CSS.refundTitle} size={1.8}>
            <FormattedMessage id="CardModal.refund.1" />
          </Text>
          <Text size={1.8} weight={4} padding="0 0 44px 0">
            <FormattedMessage id="CardModal.refund.2" />
          </Text>
        </Items>
        <Items flow="row" gap={0}>
          <Click background="active" onClick={handleSubmit} disabled={disabled}>
            <FormattedMessage id="CardModal.done" />
          </Click>
        </Items>
      </Items>
    </WithAsideModal>
  )
}

export default injectStripe(CardModal)
