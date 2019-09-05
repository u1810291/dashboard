/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import { useState } from 'react';
import {
  injectStripe,
} from 'react-stripe-elements';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import { Card, Items, Click, Text } from 'components';

import CSS from './ChangePlanModal.module.scss';
import MatiLogoURL from './Mati.svg';

function ChangePlanModal({
  name,
  subscriptionPrice,
  extraPrice,
  includedVerifications,
  onSubmit = () => {},
}) {
  const [disabled, setDisabled] = useState(false);
  async function handleSubmit() {
    setDisabled(true);
    await onSubmit();
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
          <Text>{name}</Text>
          <Text color="active" size="4" weight="4" lineHeight={2}>
            <FormattedMessage
              id="CardModal.planPrice"
              values={{ planPrice: Math.floor(subscriptionPrice / 100) }}
            />
          </Text>
        </Items>
        <Items flow="row" gap={0}>
          <Text padding={2}>
            <FormattedHTMLMessage
              id="CardModal.limitation"
              values={{ extraPrice, amount: includedVerifications }}
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

ChangePlanModal.propTypes = {
  extraPrice: PropTypes.number.isRequired,
  includedVerifications: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  subscriptionPrice: PropTypes.number.isRequired,
};

ChangePlanModal.defaultProps = {
  onSubmit: () => {},
};
