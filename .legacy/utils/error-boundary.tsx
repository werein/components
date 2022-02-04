import { captureException } from "@sentry/react";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error);
    captureException(errorInfo);
  }

  render() {
    if ((this.state as any).hasError) {
      // You can render any custom fallback UI
      return <h1>Tato funkcionalita je momentálně nedostupná</h1>;
    }

    return this.props.children;
  }
}
