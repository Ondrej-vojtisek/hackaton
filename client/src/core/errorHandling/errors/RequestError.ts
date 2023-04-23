/**
 * Represents error that occurred during API request. This indicates, that request was not successful
 * (in opposite to HttpError, which indicates that request itself was successful, but its intended operation not).
 *
 * This error can be caused by various reasons, for example network connection problems. Reason may be narrowed
 * by examination of {@link RequestError#originalError} field.
 */
export class RequestError extends Error {
    /**
     * If RequestError was caused by other error, then it is available in this field.
     */
    public readonly originalError?: unknown;

    constructor(message?: string, originalError?: unknown) {
        super(message);
        this.originalError = originalError;
    }
}
