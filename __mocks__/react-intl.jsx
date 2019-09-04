import React from 'react';

const Intl = jest.genMockFromModule('react-intl');

// Here goes intl context injected into component, feel free to extend
const intl = {
  formatMessage: ({ defaultMessage }) => defaultMessage,
};

Intl.injectIntl = (Node) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const renderWrapped = (props) => <Node {...props} intl={intl} />;
  renderWrapped.displayName = Node.displayName || Node.name || 'Component';
  return renderWrapped;
};

Intl.FormattedMessage = ({ id }) => id;
Intl.FormattedHTMLMessage = Intl.FormattedMessage;

module.exports = Intl;
