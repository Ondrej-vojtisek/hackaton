import { configureStore } from "@reduxjs/toolkit";

import { GlobalErrorEvents } from "src/errorHandling";
import { appInitAction } from "src/listenerMiddleware";
import { rootApi } from "src/serverApi";
import { EMPTY_OBJECT } from "src/utils";
import { listenerMiddleware } from "./listenerMiddleware";
import { getRootReducer } from "./reducer";

const isDevelopment = (): boolean => process.env.NODE_ENV === "development";

const createStore = () => {
    const rootReducer = getRootReducer();
    const errorHandlingReducer: typeof rootReducer = (state, action) => {
        try {
            return rootReducer(state, action);
        } catch (error) {
            GlobalErrorEvents.triggerReducerErrorEvent(error);
            /* Error at this place is unrecoverable, app cannot be used anymore and ErrorPage is displayed.
             * For this reason we can return previous state or empty object and type cast it. */
            return (state ?? EMPTY_OBJECT) as StoreState;
        }
    };

    const store = configureStore({
        reducer: errorHandlingReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: true,
                immutableCheck: false,
            }).prepend(rootApi.middleware, listenerMiddleware.middleware),
        devTools: isDevelopment(),
    });

    store.dispatch(appInitAction());

    return store;
};

export const store = createStore();

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
