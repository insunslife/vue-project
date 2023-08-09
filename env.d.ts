/// <reference types="vite/client" />

interface ImportMetaEnv {
  // readonly VITE_APP_TITLE: string
  // readonly VITE_APP_VERSION: string
  readonly VITE_API_URL: string
  readonly VITE_APP_KEY: string
  readonly VITE_AUTH_API_URL: string
  readonly VITE_CLS_API_URL: string
  readonly VITE_APP_ENV: 'development' | 'production'
  // 다른 환경 변수들에 대한 타입 정의...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
