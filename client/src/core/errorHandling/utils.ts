import { HttpError, RequestAbortedError, RequestError } from "./errors";
import { HttpStatus } from "./types";

/**
 * Checks if value is instance of Error. Useful to narrow down unknown from catch.
 *
 * @param value
 */
export const isError = (value: unknown): value is Error => value instanceof Error;

/**
 * Checks if value is instance of {@link HttpError}.
 *
 * @param value
 * @see HttpError
 */
export const isHttpError = (value: unknown): value is HttpError => value instanceof HttpError;

/**
 * Checks if value is instance of {@link RequestError}.
 *
 * @param value
 * @see RequestError
 */
export const isRequestError = (value: unknown): value is RequestError => value instanceof RequestError;

/**
 * Checks if value is instance of {@link RequestAbortedError}.
 *
 * @param value
 * @see RequestAbortedError
 */
export const isRequestAbortedError = (value: unknown): value is RequestAbortedError => value instanceof RequestAbortedError;

/**
 * Checks if value is instance of {@link HttpError} with status {@link HttpStatus.unauthorized}.
 *
 * @param value
 * @see HttpError
 */
export const isUnauthorizedError = (value: unknown): value is HttpError => isHttpError(value) && value.status === HttpStatus.unauthorized;

/**
 * Checks if value is instance of {@link HttpError} with status {@link HttpStatus.forbidden}.
 *
 * @param value
 * @see HttpError
 */
export const isForbiddenError = (value: unknown): value is HttpError => isHttpError(value) && value.status === HttpStatus.forbidden;

/**
 * Checks if value is instance of {@link HttpError} with status {@link HttpStatus.notFound}.
 *
 * @param value
 * @see HttpError
 */
export const isNotFoundError = (value: unknown): value is HttpError => isHttpError(value) && value.status === HttpStatus.notFound;
