import React, { ErrorInfo } from 'react';

/* eslint-disable react/destructuring-assignment */

interface IErrorBoundaryProps {
  children: React.ReactNode;
  onError: (error: Error, errorInfo: ErrorInfo) => void;
}

export class ErrorCatch extends React.Component<IErrorBoundaryProps> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = null;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    return this.props.children;
  }
}

/* eslint-enable react/destructuring-assignment */
