import { BrowserRouter, Route, Routes } from "react-router-dom";

import { dashboard } from "./dashboard";
import { routes } from "./routes";
import { transactions } from "./transactions";
import { user } from "./user";

export const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path={routes.dashboard.path} element={<dashboard.Container />} />
            <Route path={routes.user.path} element={<user.Container />} />
            <Route path={routes.transactions.path} element={<transactions.Container />} />

            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    </BrowserRouter>
);
