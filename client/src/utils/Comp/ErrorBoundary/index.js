import React from 'react';
import ErrorDisplay from '../ErrorDisplay';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    // Reset error state to retry
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      const { fallback: FallbackComponent, title, showRetry = true } = this.props;
      
      if (FallbackComponent) {
        return <FallbackComponent error={this.state.error} onRetry={this.handleRetry} />;
      }
      
      return (
        <ErrorDisplay
          error={this.state.error}
          title={title || 'Something went wrong'}
          onRetry={showRetry ? this.handleRetry : null}
          showRetry={showRetry}
          fullPage={true}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
