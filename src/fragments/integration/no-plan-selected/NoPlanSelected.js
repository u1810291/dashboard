import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Items, H1, Click } from 'components';
import Picture from './Picture.svg';

export default function NoPlanSelected() {
  return (
    <Items flow="row" gap="4" justifyItems="center">
      <H1>
        <FormattedMessage id="NoPlanSelected.title" />
      </H1>
      <img src={Picture} alt="" />
      <Click href="/settings/pricing" background="active" as="a">
        <FormattedMessage id="NoPlanSelected.link" />
      </Click>
    </Items>
  );
}
