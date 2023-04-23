import { rootApi } from "../../rootApi";
import { HINT_TAG, USER_TAG } from "../../tags";

type User = {
    ownerName: string;
    countryCode: string;
    iban: string;
    currency: string;
    accountNumber: string;
    productName: number;
};

const userApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => {
                return {
                    url: "/owner",
                };
            },
            keepUnusedDataFor: 0,
            providesTags: [USER_TAG],
        }),
        getHint: builder.query<string, void>({
            query: () => ({
                url: "/ai/hint",
                responseHandler: (response) => response.text(),
            }),
            keepUnusedDataFor: 0,
            providesTags: [HINT_TAG],
        }),
    }),
});

export const { useGetUserQuery, useGetHintQuery } = userApi;
