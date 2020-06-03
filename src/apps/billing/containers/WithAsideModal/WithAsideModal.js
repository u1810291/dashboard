import React from 'react';
import { useIntl } from 'react-intl';
import { Card, Items, Text } from 'components';
import MatiLogoURL from './icons/Mati.svg';
import { ReactComponent as VerificatioTopIcon } from './icons/verificatio-top.svg';
import { ReactComponent as VerificatioBottomIcon } from './icons/verificatio-bottom.svg';
import { useStyles } from './WithAsideModal.styles';

export function WithAsideModal({ children }) {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Items flow="column" gap={0}>
      <Card
        flow="row"
        gap={0}
        background="active"
        padding={3}
        className={classes.withAsideModal}
      >
        <img
          src={MatiLogoURL}
          alt="mati"
          className={classes.image}
        />
        <Text size="6" weight="1" className={classes.title}>
          {intl.formatHTMLMessage({ id: 'CardModal.continueUse' })}
        </Text>
        <Items flow="row" className={classes.phrase}>
          <span className={classes.verificationTop}>
            <VerificatioTopIcon />
          </span>
          <Text size={1.5} weight={1} className={classes.dooplaText}>
            {intl.formatMessage({ id: 'CardModal.dooplaText' })}
          </Text>
          <span className={classes.verificationBottom}>
            <VerificatioBottomIcon />
          </span>
        </Items>
        <Items flow="row" className={classes.doopla}>
          <Text size={1.5} weight={1}>
            {intl.formatMessage({ id: 'CardModal.dooplaCEO.name' })}
          </Text>
          <Text size={1.5} weight={2}>
            {intl.formatMessage({ id: 'CardModal.dooplaCEO.title' })}
          </Text>
        </Items>
      </Card>
      <Card
        flow="row"
        gap={0}
        padding={3}
        className={classes.withAsideModalContent}
      >
        {children}
      </Card>
    </Items>
  );
}
