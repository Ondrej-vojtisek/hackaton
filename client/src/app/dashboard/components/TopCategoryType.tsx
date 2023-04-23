import { SimpleGrid, Title } from "@mantine/core";
import type { FC } from "react";
import { VictoryArea, VictoryChart, VictoryPolarAxis, VictoryTheme } from "victory";

export type TopCategoryChartProps = Readonly<{}>;
export const TopCategoryChart: FC<TopCategoryChartProps> = () => {
    const chartData = [
        { x: "Doctors and Physicians", y: 10 },
        { x: "Hospitals", y: 10 },
        { x: "Book Stores", y: 10 },
        { x: "Sporting Goods Stores", y: 10 },
        { x: "Amusement and Recreation Services", y: 10 },
    ];

    return (
        <SimpleGrid cols={1}>
            <Title order={5}>Your TOP green categories 🫶🏻</Title>
            <VictoryChart polar theme={VictoryTheme.material}>
                <VictoryPolarAxis dependentAxis style={{ axis: { stroke: "none" } }} tickFormat={(t) => `${Math.round(t)}k`} />
                <VictoryArea data={chartData} interpolation={null} label="TopCategoryChart" />
            </VictoryChart>
        </SimpleGrid>
    );
};
