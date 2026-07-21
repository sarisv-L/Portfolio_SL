import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default {
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        impressum: resolve(rootDir, 'impressum.html'),
        datenschutz: resolve(rootDir, 'datenschutz.html'),
      },
    },
  },
};
