export type ChartDataType = {
    x: string;
    y: number;
}[];

export type QuestType = {
    questName: string;
    badgeLabel: string;
    textDescription: string;
    progressData: {
        x: string;
        y: number;
    }[];
    questPartnerText: string;
    partnerLogo: string;
};
