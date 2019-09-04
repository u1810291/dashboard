import React from 'react';
import { FormattedMessage } from 'react-intl';
import { showIntercom } from 'lib/intercom';
import Card from 'components/card';
import Items from 'components/items';
import Button from 'components/button';
import CSS from './Support.module.scss';
import { ReactComponent as SupportIcon } from './support.svg';

export default function Support() {
  return (
    <Card>
      <Items flow="row">
        <p className={CSS.titleWrapper}>
          <SupportIcon />
          <span className={CSS.title}>
            <FormattedMessage id="settings.support.title" />
          </span>
        </p>
        <p>
          <FormattedMessage id="settings.support.chat" />
        </p>
        <p>
          <Button
            buttonStyle="primary"
            className={CSS.supportButton}
            onClick={showIntercom}
          >
            <FormattedMessage id="settings.support.contact" />
          </Button>
        </p>
      </Items>
    </Card>
  );
}
