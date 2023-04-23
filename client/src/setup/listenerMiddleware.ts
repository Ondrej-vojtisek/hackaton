import { createListenerMiddleware } from "@reduxjs/toolkit";

import { GlobalErrorEvents } from "src/errorHandling";

export const listenerMiddleware = createListenerMiddleware({
    onError: GlobalErrorEvents.triggerListenerMiddlewareErrorEvent,
});
