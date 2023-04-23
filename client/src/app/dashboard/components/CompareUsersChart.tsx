import { SimpleGrid, Text, Title, useMantineTheme } from "@mantine/core";
import type { FC } from "react";
import { Bar, VictoryBar, VictoryChart } from "victory";

import { insightData } from "src/app/dashboard/constants";

export type CompareUsersChartProps = Readonly<{}>;
export const CompareUsersChart: FC<CompareUsersChartProps> = () => {
    const theme = useMantineTheme();

    return (
        <SimpleGrid cols={1}>
            <Title order={5}>How do you compare with other users️</Title>
            <VictoryChart domainPadding={{ x: 50, y: [0, 20] }} scale={{ x: "time" }}>
                <VictoryBar
                    style={{
                        data: {
                            fill: ({ datum }) => (datum.x === "70" ? theme.colors.lime[9] : theme.colors.lime[5]),
                            stroke: "transparent",
                            fillOpacity: 0.7,
                            strokeWidth: 3,
                        },
                    }}
                    dataComponent={<Bar />}
                    data={insightData}
                />
            </VictoryChart>
            <Text fz="sm" ta="center">
                Your Co2 and Water consumption is lower then 70% of other users.
            </Text>
        </SimpleGrid>
    );
};
