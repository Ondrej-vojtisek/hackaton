import type { EmptyObject } from "src/types";
import { getEmptyObject } from "src/utils";

const TRANSACTION = "transactions" as const;
const USER = "user" as const;

type Path = string;

type PathParams = Readonly<Record<string, string>>;

type Route<P extends PathParams> = Readonly<{
    path: Path;
    fillPathParams: (params?: P) => Path;
    useParams: () => P;
}>;

const createSimpleRoute = (path: Path): Route<EmptyObject> => ({
    path,
    fillPathParams: () => path,
    useParams: getEmptyObject,
});

export const routes = {
    dashboard: createSimpleRoute(`/`),
    transactions: createSimpleRoute(`/${TRANSACTION}`),
    user: createSimpleRoute(`/${USER}`),
} as const;
