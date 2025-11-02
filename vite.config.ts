import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'RichTextViewer',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        const ext = format === 'es' ? 'mjs' : 'cjs';
        return `index.${ext}`;
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: [
        {
          format: 'es',
          entryFileNames: 'index.mjs',
          dir: 'dist',
        },
        {
          format: 'cjs',
          entryFileNames: 'index.cjs',
          dir: 'dist',
        },
      ],
    },
    target: 'es2019',
    minify: false,
    sourcemap: true,
  },
});
