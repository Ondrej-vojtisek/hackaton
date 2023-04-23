// imports to setup polyfills
import "core-js/stable";
import "regenerator-runtime/runtime";

import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { StrictMode } from "react";
import { render } from "react-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";

import { AppLayout, AppRouter } from "src/app";
// @ts-ignore
import favIcon from "src/assets/icons/favicon-32x32.png";
import { ErrorBoundary } from "src/errorHandling";
import { QuestInfoModal, TransactionDetailModal } from "src/modals";
import { store } from "src/setup";

const theme: MantineThemeOverride = {
    primaryColor: "green",
    defaultGradient: {
        from: "teal",
        to: "lime",
        deg: 45,
    },
    loader: "dots",
};

render(
    <StrictMode>
        <ErrorBoundary>
            <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
                <HelmetProvider>
                    <ModalsProvider
                        modals={{
                            transactionDetail: TransactionDetailModal,
                            questModal: QuestInfoModal,
                        }}
                    >
                        <Provider store={store}>
                            <>
                                <Notifications />
                                <Helmet>
                                    <link rel="icon" href={favIcon} />
                                </Helmet>
                                <AppLayout>
                                    <AppRouter />
                                </AppLayout>
                            </>
                        </Provider>
                    </ModalsProvider>
                </HelmetProvider>
            </MantineProvider>
        </ErrorBoundary>
    </StrictMode>,
    document.getElementById("app"),
);
