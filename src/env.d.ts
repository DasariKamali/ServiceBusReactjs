/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_SERVICE_BUS_CONNECTION_STRING: string;
    VITE_QUEUE_NAME: string;
    VITE_TIMEOUT_IN_MS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
