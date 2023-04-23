import {
    ActionIcon,
    Badge,
    Box,
    Group,
    List,
    LoadingOverlay,
    MediaQuery,
    SimpleGrid,
    Stack,
    Table,
    Text,
    Title,
    useMantineTheme,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconListDetails } from "@tabler/icons-react";
import type { FC } from "react";

import { useGetTransactionsQuery } from "src/serverApi";

export type HomeProps = Readonly<{}>;

const round = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

export const Transactions: FC<HomeProps> = () => {
    const theme = useMantineTheme();
    const { data, isLoading } = useGetTransactionsQuery();

    const rows = data?.map((row) => {
        return (
            <tr key={row.referenceNumber}>
                <td>{new Date(row.dateTime).toLocaleDateString("en-US")}</td>
                <td>{row.merchant}</td>
                <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                    <td>{row.category}</td>
                </MediaQuery>
                <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                    <td style={{ textAlign: "right" }}>{`${row.amount} CZK`}</td>
                </MediaQuery>
                <td style={{ textAlign: "center" }}>
                    <Badge>{row.esgScore}</Badge>
                </td>
                <td>
                    <ActionIcon
                        onClick={() =>
                            modals.openContextModal({
                                modal: "transactionDetail",
                                title: `Transaction detail`,
                                innerProps: {
                                    modalBody: (
                                        <Stack>
                                            <SimpleGrid col="2">
                                                <Group>
                                                    <Text weight={700}>CO₂ Consumption (kg)</Text>
                                                    <Badge size="xl" color="gray">
                                                        {round(row.co2Consumption)}
                                                    </Badge>
                                                </Group>
                                                <Group>
                                                    <Text weight={700}>Water Consumption (l)</Text>
                                                    <Badge size="xl" color="blue">
                                                        {round(row.waterConsumption)}
                                                    </Badge>
                                                </Group>
                                            </SimpleGrid>
                                            <Box
                                                sx={{
                                                    paddingTop: theme.spacing.sm,
                                                    borderTop: `1px solid ${
                                                        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
                                                    }`,
                                                }}
                                            >
                                                <List size="sm">
                                                    <List.Item>{`Reference number: ${row.referenceNumber}`}</List.Item>
                                                    <List.Item>{`Date: ${new Date(row.dateTime).toLocaleDateString("en-US")}`}</List.Item>
                                                    <List.Item>{`Merchant: ${row.merchant}`}</List.Item>
                                                    <List.Item>{`Category: ${row.category}`}</List.Item>
                                                    <List.Item>
                                                        {`ESG score: `}
                                                        <Badge>{row.esgScore}</Badge>
                                                    </List.Item>
                                                </List>
                                            </Box>
                                        </Stack>
                                    ),
                                },
                            })
                        }
                        title="Transaction detail"
                        variant="subtle"
                    >
                        <IconListDetails size="1rem" />
                    </ActionIcon>
                </td>
            </tr>
        );
    });

    return (
        <>
            <LoadingOverlay visible={isLoading} />
            <Stack spacing="lg">
                <Title>Transactions</Title>
                <Table highlightOnHover captionSide="bottom">
                    <caption>Powered by Finbricks and Doconomy API</caption>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Merchant</th>
                            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                                <th>Category</th>
                            </MediaQuery>
                            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                                <th style={{ textAlign: "right" }}>Amount</th>
                            </MediaQuery>
                            <th style={{ textAlign: "center" }}>ESG Score</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Stack>
        </>
    );
};
