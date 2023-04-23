import type { ListenerEffectAPI, PayloadAction, Reducer } from "@reduxjs/toolkit";
import type { ComponentType } from "react";
import type { Selector } from "react-redux";
import type { Action, AnyAction } from "redux";

/**
 * Readonly plain object with values of specified type mapped by keys.
 * @template T - Type of object properties values.
 * @template K - Type of keys, default value is string since it is most common.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type TypedObject<T, K extends keyof any = string> = Readonly<Record<K, T | undefined>>;

/**
 * Plain object with values of specified type mapped by string keys.
 * @template T - Type of object properties values.
 * @template K - Type of keys, default value is string since it is most common.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type MutableTypedObject<T, K extends keyof any = string> = Record<K, T | undefined>;

/**
 * Similar to {@link TypedObject}, but without possibility to yield undefined value. This is suitable for type cast
 * when methods like Object.values or Object.entries are used, because in these cases it cannot use non-existing key
 * for object indexing.
 *
 * @example
 * const typedObject: TypedObject<string> = {
 *     valA: "A",
 *     valB: "C",
 * };
 *
 * // In this case typedObject can be indexed by non-existing key and thus return undefined. Therefore, ExactTypedObject is not suitable for this use case.
 * const getVal = (val: string): string | undefined => typedObject[val];
 *
 * // When used with methods like Object.values, we know that val is always string. It cannot be undefined because only existing keys are used to get values.
 * Object.values(typedObject as ExactTypedObject<string>).forEach((val) => {...});
 *
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type ExactTypedObject<T, K extends keyof any = string> = Readonly<Record<K, T>>;

/**
 * Readonly plain object with values of heterogeneous unknown type, i.e. object which can hold any values.
 */
export type GenericObject = Readonly<Record<string, unknown>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericFunction = (...args: any) => any;

export type TypedFunction<P extends unknown[], R> = (...args: P) => R;

export type EmptyObject = Readonly<Record<never, void>>;

export type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T; // from lodash

/**
 * Option for select box.
 * @template V Type of value.
 */
export type Option<V> = {
    /** Name of value, which is displayed to user */
    readonly text: string;
    /** Value of option */
    readonly value: V;
};

/**
 * Type for object. Is placeholder type to have eslint workaround in one place.
 *
 * GenericObject, EmptyObject, TypedObject, Record, etc are preferred
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ObjectType = object;

/**
 * Helper type which add falsy values to type T.
 * @template T type to which falsy values are added.
 */
export type WithFalsy<T> = T | false | "" | 0 | null | undefined;

/**
 * Type of application module. This type is not meant to be used to directly type your module. That should
 * be done by typeCheckAppModule function.
 * @see typeCheckAppModule
 */
export type ApplicationModule = Readonly<{
    /** Name of module. Must be unique for whole application. */
    NAME: string;
    /** Container component of module if module has user interface or undefined otherwise. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Container?: ComponentType<any>;
    /** Root reducer of module if module has state or undefined otherwise. */
    reducer?: Reducer;
}>;

/**
 * Parametric reducer extends Reducer type from Redux with possibility to pass additional custom parameters to reducer.
 * This is intended for typing of reducers dependent on state from different slice reducer(s).
 * @see https://redux.js.org/usage/structuring-reducers/beyond-combinereducers#sharing-data-between-slice-reducers
 */
export type ParametricReducer<S, Args extends unknown[] = [], A extends Action = AnyAction> = (state: S, action: A, ...params: Args) => S;

/**
 * Semantic type which marks value that can be serialized. This is important for action payloads and state of redux. It is best practice
 * to use only serializable values with redux, otherwise it breaks dev tools.
 *
 * This type currently does not provide any type checking, it is only semantic. It may be narrowed in future to also provide type checking.
 *
 * @see https://redux.js.org/style-guide/style-guide#do-not-put-non-serializable-values-in-state-or-actions
 */
export type ReduxSerializable = unknown;

/**
 * Type for selectors based on {@link Selector}, but with predefined state type set as {@link AppState}.
 *
 * Do not use this type for reselectors created by createSelector from "@reduxjs/toolkit"/"reselect". Reselectors
 * contains additional properties like resultFunc, which are not part of this type.
 *
 * There is known problem when using AppSelector with one parameter of type boolean or enum. See https://wiki.morosystems.cz/pages/viewpage.action?pageId=224103070.
 *
 * @see UniversalSelector
 */
export type AppSelector<R, P = null> = Selector<AppState, R, P>;

/**
 * Universal type for selector which can take arbitrary number of parameters and has predefined state as {@link AppState}.
 * This type is useful for functions working with generic selectors. AppSelector supports only zero or one additional parameter.
 * @template R Return type of selector.
 * @template P Parameters of selector.
 * @see AppSelector
 */
export type UniversalSelector<R, P extends unknown[] = []> = (state: AppState, ...params: P) => R;

