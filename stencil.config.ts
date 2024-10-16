import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'custom-dropdown',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
      baseUrl: 'https://arcia125.github.io/custom-dropdown/',
    }
  ],
  testing: {
    browserHeadless: "new",
  },
  extras: {
    experimentalSlotFixes: true,
    experimentalScopedSlotChanges: true
  },
};
