import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

export default class SentryLogger extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    const { state: { error }, props: { children } } = this;
    if (error) {
      return (
        <button type="button" onClick={() => Sentry.showReportDialog()}>
          Report feedback
        </button>
      );
    } else {
      return children;
    }
  }
}
