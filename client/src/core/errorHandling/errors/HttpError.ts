import type { HttpStatus } from "../types";

/**
 * This error represents API request, which returned http status code different from 2xx (or unhandled 3xx).
 * See https://visionmedia.github.io/superagent/#error-handling for details on statuses.
 */
export class HttpError extends Error {
    public readonly status: HttpStatus;

    constructor(status: HttpStatus, message?: string) {
        super(message);
        this.status = status;
    }
}
