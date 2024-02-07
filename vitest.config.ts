import { loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        svgProps: {
          className: 'icon-svg',
        },
      },
    }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    setupFiles: ['./test/setup-env-test.ts'],
    include: ['./app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    environment: 'happy-dom',
    // Additionally, this is to load ".env.test" during vitest
    env: loadEnv('test', process.cwd(), ''),
  },
});
