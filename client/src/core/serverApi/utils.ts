import type { UrlString } from "src/types";

const DEFAULT_LOCALHOST_BASE_URL = "http://3.127.146.39:8181/api/";

export const getBeBaseUrl = (): UrlString => {
    return window.location.hostname === "localhost"
        ? DEFAULT_LOCALHOST_BASE_URL
        : `${window.location.protocol}//${window.location.host}/api/`;
};
