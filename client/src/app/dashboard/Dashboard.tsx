import { LoadingOverlay, SimpleGrid, Stack, Title, useMantineTheme } from "@mantine/core";
import type { FC } from "react";

import { ActiveQuest } from "src/app/dashboard/components/ActiveQuest";
import { CompareUsersChart } from "src/app/dashboard/components/CompareUsersChart";
import { ConsumptionChart } from "src/app/dashboard/components/ConsumptionChart";
import { NUMBER_OF_DAYS_BACK } from "src/app/dashboard/constants";
import type { ChartDataType } from "src/app/dashboard/types";
import { useGetTransactionsQuery } from "src/serverApi";

export type DashboardProps = Readonly<{}>;

export const Dashboard: FC<DashboardProps> = () => {
    const { data, isLoading } = useGetTransactionsQuery();
    const theme = useMantineTheme();
    const co2Color = theme.colors.dark[5];
    const h2oColor = theme.colors.cyan[5];

    const extractCo2ChartData = () => {
        const chartData: ChartDataType = [];

        data?.forEach((transaction) => {
            const y: number = transaction.co2Consumption;
            chartData.push({
                x: new Date(transaction.dateTime).toLocaleDateString("en-US"),
                y,
            });
        });

        return chartData;
    };

    const extractWaterChartData = () => {
        const chartData: ChartDataType = [];

        data?.forEach((transaction) => {
            const y: number = transaction.waterConsumption;
            chartData.push({
                x: new Date(transaction.dateTime).toLocaleDateString("en-US"),
                y,
            });
        });

        return chartData;
    };

    return (
        <>
            <LoadingOverlay visible={isLoading} />
            <Stack spacing="lg">
                <Title>Dashboard</Title>
                <SimpleGrid cols={3}>
                    <ConsumptionChart
                        title="Your daily CO2 consumption"
                        data={isLoading ? [{ x: "", y: 0 }] : extractCo2ChartData().slice(NUMBER_OF_DAYS_BACK)}
                        yAxisTick="g"
                        fillColor={co2Color}
                    />
                    <ConsumptionChart
                        title="Your daily H20 consumption"
                        data={isLoading ? [{ x: "", y: 0 }] : extractWaterChartData().slice(NUMBER_OF_DAYS_BACK)}
                        yAxisTick="L"
                        fillColor={h2oColor}
                    />
                    <CompareUsersChart />
                </SimpleGrid>
                <Title>Quests</Title>
                <ActiveQuest />
            </Stack>
        </>
    );
};
