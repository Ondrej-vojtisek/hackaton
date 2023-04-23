import { combineReducers } from "redux";

import { rootApi } from "src/serverApi";

export const getRootReducer = () =>
    combineReducers({
        [rootApi.reducerPath]: rootApi.reducer,
    });
