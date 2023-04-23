import type { FC } from "react";

import type { ErrorSource } from "../types";

export type ErrorPageProps = Readonly<{
    error?: unknown;
    source?: ErrorSource;
}>;

/**
 * ErrorPage is displayed by ErrorBoundary component when unhandled error occurs in application.
 * This component should be as simple as possible to minimize probability of error occurring within this component, because such
 * error cannot be caught and handled.
 *
 * Type of error is unknown, because it is typed this way in catch(). You may narrow it inside ErrorPage if you want to display different errors in different ways.
 */
export const ErrorPage: FC<ErrorPageProps> = ({ source, error }) => (
    <div>
        <h1>Error</h1>
        <p>We are sorry, some error occurred. Try again or contact support if problems persist.</p>
        <h2>Technical details</h2>
        <div>Error source: {source}</div>
        <div>Error message: {error instanceof Error ? error.message : `${error}`}</div>
    </div>
);
