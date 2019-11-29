import { Box } from '@material-ui/core';
import classNames from 'classnames';
import Text from 'components/text';
import { isEmpty } from 'lodash';
import React from 'react';
import { useIntl } from 'react-intl';

export function Header({ fullName, dateCreated }) {
  const intl = useIntl();

  return (
    <Box pl={1.5}>
      <Box pb={1.5}>
        <Text size={4.5} weight={4} color={classNames({ gray: isEmpty(fullName) })}>
          {fullName || intl.formatMessage({ id: 'identity.nameNotFound' })}
        </Text>
      </Box>
      {dateCreated && (
        <p>
          <Text color="gray">{dateCreated}</Text>
        </p>
      )}
    </Box>
  );
}
