import React from 'react';
import { storiesOf } from '@storybook/react';
import CompaniesUsingMati from '.';

const stories = storiesOf('fragments/info/CompaniesUsingMati', module);

stories.add('Default', () => <CompaniesUsingMati />);
