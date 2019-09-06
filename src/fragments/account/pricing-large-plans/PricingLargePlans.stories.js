import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PricingLargePlans from '.';

const stories = storiesOf('fragments/account/PricingLargePlans', module);

stories.add('Default', () => <PricingLargePlans onClick={action('Click')} />);
