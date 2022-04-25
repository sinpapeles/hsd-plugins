import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: '_ce',
    jsxFragment: '_frag',
    jsxInject: `import { createElement as _ce, Fragment as _frag } from 'react'`,
  },
  server: {
    proxy: {
      '/graphql': 'http://localhost:4000',
    },
  },
  // resolve: {
  //   alias: {
  //     '~': path.resolve(__dirname, './src'),
  //   },
  // },
  plugins: [
    tsconfigPaths(),
    react({
      jsxRuntime: 'classic',
    }),
  ],
});
