import { Items, Text } from 'components';
import Button from 'components/button';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { WithAsideModal } from '../../containers/WithAsideModal';
import { useStyles } from './PlanCancelModal.styles';

export function PlanCancelModal({ onSubmit }) {
  const classes = useStyles();

  return (
    <WithAsideModal>
      <Items flow="row">
        <Items flow="row" gap={0}>
          <Items flow="row">
            <Text weight={4} size={4.5} className={classes.title}>
              <FormattedMessage id="PlanCancelModal.title" />
            </Text>
            <Text size={1.5} className={classes.text}>
              <FormattedMessage id="PlanCancelModal.text" />
            </Text>
          </Items>
          <Items flow="row">
            <Button buttonStyle="primary" onClick={onSubmit}>
              <FormattedMessage id="PlanCancelModal.submit" />
            </Button>
          </Items>
        </Items>
      </Items>
    </WithAsideModal>
  );
}
