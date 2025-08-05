import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log to external error reporting service if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: error.message,
        fatal: false
      });
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-black text-white font-matrix flex items-center justify-center p-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="text-matrix-green text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-matrix-green mb-4">
              Algo salió mal
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Ha ocurrido un error inesperado. Por favor, recarga la página para continuar.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-matrix-green/20 border border-matrix-green 
                         text-matrix-green rounded-lg hover:bg-matrix-green/30 
                         transition-colors duration-300 font-matrix"
            >
              Recargar página
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-matrix-green mb-2">
                  Detalles del error (solo en desarrollo)
                </summary>
                <pre className="text-sm text-gray-400 bg-gray-900 p-4 rounded overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;