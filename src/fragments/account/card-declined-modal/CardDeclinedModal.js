/** @jsx jsx */
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';
import { FormattedMessage } from 'react-intl';

import { closeOverlay, Items, Text } from 'components';
import Button from 'components/button';

import WithAsideModal from '../with-aside-modal';

import CSS from './CardDeclinedModal.module.scss';

function CardDeclinedModal({ onChangeMethod }) {
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

export default CardDeclinedModal;

CardDeclinedModal.propTypes = {
  onChangeMethod: PropTypes.func.isRequired,
};
