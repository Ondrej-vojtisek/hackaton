import "react-redux";

import type { StoreDispatch, StoreState } from "./store";

declare module "react-redux" {
    export interface DefaultRootState extends StoreState {}
}

declare module "src/types" {
    export type AppDispatch = StoreDispatch;
    export type AppState = StoreState;
}
