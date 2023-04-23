import { typeCheckAppModule } from "src/utils";
import { NAME } from "./constants";
import { Transactions } from "./Transactions";

export const transactions = typeCheckAppModule({
    NAME,
    Container: Transactions,
});
