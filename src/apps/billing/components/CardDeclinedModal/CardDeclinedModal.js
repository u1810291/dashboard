import { closeOverlay, Items, Text } from 'components';
import Button from 'components/button';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { WithAsideModal } from '../../containers/WithAsideModal';
import CSS from './CardDeclinedModal.module.scss';

export function CardDeclinedModal({ onChangeMethod }) {
  const handleContactUs = () => {
    closeOverlay();
  };

  return (
    <WithAsideModal>
      <Items flow="row">
        <Items flow="row" gap={0}>
          <Items flow="row">
            <Text weight={4} size={4.5} className={CSS.title}>
              <FormattedMessage id="CardDeclinedModal.title" />
            </Text>
            <Text size={1.5} className={CSS.text}>
              <FormattedMessage id="CardDeclinedModal.text" />
            </Text>
          </Items>
          <Items flow="row">
            <Button buttonStyle="primary" size="big" onClick={onChangeMethod}>
              <FormattedMessage id="CardDeclinedModal.anotherMethod" />
            </Button>
            <Button buttonStyle="primary" size="big" onClick={handleContactUs}>
              <FormattedMessage id="CardDeclinedModal.contactUs" />
            </Button>
          </Items>
        </Items>
      </Items>
    </WithAsideModal>
  );
}
