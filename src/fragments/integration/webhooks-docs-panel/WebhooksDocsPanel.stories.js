import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { Container } from 'components/overlay';
import WebhooksDocsPanel from '.';

storiesOf('fragments/integration/WebhooksDocsPanel', module).add(
  'Default',
  () => (
    <>
      <Container />
      <BrowserRouter>
        <WebhooksDocsPanel />
      </BrowserRouter>
    </>
  ),
);
