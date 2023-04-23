import type { ListenerErrorInfo } from "@reduxjs/toolkit/dist/listenerMiddleware/types";
import { Component, ErrorInfo, ReactNode } from "react";

import { GlobalErrorEvents } from "../GlobalErrorEvents";
import { ErrorSource } from "../types";
import { ErrorPage } from "./ErrorPage";

type ErrorBoundaryProps = Readonly<{
    children: ReactNode;
}>;
type ErrorBoundaryState = Readonly<{
    hasError: boolean;
    source?: ErrorSource;
    error?: unknown;
}>;

/**
 * Global error boundary component which catch unhandled errors from components (this does not include asynchronous code and event handlers).
 * It also provides handlers for errors from reducers and redux listeners.
 * These are forwarded to this component by {@link GlobalErrorEvents}.
 *
 * All kinds of error cause display of {@link ErrorPage} component and log of error.
 *
 * @see https://reactjs.org/docs/error-boundaries.html
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    /**
     * Logs error. Error is currently logged to console. It may be enhanced to use logging module which will forward error to Sentry.
     * @param error
     * @param errorInfo
     * @private
     */
    private static logError(error: unknown, errorInfo?: ErrorInfo | ListenerErrorInfo): void {
        // eslint-disable-next-line no-console
        console.error("Unhandled error was thrown. Additional error info: %O", errorInfo, error);
    }

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, source: undefined, error: undefined };
        GlobalErrorEvents.registerListenerMiddlewareErrorListener(this.listenerMiddlewareErrorHandler.bind(this));
        GlobalErrorEvents.registerReducerErrorListener(this.reducerErrorHandler.bind(this));
    }

    static getDerivedStateFromError(error: unknown) {
        return { hasError: true, source: ErrorSource.component, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        ErrorBoundary.logError(error, errorInfo);
    }

    public reducerErrorHandler(error: unknown): void {
        this.setState({ hasError: true, source: ErrorSource.reducer, error });
        ErrorBoundary.logError(error);
    }

    public listenerMiddlewareErrorHandler(error: unknown, errorInfo: ListenerErrorInfo): void {
        this.setState({ hasError: true, source: ErrorSource.listenerMiddleware, error });
        ErrorBoundary.logError(error, errorInfo);
    }

    render() {
        const { hasError, error, source } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <ErrorPage source={source} error={error} />;
        }
        return children;
    }
}