/**
 * Common type which defines properties shared by action creators. Should be identical to BaseActionCreator from redux toolkit
 * (it is not exported, so we must define this).
 * @see EmptyActionCreator
 * @see PayloadActionCreator
 * @see CustomActionCreator
 */
type ActionCreatorCommons<P, T extends string = string, M = never, E = never> = Readonly<{
    type: T;
    match: (action: Action<unknown>) => action is PayloadAction<P, T, M, E>;
}>;

/**
 * Type of action creator for empty action (without payload). This type solves issues with broken intellisense for action creators.
 * There is no need to use this type for action creators without documentation.
 *
 * This type must be maintained to match type ActionCreatorWithoutPayload from redux toolkit. Only intended difference
 * is that this type uses <code>type</code> instead of <code>interface</code> as workaround for documentation issue.
 *
 * If problems with intellisense are solved in the future, then this type should be deleted.
 *
 * @template T Type of action "type" attribute. Defaults to general string, but can be set as specific literal.
 * @see https://stackoverflow.com/questions/67286684/action-creators-doc-comments-not-showing
 * @see PayloadActionCreator
 * @see CustomActionCreator
 */
export type EmptyActionCreator<T extends string = string> = (() => PayloadAction<undefined, T>) & ActionCreatorCommons<undefined, T>;

/**
 * Type of action creator for action with payload. This type solves issues with broken intellisense for action creators.
 * There is no need to use this type for action creators without documentation and/or without documentation of payload
 * attributes.
 *
 * This type must be maintained to match type ActionCreatorWithPreparedPayload from redux toolkit. Only intended difference
 * is that this type uses <code>type</code> instead of <code>interface</code> as workaround for documentation issue.
 *
 * If problems with intellisense are solved in the future, then this type should be deleted.
 *
 * @template P Type of action payload.
 * @template T Type of action "type" attribute. Defaults to general string, but can be set as specific literal.
 * @template M Type of action "meta" attribute. Defaults to never.
 * @template E Type of action "error" attribute. Defaults to never.
 * @see https://stackoverflow.com/questions/67286684/action-creators-doc-comments-not-showing
 * @see EmptyActionCreator
 * @see CustomActionCreator
 */
export type PayloadActionCreator<P, T extends string = string, M = never, E = never> = ((payload: P) => PayloadAction<P, T, M, E>) &
    ActionCreatorCommons<P, T, M, E>;

/**
 * Type of action creator for action with custom content. This type solves issues with broken intellisense for action creators.
 * There is no need to use this type for action creators without documentation and/or without documentation of content
 * attributes.
 *
 * This type must be maintained to match type ActionCreatorWithPreparedPayload from redux toolkit. Only intended difference
 * is that this type uses <code>type</code> instead of <code>interface</code> as workaround for documentation issue.
 *
 * If problems with intellisense are solved in the future, then this type should be deleted.
 *
 * @template Args Type of arguments for action creator.
 * @template P Type of action payload.
 * @template T Type of action "type" attribute. Defaults to general string, but can be set as specific literal.
 * @template M Type of action "meta" attribute. Defaults to never.
 * @template E Type of action "error" attribute. Defaults to never.
 * @see https://stackoverflow.com/questions/67286684/action-creators-doc-comments-not-showing
 * @see EmptyActionCreator
 * @see PayloadActionCreator
 */
export type CustomActionCreator<Args extends unknown[], P, T extends string = string, M = never, E = never> = ((
    ...args: Args
) => PayloadAction<P, T, M, E>) &
    ActionCreatorCommons<P, T, M, E>;

/**
 * Type with definition of qa attribute for component/element identification in unit tests and ui tests.
 * Should be used only when there is better option to identify element.
 *
 * @see https://testing-library.com/docs/queries/about/#priority
 * @see createQAAttributes
 */
export type QAProps = Readonly<{
    /** Text identifier for testing purposes. */
    qa?: string;
}>;

/**
 * Returns only string keys of entity.
 * Default keys are string | number | symbol.
 */
export type StringKeysOf<O> = Extract<keyof O, string>;

/**
 * String representing valid url.
 */
export type UrlString = string;

/**
 * Common CSS values
 */
export type GlobalCssValues = "inherit" | "initial" | "revert" | "unset";

/**
 * {@link ListenerEffectAPI} from redux toolkit with state and dispatch predefined to {@link AppState} and {@link AppDispatch}.
 */
export type AppListenerEffectApi = ListenerEffectAPI<AppState, AppDispatch>;

/**
 * Type for effect function for listeners. Useful when effect function needs to be tested and thus not defined as anonymous.
 * @template A - Type of action(s) which triggers effect function.
 */
export type AppListenerEffect<A extends AnyAction> = (action: A, listenerApi: AppListenerEffectApi) => void | Promise<void>;
