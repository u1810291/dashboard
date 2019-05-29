import React from 'react';
import classNames from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';

import { Card } from 'components';
import { default as Text, H2 } from 'components/text';

import MessageTable from './MessageTable';
import IntlMessage from './IntlMessage';
import { cardBox } from './HelpMessage.module.scss';

const defaultNameSpace = 'fragments.verifications.help-messages';

const HelpMessage = ({
    id,
    intl,
    className,
    namespace = defaultNameSpace,
    data
  }) => {
    const im = new IntlMessage(namespace, id, (data || intl.messages));
    return (
      <Card className={classNames(id, cardBox, className)}>
        <H2>
          <FormattedMessage id={im.getNode('title')} />
        </H2>
        <Text>
          <FormattedMessage id={im.getNode('subtitle')} />
        </Text>
        <MessageTable data={im.getTable()} />
      </Card>
    )
  }

export default injectIntl(HelpMessage);