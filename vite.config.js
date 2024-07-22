import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const packagename = 'mitt-react';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: packagename,
      fileName: (format) => `${packagename}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [react()],
});
