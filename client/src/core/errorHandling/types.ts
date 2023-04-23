import type { ListenerErrorInfo } from "@reduxjs/toolkit/dist/listenerMiddleware/types";

/**
 * Type of function for handling of errors from root reducer. Type of error is unknown, because this is type from catch().
 * Listener itself may narrow it down by type guards if needed.
 */
export type ReducerErrorListener = (error: unknown) => void;

/**
 * Type of function for handling of errors from listener middleware.
 */
export type ListenerMiddlewareErrorListener = (error: unknown, errorInfo: ListenerErrorInfo) => void;

export enum ErrorSource {
    component = "Component",
    reducer = "Reducer",
    listenerMiddleware = "ListenerMiddleware",
}

/**
 * Http status codes. Values are not exhaustive. More may be added according to
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
 */
export enum HttpStatus {
    ok = 200,
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    internalServerError = 500,
}
