import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      root: 'src',
      base: 'https://kimmvb.github.io/Social-network-6/',
      build: {
        minify: true,
        rollupOptions: {
          output: {
            dir: './dist',
          },
        },
      },
    };
  }
  return {};
});
