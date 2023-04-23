import type { ApplicationModule, EmptyObject } from "src/types";

export const EMPTY_OBJECT = {};
export const getEmptyObject = (): EmptyObject => EMPTY_OBJECT;

export const typeCheckAppModule = <M extends ApplicationModule>(module: M): M => module;
