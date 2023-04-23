import type { ListenerErrorInfo } from "@reduxjs/toolkit/dist/listenerMiddleware/types";

import type { ListenerMiddlewareErrorListener, ReducerErrorListener } from "./types";

/**
 * Provides support for global error handling for redux listeners and root reducer. This class forwards uncaught errors from root reducer and listener middleware
 * to ErrorBoundary component, so it can display generic error page. ErrorBoundary registers its error handler by register methods. Setup module
 * connect trigger methods to error handlers while creating store.
 *
 * Events are not generic, but specific, because they are intended only for specific case of top level, last resort error handling.
 * This class should not be used in API calls error handling.
 */
export class GlobalErrorEvents {
    private static reducerErrorListener?: ReducerErrorListener;

    private static listenerMiddlewareErrorListener?: ListenerMiddlewareErrorListener;

    /**
     * Registers listener which is triggered by unhandled errors in reducers. Only one listener can be registered. Any subsequent calls will discard previously registered listener.
     * If reducer error occurred before registration, listener will not be triggered.
     *
     * This method can be used only by ErrorBoundary component.
     *
     * @param listener Listener to register.
     */
    public static registerReducerErrorListener(listener: ReducerErrorListener) {
        GlobalErrorEvents.reducerErrorListener = listener;
    }

    /**
     * Registers listener which is triggered by unhandled errors in listener middleware. Only one listener can be registered. Any subsequent calls will discard previously registered listener.
     * If error in listener middleware occurred before registration, listener will not be triggered.
     *
     * This method can be used only by ErrorBoundary component.
     *
     * @param listener Listener to register.
     */
    public static registerListenerMiddlewareErrorListener(listener: ListenerMiddlewareErrorListener) {
        GlobalErrorEvents.listenerMiddlewareErrorListener = listener;
    }

    /**
     * Triggers error event for reducer. This method should be used only by setup module.
     * @param error
     */
    public static triggerReducerErrorEvent(error: unknown) {
        if (GlobalErrorEvents.reducerErrorListener) {
            GlobalErrorEvents.reducerErrorListener(error);
        } else {
            // eslint-disable-next-line no-console
            console.warn("Reducer error was triggered before error handler was registered.");
        }
    }

    /**
     * Triggers error event for reducer. This method should be used only by setup module.
     * @param error
     * @param errorInfo
     */
    public static triggerListenerMiddlewareErrorEvent(error: unknown, errorInfo: ListenerErrorInfo) {
        if (GlobalErrorEvents.listenerMiddlewareErrorListener) {
            GlobalErrorEvents.listenerMiddlewareErrorListener(error, errorInfo);
        } else {
            // eslint-disable-next-line no-console
            console.warn("Listener middleware error was triggered before error handler was registered.");
        }
    }

    constructor() {
        throw new Error("GlobalErrorEvents is static class and cannot be instantiated.");
    }
}
