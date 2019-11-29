import classNames from 'classnames';
import { Card } from 'components';
import Text, { H2 } from 'components/text';
import React from 'react';
import { useIntl } from 'react-intl';
import { cardBox } from './HelpMessage.module.scss';
import IntlMessage from './IntlMessage';
import { MessageTable } from './MessageTable';

const defaultNameSpace = 'fragments.verifications.help-messages';

const HelpMessage = ({ id }) => {
  const intl = useIntl();
  const im = new IntlMessage(defaultNameSpace, id, intl.messages);

  return (
    <Card className={classNames(id, cardBox)}>
      <H2>
        { intl.formatMessage({ id: im.getNode('title') }) }
      </H2>
      <Text>
        { intl.formatMessage({ id: im.getNode('subtitle') }) }
      </Text>
      <MessageTable data={im.getTable()} />
    </Card>
  );
};

export default HelpMessage;
