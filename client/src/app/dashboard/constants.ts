import type { QuestType } from "src/app/dashboard/types";

export const NAME = "dashboard" as const;

export const NUMBER_OF_DAYS_BACK = 7;

export const QUESTS = (): QuestType[] => {
    return [
        {
            questName: "Quest for Nadace Jistota",
            badgeLabel: "Charity",
            progressData: [
                {
                    x: "Done",
                    y: 50,
                },
                {
                    x: "Remains",
                    y: 50,
                },
            ],
            textDescription:
                'Welcome to our "Pay with Purpose" quest! In this quest, you will embark on a journey to make a positive impact on the world by using our partner shops and supporting different charities.',
            questPartnerText:
                "Nadace Komerční banky, a.s. – Jistota pomáhá a podporuje aktivity v oblastech rozvoje občanské společnosti, zdravotně sociálního charakteru, vzdělávání a začleňování jedinců do společnosti. Podílí se na minimalizaci negativních dopadů na životní prostředí a společnost.\n" +
                "\n" +
                "Činnost Nadace Jistota se opírá o tři hlavní pilíře, jimiž jsou:\n" +
                "\n" +
                "Rodina a děti\n" +
                "Hospicová a paliativní péče\n" +
                "Udržitelná budoucnost\n" +
                "Již více než 23 let se podílíme na zlepšování kvality života lidí s různým hendikepem. Přispíváme na projekty neziskových organizací, jež pomáhají lidem překonávat jejich zdravotní nebo sociální znevýhodnění. Podporujeme šetrné a spravedlivé nakládání s přírodními zdroji a respektujeme vzájemné propojení sociálních a environmentálních principů.\n" +
                "\n" +
                "Hlavním dárcem Nadace Jistota je Komerční banka a její dceřiné a sesterské společnosti. Velmi důležití jsou pro nás dárci z řad zaměstnanců Skupiny KB, kteří se pravidelně zapojují do benefičních akcí a interních sbírek.\n" +
                "\n" +
                "Nadace KB Jistota v roce 2022 rozdělila prostředky v rekordní výši 31 584 360 korun. 9 404 154 korun směřovalo na projekty v sociální oblasti. 7 285 663 korun nadace věnovala na projekty pomoci rodinám a dětem, do oblasti paliativní péče mířilo 2 118 491 korun. Na podporu environmentálních projektů bylo rozděleno 4 710 052 korun. Největší část podpory směřovala na humanitární pomoc lidem zasaženým válkou na Ukrajině, a to v celkové výši 17 470 154 korun.\n" +
                "\n" +
                "Číslo účtu Nadace Jistota: 2970297/0100",
            partnerLogo:
                "data:image/png;base64,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",
        },
        {
            questName: "Co2 Quest",
            badgeLabel: "Co2",
            progressData: [
                {
                    x: "Done",
                    y: 10,
                },
                {
                    x: "Remains",
                    y: 90,
                },
            ],
            textDescription:
                'Welcome to our "Reduce CO2 Emissions" quest! In this quest, you will embark on a journey to reduce your carbon footprint by using our partner shops and reducing your overall CO2 emissions.',
            questPartnerText:
                "Patagonia has a strong commitment to sustainability and social responsibility, which is reflected in their\n                            business practices and products. Patagonia's sustainability initiatives include using recycled and\n                            environmentally friendly materials, reducing waste through their Worn Wear program, and investing in renewable\n                            energy. They also support grassroots environmental organizations through their 1% for the Planet program, which\n                            donates 1% of their sales to these organizations. In addition to their sustainability efforts, Patagonia is also\n                            committed to ethical labor practices and supports worker empowerment initiatives such as Fair Trade\n                            certification. They have also taken a stance on social and political issues, such as climate change and public\n                            lands protection, and use their platform to advocate for positive change. Overall, Patagonia's commitment to\n                            sustainability and social responsibility sets them apart as an ESG friendly merchant that is dedicated to\n                            creating a better world.",
            partnerLogo:
                "https://images.unsplash.com/photo-1611176347637-91b4e714c065?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        },
        {
            questName: "Water quest",
            badgeLabel: "Water",
            progressData: [
                {
                    x: "Done",
                    y: 20,
                },
                {
                    x: "Remains",
                    y: 80,
                },
            ],
            textDescription:
                'Welcome to our "Reduce Water Consumption" quest! In this quest, you will embark on a journey to save water by using our partner shops and reducing your overall water consumption.',
            questPartnerText:
                "Patagonia has a strong commitment to sustainability and social responsibility, which is reflected in their\n                            business practices and products. Patagonia's sustainability initiatives include using recycled and\n                            environmentally friendly materials, reducing waste through their Worn Wear program, and investing in renewable\n                            energy. They also support grassroots environmental organizations through their 1% for the Planet program, which\n                            donates 1% of their sales to these organizations. In addition to their sustainability efforts, Patagonia is also\n                            committed to ethical labor practices and supports worker empowerment initiatives such as Fair Trade\n                            certification. They have also taken a stance on social and political issues, such as climate change and public\n                            lands protection, and use their platform to advocate for positive change. Overall, Patagonia's commitment to\n                            sustainability and social responsibility sets them apart as an ESG friendly merchant that is dedicated to\n                            creating a better world.",
            partnerLogo: "https://nationaltoday.com/wp-content/uploads/2021/10/Levi-Strauss-Day.jpg",
        },
    ];
};

export const co2Consumption = [
    { x: "12/12/2022", y: 6 },
    { x: "13/12/2022", y: 12 },
    { x: "14/12/2022", y: 22 },
    { x: "15/12/2022", y: 12 },
    { x: "16/12/2022", y: 33 },
];

export const water2Consumption = [
    { x: "12/12/2022", y: 13 },
    { x: "13/12/2022", y: 44 },
    { x: "14/12/2022", y: 155 },
    { x: "15/12/2022", y: 122 },
    { x: "16/12/2022", y: 33 },
];

export const insightData = [
    { x: "0", y: 40 },
    { x: "10", y: 70 },
    { x: "20", y: 88 },
    { x: "30", y: 70 },
    { x: "40", y: 60 },
    { x: "50", y: 40 },
    { x: "60", y: 30 },
    { x: "70", y: 20 },
    { x: "80", y: 12 },
    { x: "90", y: 10 },
    { x: "100", y: 9 },
];
