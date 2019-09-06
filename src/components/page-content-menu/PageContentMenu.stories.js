import React from 'react';
import { storiesOf } from '@storybook/react';
import PageContentMenu from '.';

const stories = storiesOf('components/PageContentMenu', module);

stories.add('Default', () => (
  <PageContentMenu>
    <a href="/page1">Menu Item 1</a>
    <a href="/page2" className="active">
      Menu Item 2
    </a>
    <a href="/page3">Menu Item 3</a>
    <span>Static Menu Item 1</span>
  </PageContentMenu>
));
