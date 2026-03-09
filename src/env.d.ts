/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_BRAND_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
