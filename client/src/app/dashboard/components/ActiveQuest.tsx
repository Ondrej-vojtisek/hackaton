import { Badge, Box, Button, Card, Flex, Group, Image, Text, useMantineTheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import type { FC } from "react";
import styled from "styled-components";
import { VictoryPie } from "victory";

import { QUESTS } from "src/app/dashboard/constants";
import type { QuestType } from "src/app/dashboard/types";

type ActiveQuestProps = Readonly<{}>;

export const ActiveQuest: FC<ActiveQuestProps> = () => {
    const theme = useMantineTheme();
    const doneColor = theme.colors.green[9];
    const undoneColor = theme.colors.green[7];
    const badgeColor = theme.colors.pink[3];

    const modalForQuestInfo = (text: string, imageSrc: string) => {
        return (
            <Box maw={300} mx="auto">
                <Flex justify="center" align="center" direction="row" wrap="wrap" gap="xl">
                    <Image maw={240} mx="auto" radius="md" src={imageSrc} alt="Random image" />
                    <Text>{text}</Text>
                </Flex>
            </Box>
        );
    };

    const questCard = (quest: QuestType) => (
        <CardWrapper>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    <PieWrapper>
                        <VictoryPie
                            innerRadius={100}
                            data={quest.progressData}
                            style={{
                                data: { fill: ({ datum }) => (datum.x === "Done" ? doneColor : undoneColor) },
                            }}
                        />
                    </PieWrapper>
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{quest.questName}</Text>
                    <Badge color={badgeColor}>{quest.badgeLabel}</Badge>
                </Group>

                <Text size="sm" color="dimmed">
                    {quest.textDescription}
                </Text>

                <Button
                    onClick={() =>
                        modals.openContextModal({
                            modal: "questModal",
                            title: "Quest Partner detail",
                            innerProps: {
                                modalBody: modalForQuestInfo(quest.questPartnerText, quest.partnerLogo),
                            },
                        })
                    }
                    variant="light"
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                >
                    More info about Partner of this Quest
                </Button>
            </Card>
        </CardWrapper>
    );

    const renderAllQuests = (quests: QuestType[]) => {
        return quests.map((quest) => {
            return questCard(quest);
        });
    };

    return (
        <GroupWrapper>
            <StyledGroup grow>{renderAllQuests(QUESTS())}</StyledGroup>
        </GroupWrapper>
    );
};

const PieWrapper = styled.div`
    width: 150px;
    height: 150px;
    margin: 0 auto;
`;

const StyledGroup = styled(Group)`
    align-items: flex-start;
`;

const CardWrapper = styled.div`
    width: 280px;
`;

const GroupWrapper = styled.div`
    padding-bottom: 60px;
`;
