import { rootApi } from "../../rootApi";
import { TRANSACTIONS_TAG } from "../../tags";

type Transaction = {
    amount: number;
    category: string;
    dateTime: string;
    merchant: string;
    esgScore: string;
    referenceNumber: number;
    waterConsumption: number;
    co2Consumption: number;
};

const transactionsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query<Array<Transaction>, void>({
            query: () => {
                return {
                    url: "/transactions/all",
                };
            },
            keepUnusedDataFor: 0,
            providesTags: [TRANSACTIONS_TAG],
        }),
    }),
});

export const { useGetTransactionsQuery } = transactionsApi;
