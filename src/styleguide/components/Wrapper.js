import React from 'react';
import IntlProvider from 'components/intl-provider';
import { BrowserRouter } from 'react-router-dom';

export default function Wrapper({ children }) {
  return (
    <IntlProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </IntlProvider>
  );
}
