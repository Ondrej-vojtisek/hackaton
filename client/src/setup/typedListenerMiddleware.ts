import type { ListenerMiddlewareInstance } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";

import type { AppDispatch, AppState, EmptyActionCreator } from "src/types";
import { listenerMiddleware as untypedListenerMiddleware } from "./listenerMiddleware";

// Cannot be typed by generics during creation, because there is cyclic dependency middleware => AppState => store => middleware.
export const listenerMiddleware = untypedListenerMiddleware as ListenerMiddlewareInstance<AppState, AppDispatch>;

export const appInitAction: EmptyActionCreator = createAction("APP_INIT");

export type AppInitAction = ReturnType<typeof appInitAction>;
