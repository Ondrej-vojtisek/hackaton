import { NavLink, ThemeIcon } from "@mantine/core";
import { IconDashboard, IconDatabase } from "@tabler/icons-react";
import type { ReactNode } from "react";

import { routes } from "src/app/routes";

interface LinkProps {
    icon: ReactNode;
    color: string;
    label: string;
    href: string;
}

const Link = ({ icon, color, label, href }: LinkProps) => {
    return (
        <NavLink
            key={label}
            active={false}
            label={label}
            component="a"
            href={href}
            icon={
                <ThemeIcon color={color} variant="light">
                    {icon}
                </ThemeIcon>
            }
        />
    );
};

const data = [
    { icon: <IconDashboard size="1rem" />, color: "teal", label: "Dashboard", href: routes.dashboard.path },
    { icon: <IconDatabase size="1rem" />, color: "lime", label: "Transactions", href: routes.transactions.path },
];

export const Links = () => {
    const links = data.map((link) => <Link {...link} key={link.label} />);
    return <div>{links}</div>;
};
