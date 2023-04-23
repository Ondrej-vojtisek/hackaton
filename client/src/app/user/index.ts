import { typeCheckAppModule } from "src/utils";
import { NAME } from "./constants";
import { User } from "./User";

export const user = typeCheckAppModule({
    NAME,
    Container: User,
});
