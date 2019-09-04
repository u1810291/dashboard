import React from 'react';
import { storiesOf } from '@storybook/react';
import ChangePlanModal from '.';

const stories = storiesOf('fragments/account/ChangePlanModal', module);

stories.add('Default', () => (
  <ChangePlanModal
    isCustom
    billingCycle="P30D"
    createdAt="2019-08-10T11:20:50.778Z"
    extraPrice={190}
    includedVerifications={120}
    name="Starter"
    order={1}
    subscriptionPrice={18700}
    updatedAt="2019-08-10T11:20:50.778Z"
    _id="5d4ea89238078a4e8209ee57"
  />
));
