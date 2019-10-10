import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { isEmpty } from 'lodash';

import { Card } from 'components';
import Text, { H2 } from 'components/text';

import MessageTable from './MessageTable';
import IntlMessage from './IntlMessage';
import { cardBox } from './HelpMessage.module.scss';

const defaultNameSpace = 'fragments.verifications.help-messages';

const HelpMessage = ({
  id,
  className,
  namespace = defaultNameSpace,
  data,
}) => {
  const intl = useIntl();
  const langData = isEmpty(data) ? intl.messages : data;
  const im = new IntlMessage(namespace, id, langData);

  return (
    <Card className={classNames(id, cardBox, className)}>
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

HelpMessage.propTypes = {
  data: PropTypes.shape(),
  id: PropTypes.string.isRequired,
  namespace: PropTypes.string,
};

HelpMessage.defaultProps = {
  data: {},
  namespace: defaultNameSpace,
};
