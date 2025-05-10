/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly LEITING_SERVER_URL: string;
  readonly LEITING_WEBSOCKET_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
