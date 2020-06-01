import clsx from 'clsx';
import { Card } from 'components';
import Text, { H2 } from 'components/text';
import React from 'react';
import { useIntl } from 'react-intl';
import IntlMessage from './IntlMessage';
import { MessageTable } from './MessageTable';
import { useStyles } from './HelpMessage.styles';

const defaultNameSpace = 'fragments.verifications.help-messages';

const HelpMessage = ({ id }) => {
  const intl = useIntl();
  const classes = useStyles();

  const im = new IntlMessage(defaultNameSpace, id, intl.messages);

  return (
    <Card className={clsx(id, classes.cardBox)}>
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
