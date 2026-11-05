import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],optimizeDeps:{exclude:['@electric-sql/pglite']},worker:{format:'es'},build:{target:'es2022',outDir:'dist/client',emptyOutDir:true}});
