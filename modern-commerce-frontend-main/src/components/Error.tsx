import { AlertOctagon } from 'lucide-react';
import { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  state: Readonly<{ hasError: boolean }> = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('Error Occurred', error, errorInfo);
  }

  render() {
    const { state, props } = this;

    if (!state.hasError) {
      return props.children;
    }

    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-background/60 to-background/95 p-4">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertOctagon className="h-8 w-8 animate-pulse text-destructive" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl font-semibold text-muted-foreground">Something went wrong</p>
          <p className="text-sm text-muted-foreground/80">
            Our team has been notified and is working to resolve the issue.
          </p>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
