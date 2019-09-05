import React from 'react';
import { Content } from 'components/application-box';
import Spinner from 'components/spinner';
import CSS from './spinner-page.module.scss';

export default function () {
  return (
    <Content>
      <Spinner className={CSS.spinner} size="large" />
    </Content>
  );
}
