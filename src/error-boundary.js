import React from 'react';
import { any } from 'prop-types';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="error_page">
          <h2>Internal server error</h2>
          <p>We are currently trying to fix the problem.</p>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = { children: any.isRequired };
