import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: '200.html' // Enables SPA-like behavior
		}),
		paths: {
			base: process.env.NODE_ENV === 'development' ? '' : '/thing' // Change this
		},
		appDir: 'app'
	}
};

export default config;
