import {
    AppShell,
    Avatar,
    Box,
    Burger,
    Flex,
    Footer,
    Group,
    Header,
    MediaQuery,
    Navbar,
    Skeleton,
    Text,
    UnstyledButton,
    useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBulb, IconChevronRight } from "@tabler/icons-react";
import { FC, ReactNode, useEffect, useState } from "react";

import { routes } from "src/app/routes";
import { useGetHintQuery, useGetUserQuery } from "src/serverApi";
import { Links } from "./Links";
import { Logo } from "./Logo";

type AppLayoutProps = Readonly<{
    children: ReactNode;
}>;

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    const theme = useMantineTheme();
    const { data: user, isLoading: isLoadingUser } = useGetUserQuery();
    const { data: hint, isLoading: isLoadingHint } = useGetHintQuery();
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (!isLoadingHint && hint) {
            timer = setTimeout(() => {
                notifications.show({
                    withCloseButton: true,
                    autoClose: false,
                    title: "Did you know?",
                    message: hint,
                    icon: <IconBulb />,
                    // @ts-ignore
                    styles: () => ({
                        root: {
                            backgroundColor: theme.colors.green[6],
                            borderColor: theme.colors.green[6],
                        },

                        title: { color: theme.white, fontWeight: 700 },
                        description: { color: theme.white },
                        closeButton: {
                            color: theme.white,
                            "&:hover": { backgroundColor: theme.colors.green[7] },
                        },
                    }),
                });
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [theme, hint, isLoadingHint]);

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    <Navbar.Section grow>
                        <Links />
                    </Navbar.Section>
                    <Navbar.Section>
                        <Box
                            sx={{
                                paddingTop: theme.spacing.sm,
                                marginBottom: theme.spacing.xs,
                                borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
                            }}
                        >
                            <UnstyledButton
                                sx={{
                                    display: "block",
                                    width: "100%",
                                    padding: theme.spacing.xs,
                                    borderRadius: theme.radius.sm,
                                    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

                                    "&:hover": {
                                        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
                                    },
                                }}
                                onClick={() => {
                                    window.location.href = routes.user.path;
                                }}
                            >
                                <Group>
                                    <Avatar radius="xl" />
                                    <Box sx={{ flex: 1 }}>
                                        <Skeleton visible={isLoadingUser}>
                                            <Text size="sm" weight={500}>
                                                {user?.ownerName}
                                            </Text>
                                        </Skeleton>
                                        <Text color="dimmed" size="xs">
                                            Novice
                                        </Text>
                                    </Box>
                                    <IconChevronRight />
                                </Group>
                            </UnstyledButton>
                        </Box>
                    </Navbar.Section>
                </Navbar>
            }
            footer={
                <Footer p="xs" height={42}>
                    <Flex justify="center" align="center">
                        <Text fz="sm">Morosystems.cz</Text>
                    </Flex>
                </Footer>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                            <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" color={theme.colors.gray[6]} mr="xl" />
                        </MediaQuery>
                        <Group spacing="xs">
                            <Logo />
                            <Text variant="gradient" fz="xl" fw={700}>
                                Impactly
                            </Text>
                        </Group>
                    </div>
                </Header>
            }
        >
            {children}
        </AppShell>
    );
};
