import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { EXAMPLE_TAG, HINT_TAG, TRANSACTIONS_TAG, USER_TAG } from "./tags";
import { getBeBaseUrl } from "./utils";

export const rootApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: getBeBaseUrl(),
    }),
    endpoints: () => ({}),
    tagTypes: [TRANSACTIONS_TAG, EXAMPLE_TAG, USER_TAG, HINT_TAG],
});
