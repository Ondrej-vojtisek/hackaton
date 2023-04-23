import {
    Badge,
    Box,
    Button,
    Card,
    Flex,
    Grid,
    Group,
    LoadingOverlay,
    NavLink,
    Progress,
    Stack,
    Table,
    Text,
    ThemeIcon,
    Title,
} from "@mantine/core";
import { IconChessQueen, IconPlugConnectedX } from "@tabler/icons-react";
import type { FC } from "react";

import { useGetUserQuery } from "src/serverApi";

export type HomeProps = Readonly<{}>;

export const User: FC<HomeProps> = () => {
    const { data, isLoading } = useGetUserQuery();

    const rows = data ? (
        <tr key={data.ownerName}>
            <td>{data.productName}</td>
            <td>{data.accountNumber}</td>
        </tr>
    ) : null;

    return (
        <>
            <LoadingOverlay visible={isLoading} />
            <Stack spacing="lg">
                <Title>User detail</Title>
                <Grid grow justify="center">
                    <Grid.Col xl={1}>
                        <Stack>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section withBorder inheritPadding py="xs">
                                    <Group position="apart">
                                        <Text weight={500}>{data?.ownerName}</Text>
                                        <Flex gap="xs" align="center">
                                            <Text weight={500} size="0.8rem">
                                                Currency:
                                            </Text>
                                            <Text weight={700}>{data?.currency}</Text>
                                        </Flex>
                                    </Group>
                                </Card.Section>
                            </Card>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section withBorder inheritPadding py="xs">
                                    <Stack spacing="sm">
                                        <Group>
                                            <Text weight={500}>Your current level:</Text>
                                            <Badge>Novice</Badge>
                                        </Group>
                                        <Progress
                                            radius="xl"
                                            size={18}
                                            sections={[{ value: 33, color: "lime", label: "333 Exp", tooltip: "Remaining 667 Exp" }]}
                                        />
                                    </Stack>
                                </Card.Section>
                                <Card.Section inheritPadding py="xs">
                                    <Text size="sm" mb="sm">
                                        You can also earn experience by completing quests.
                                    </Text>
                                    <NavLink
                                        label="Show me all quests"
                                        component="a"
                                        href="/quests"
                                        icon={
                                            <ThemeIcon color="gray" variant="filled">
                                                <IconChessQueen size="1rem" />
                                            </ThemeIcon>
                                        }
                                    />
                                </Card.Section>
                                <Card.Section inheritPadding py="xs" withBorder>
                                    <Text size="sm" color="dimmed">
                                        Small steps each day lead to big improvements over time. Keep taking those steps!
                                    </Text>
                                </Card.Section>
                            </Card>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col xl={1}>
                        <Stack>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section withBorder inheritPadding py="xs">
                                    <Text weight={500}>Connected accounts</Text>
                                </Card.Section>
                                <Card.Section inheritPadding py="xs">
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Bank name</th>
                                                <th>Account number</th>
                                            </tr>
                                        </thead>
                                        <tbody>{rows}</tbody>
                                    </Table>
                                </Card.Section>
                            </Card>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section withBorder inheritPadding py="xs">
                                    <Text weight={500}>Connected applications</Text>
                                </Card.Section>
                                <Card.Section inheritPadding py="xs">
                                    <Box
                                        sx={(theme) => ({
                                            paddingInline: theme.spacing.xl,
                                            paddingBlock: theme.spacing.xs,
                                            borderRadius: theme.radius.md,
                                            backgroundColor: theme.colors.gray[1],
                                        })}
                                    >
                                        <Group position="apart">
                                            <Text size="sm" weight={500}>
                                                My app
                                            </Text>
                                            <Button leftIcon={<IconPlugConnectedX size="1rem" />} color="red" compact variant="filled">
                                                Disconnect
                                            </Button>
                                        </Group>
                                    </Box>
                                </Card.Section>
                            </Card>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Stack>
        </>
    );
};
