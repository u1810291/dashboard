/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Card, Items, Text } from 'components';

import MatiLogoURL from './icons/Mati.svg';
import { ReactComponent as VerificatioTopIcon } from './icons/verificatio-top.svg';
import { ReactComponent as VerificatioBottomIcon } from './icons/verificatio-bottom.svg';

import CSS from './WithAsideModal.module.scss';

export function WithAsideModal({ children }) {
  return (
    <Items flow="column" gap={0}>
      <Card
        flow="row"
        gap={0}
        background="active"
        padding={3}
        className={CSS.withAsideModal}
      >
        <img
          src={MatiLogoURL}
          alt="mati"
        />
        <Text size="6" weight="1" className={CSS.title}>
          <FormattedHTMLMessage
            id="CardModal.continueUse"
          />
        </Text>
        <Items flow="row" className={CSS.phrase}>
          <span className={CSS.veridicatioTop}>
            <VerificatioTopIcon />
          </span>
          <Text size={1.5} weight={1} className={CSS.dooplaText}>
            <FormattedMessage
              id="CardModal.dooplaText"
            />
          </Text>
          <span className={CSS.veridicatioBottom}>
            <VerificatioBottomIcon />
          </span>
        </Items>
        <Items flow="row" className={CSS.doopla}>
          <Text size={1.5} weight={1}>
            <FormattedMessage
              id="CardModal.dooplaCEO.name"
            />
          </Text>
          <Text size={1.5} weight={2}>
            <FormattedMessage
              id="CardModal.dooplaCEO.title"
            />
          </Text>
        </Items>
      </Card>
      <Card
        flow="row"
        gap={0}
        padding={3}
        className={CSS.withAsideModalContent}
      >
        {children}
      </Card>
    </Items>
  );
}
