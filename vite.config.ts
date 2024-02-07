import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr'

installGlobals();

const isStorybook = process.argv[1]?.includes("storybook");

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    svgr({
      svgrOptions: {
        svgProps: {
          className: 'icon-svg'
        }
      }
    }),
    !isStorybook && remix({
      ignoredRouteFiles: ['**/.*'],
    }),
    tsconfigPaths(),
  ],
});
