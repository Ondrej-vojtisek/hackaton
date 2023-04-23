// @ts-nocheck
import { SimpleGrid, Title } from "@mantine/core";
import type { FC } from "react";
import { VictoryArea, VictoryAxis, VictoryChart, VictoryTheme } from "victory";

export type ConsumptionChartProps = Readonly<{
    title: string;
    yAxisTick: string;
    data: {
        x: string;
        y: number;
    }[];
    fillColor: string;
}>;
export const ConsumptionChart: FC<ConsumptionChartProps> = (props: ConsumptionChartProps) => {
    const { data, title, yAxisTick, fillColor } = props;

    return (
        <SimpleGrid cols={1}>
            <Title order={5}>{title}</Title>
            <VictoryChart theme={VictoryTheme.material} colorScale="warm">
                <VictoryAxis dependentAxis tickFormat={(x: string) => `${x}${yAxisTick}`} />
                <VictoryAxis style={{ tickLabels: { angle: 15 } }} />
                <VictoryArea
                    style={{
                        data: { fill: fillColor },
                    }}
                    data={data}
                    interpolation={null}
                    label="ESG Score"
                />
            </VictoryChart>
        </SimpleGrid>
    );
};
