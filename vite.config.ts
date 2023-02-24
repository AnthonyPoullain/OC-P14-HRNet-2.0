/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		reporters: 'verbose',
		setupFiles: './setupTests.ts',
	},
	base: '/OC-P14-HRNet-2.0/',
	build: {
		outDir: 'dist/OC-P14-HRNet-2.0/',
	},
});
