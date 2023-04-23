import { typeCheckAppModule } from "src/utils";
import { NAME } from "./constants";
import { Dashboard } from "./Dashboard";

export const dashboard = typeCheckAppModule({
    NAME,
    Container: Dashboard,
});
