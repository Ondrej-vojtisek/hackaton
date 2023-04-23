/**
 * Represents error which occurred during API request and indicates that request was intentionally aborted.
 * This may happen for example when user logs out during request processing.
 */
export class RequestAbortedError extends Error {
    /**
     * If RequestAbortedError was caused by other error, then it is available in this field.
     */
    public readonly originalError?: unknown;

    constructor(message?: string, originalError?: unknown) {
        super(message);
        this.originalError = originalError;
    }
}
